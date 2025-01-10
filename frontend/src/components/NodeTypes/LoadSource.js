import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { HiUserAdd } from "react-icons/hi";

const LoadSource = ({ data, isConnectable }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [role, setRole] = useState(data.role || "");
  const [field, setField] = useState("");

  const handleNodeClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
    data.role = role;
    setField(role);
    setShowPopup(false);
  };

  return (
    <>
      <div
        onClick={handleNodeClick}
        style={{
          padding: "10px",
          borderRadius: "4px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          width: "150px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <div className="flex gap-2">
          <div className="border-red-500 border-[1px] bg-red-200  text-red-500 rounded-md">
            <div className="p-1 ">
              <HiUserAdd size={25} />
            </div>
          </div>
          <div>
          <h1 className="text-sm font-bold">Leads From</h1>
          {field && <div className=" text-sm text-red-600">{field}</div>}
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
          />
        </div>
          </div>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor: "#4299e1",
                color: "white",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadSource;
