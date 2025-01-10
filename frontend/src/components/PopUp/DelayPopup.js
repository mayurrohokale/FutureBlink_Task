import React, { useState } from "react";

function DelayPopup({ onSubmit, onCancel }) {
  const [waitFor, setWaitFor] = useState("");
  const [waitType, setWaitType] = useState("Minutes");

  const handleWaitTypeChange = (e) => {
    setWaitType(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      waitFor,
      waitType,
    };
    onSubmit(data);
  };

  return (
    <div className="fixed w-[250px] md:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md shadow-lg z-50">
      <input
        type="number"
        value={waitFor}
        onChange={(e) => setWaitFor(e.target.value)}
        placeholder="Wait For"
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="mb-4">
        <label className="block text-sm mb-2">Wait Type</label>
        <select
          value={waitType}
          onChange={handleWaitTypeChange}
          className="w-full p-2 border rounded"
        >
          <option value="Minutes">Minutes</option>
          <option value="Days">Days</option>
          <option value="Hours">Hours</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 border rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default DelayPopup;
