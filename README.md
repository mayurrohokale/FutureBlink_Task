<div align="center">
  <h1>Email Flow Sequence App</h1>
  <h4>This application allows users to design and implement an email marketing sequence using a visual flowchart interface. The app is built using the MERN stack (MongoDB, Express.js, React, and Node.js), with React Flow for the frontend flowchart interface. The backend uses Agenda and Nodemailer for scheduling and sending emails.</h4>
</div>

---

## Key Features

- **User Authentication**: Users can register for an account or log in to access the platform.
- **Design Email Sequence**: Users can create and visualize an email flow using the flowchart interface.
- **Cold Email & Lead Source Nodes**: Add Cold Email and Lead Source as nodes to the flowchart.
- **Wait/Delay Node**: Users can schedule email delays with the Wait/Delay node.
- **Email Scheduling**: Emails will be scheduled based on the time of saving and the Wait/Delay nodes.
- **Email Sending**: Emails are automatically sent using Nodemailer after the scheduled delay.
---

## How It Works

1. **Frontend**: A React app where users can Login and Edit their Sequence or Flow.
2. **Backend**: A Node.js is used where user can send and schedule Emails according to the workflow using Agenda and Nodemailer.

---


## Installation

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env.local file in the root of the frontend folder and add the following:
   ```bash
   REACT_APP_API_KEY=http://localhost:8000
4. Start the Frontend:
   ```bash
   npm start

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install

3. Create a `.env` file with the following environment variables:
    ```env
    mongourl=<your-mongodb-uri>
    EMAIL_USER=<your-email-username>
    EMAIL_PASS=<your-email-password>
    jwtsecret=<your-jwt-secret>
4. Start the backend:
    ```bash
   node index.js

### Demonstration Video
https://youtu.be/x3ZcXmcK9NA

### Deployed Link
https://future-blink-task.vercel.app/

## Usage

1. Open the frontend application in your browser.
2. Login or Create Account.
3. Design the email flow by adding and removing nodes (Cold Email, Lead Source, and Wait/Delay).
4. Save the flowchart to schedule emails.


## Additional Notes


2. The application uses ReactFlow library for the Flow Creation.
3. Use the provided `.env` file to configure the backend URL for seamless integration.
4. MongoDB must be correctly set up to store the email sequences.
5. The email sequence will be scheduled based on the time of saving and the delay set in the Wait/Delay node.

