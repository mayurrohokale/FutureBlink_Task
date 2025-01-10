require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const User = require("./schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Agenda = require("agenda");
const Sequence = require("./schema/sequenceSchema");
// const SequenceNodeSchema = require("./schema/sequenceNodeSchema")

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.mongourl || null;
const JWT_SECRET =
  process.env.jwtsecret || crypto.randomBytes(64).toString("hex"); // Strong default JWT secret

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});

const frontendurl = process.env.FRONT_URL || "http://localhost:3000";
const { ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.json());



mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

  

  const agenda = new Agenda({ db: { address: MONGO_URL } });

  // agenda.define("send email", async (job) => {
  //   const { to, subject, body } = job.attrs.data;
  //   try {
  //     await transporter.sendMail({
  //       from: process.env.EMAIL_USER,
  //       to,
  //       subject,
  //       text: body,
  //     });
  //     console.log(`Email sent to ${to}`);
  //   } catch (error) {
  //     console.error(`Error sending email to ${to}:`, error);
  //   }
  // });

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcomeSir!" });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hashedPassword });
    const user_data = { name: name, email: email, _id: String(user._id) };
    const token = jwt.sign(user_data, JWT_SECRET);
    res
      .status(201)
      .json({ message: "Signup successful", token, user: user_data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email aleready Taken" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const user_data = {
      name: user.name,
      email: user.email,
      _id: String(user._id),
    };
    const token = jwt.sign(user_data, JWT_SECRET);
    res
      .status(200)
      .json({ message: "Login successful", token, user: user_data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

app.get("/me", verifyToken, async (req, res) => {
  try {
    const check_user = await User.findOne({ email: req.user.email });
    if (!check_user) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = {
        name: check_user.name,
        email: check_user.email,
        
      };
      res
        .status(200)
        .json({ message: "User fetched successfully", user: user });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
});





agenda.define("send email", async (job) => {
  const { to, subject, body } = job.attrs.data;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });
    console.log(`Email sent to ${to}`);
    console.log('Email Content:', body);

    
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
});

// Start the Agenda scheduler
(async () => {
  await agenda.start();
  console.log("Agenda started");
})();

// Schema for Email Flow (if needed for saving the flowchart)
const EmailFlowSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true },
  flowchart: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const EmailFlow = mongoose.model("EmailFlow", EmailFlowSchema);

// app.post("/api/sequence", async (req, res) => {
//   try {
//     const { email, sequence } = req.body;

//     if (!email || !sequence || sequence.length === 0) {
//       return res.status(400).json({ message: "Email and sequence are required" });
//     }

//     const newSequence = new Sequence({ email, sequence });
//     await newSequence.save();

//     // Schedule Emails
//     let delayTime = 0;
//     for (const node of sequence) {
//       if (node.type === "delay") {
//         const { waitFor, waitType } = node.data;

//         // Convert delay to milliseconds
//         if (waitType === "minutes") delayTime += waitFor * 60 * 1000;
//         if (waitType === "hours") delayTime += waitFor * 60 * 60 * 1000;
//         if (waitType === "days") delayTime += waitFor * 24 * 60 * 60 * 1000;
//       } else if (node.type === "coldEmail") {
//         const { subject, emailContent } = node.data;

//         agenda.schedule(new Date(Date.now() + delayTime), "send email", {
//           to: email,
//           subject,
//           text: emailContent,
//         });

//         console.log(emailContent)
//       }
//     }

//     res.status(200).json({ message: "Sequence saved and scheduled successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// API to Fetch All Sequences

app.post("/api/sequence", async (req, res) => {
  try {
    const { email, sequence } = req.body;

    if (!email || !sequence || !Array.isArray(sequence)) {
      return res.status(400).json({ message: "Valid email and sequence array are required" });
    }

    // Filter out the add-button node and validate sequence
    const validNodes = sequence.filter(node => node.type !== 'addButton');
    
    if (validNodes.length === 0) {
      return res.status(400).json({ message: "Sequence must contain at least one valid node" });
    }

    // Create and save the sequence
    const newSequence = new Sequence({
      email,
      sequence: validNodes
    });
    await newSequence.save();

    // Schedule Emails
    let delayTime = 0;
    
    for (const node of validNodes) {
      switch (node.type) {
        case 'delayNode':
          const { waitFor, waitType } = node.data;
          // Convert delay to milliseconds
          switch (waitType.toLowerCase()) {
            case 'minutes':
              delayTime += waitFor * 60 * 1000;
              break;
            case 'hours':
              delayTime += waitFor * 60 * 60 * 1000;
              break;
            case 'days':
              delayTime += waitFor * 24 * 60 * 60 * 1000;
              break;
            default:
              console.warn(`Unknown wait type: ${waitType}`);
          }
          break;

        case 'coldEmailNode':
          const { name, subject, body } = node.data;
          
          // Schedule the email with the accumulated delay
          await agenda.schedule(
            new Date(Date.now() + delayTime),
            "send email",
            {
              to: email,
              subject: subject || name, // Use name as fallback if subject is not provided
              body: body || '',
              templateId: node.data.id
            }
          );
          
          console.log('Scheduling email with content:', {
            to: email,
            subject: subject || name,
            body: body
          });
          break;

        case 'loadSourceNode':
          // Store the source information if needed
          console.log(`Source: ${node.data.role}`);
          break;

        default:
          console.warn(`Unhandled node type: ${node.type}`);
      }
    }

    res.status(200).json({ 
      message: "Sequence saved and scheduled successfully",
      sequenceId: newSequence._id
    });

  } catch (error) {
    console.error('Error processing sequence:', error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
});

// Update the Sequence Schema to match the new data structure
// const SequenceNodeSchema = new mongoose.Schema({
//   id: String,
//   type: {
//     type: String,
//     enum: ['loadSourceNode', 'coldEmailNode', 'delayNode', 'addButton']
//   },
//   data: {
//     label: String,
//     role: String,          // for loadSourceNode
//     email: String,         // for coldEmailNode
//     id: String,           // template id for coldEmailNode
//     name: String,         // for coldEmailNode
//     subject: String,      // for coldEmailNode
//     body: String,
//      // for coldEmailNode
//     waitFor: String,      // for delayNode
//     waitType: String      // for delayNode
//   },
//   position: {
//     x: Number,
//     y: Number
//   },
//   measured: {
//     width: Number,
//     height: Number
//   }
// });

// const SequenceSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   sequence: [SequenceNodeSchema],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Sequence = mongoose.model('Sequence', SequenceSchema);

app.get("/api/sequence", async (req, res) => {
  try {
    const sequences = await Sequence.find();
    res.status(200).json(sequences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// API to schedule an email
app.post("/schedule-email", verifyToken, async (req, res) => {
  const { to, subject, body, delayInMinutes } = req.body;

  if (!to || !subject || !body || !delayInMinutes) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Schedule the email
    const sendTime = new Date(Date.now() + delayInMinutes * 60000);
    await agenda.schedule(sendTime, "send email", { to, subject, body });

    res.status(200).json({ message: "Email scheduled successfully." });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ message: "Failed to schedule email." });
  }
});

// API to save the email flowchart
app.post("/save-flowchart", verifyToken, async (req, res) => {
  const { flowchart } = req.body;

  if (!flowchart) {
    return res.status(400).json({ message: "Flowchart data is required." });
  }

  try {
    const emailFlow = new EmailFlow({
      userId: req.user._id,
      flowchart,
    });
    await emailFlow.save();

    res.status(201).json({ message: "Flowchart saved successfully." });
  } catch (error) {
    console.error("Error saving flowchart:", error);
    res.status(500).json({ message: "Failed to save flowchart." });
  }
});

// API to fetch saved flowcharts
app.get("/get-flowcharts", verifyToken, async (req, res) => {
  try {
    const flowcharts = await EmailFlow.find({ userId: req.user._id });
    res.status(200).json({ message: "Flowcharts fetched successfully.", flowcharts });
  } catch (error) {
    console.error("Error fetching flowcharts:", error);
    res.status(500).json({ message: "Failed to fetch flowcharts." });
  }
});









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
