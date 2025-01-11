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
        className="p-2 rounded-md bg-white border border-gray-300 w-44 text-center cursor-pointer"
      >
        <div className="flex gap-2">
          <div className="border-red-500 border bg-red-200 text-red-500 rounded-md">
            <div className="p-1">
              <HiUserAdd size={25} />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold">Leads From</h1>
            {field && <div className="text-sm text-red-600">{field}</div>}
            <Handle
              type="source"
              position={Position.Bottom}
              isConnectable={isConnectable}
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md shadow-lg z-50">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowPopup(false)}
              className="px-3 py-2 cursor-pointer rounded-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-2 cursor-pointer rounded-md bg-blue-500 text-white"
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
