

import React, { useState, memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { PiClockCountdownBold } from "react-icons/pi";
import DelayPopup from '../PopUp/DelayPopup';
function CustomNode({ data, isConnectable }) {
  const [showPopup, setShowPopup] = useState(false);
  const [waitFor, setWaitFor] = useState(data.waitFor || "");
  const [waitType, setWaitType] = useState(data.waitType || "");

  const handleSubmit = () => {
    data.waitFor = waitFor;
    data.waitType = waitType;
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };


  return (
    <>
      <div
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 cursor-pointer"
      >
        <div className="flex items-center">
          <div className="border-sky-500 bg-sky-200  text-sky-500 rounded-md">
            <div className="p-1">
              <PiClockCountdownBold size={30}  />
            </div>
            
          </div>
          <div className="ml-2">
            <h1 className="text-md font-medium">Delay</h1>
            <div className="flex flex-row gap-1">
              <div className="text-sm font-itim "> wait: {waitFor}</div>
              <div className=" text-sm font-itim">{waitType}</div>
            </div>
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-teal-500"
        />
      </div>

      {showPopup && (
        <DelayPopup
        waitFor={waitFor}
        waitType={waitType}
        setWaitFor={setWaitFor}
        setWaitType={setWaitType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      )}
    </>
  );
}

export default memo(CustomNode);
