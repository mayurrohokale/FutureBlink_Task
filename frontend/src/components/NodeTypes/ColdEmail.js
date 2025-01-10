import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";

function CustomNode({ data }) {
  
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="">
          <div className="border-purple-500 bg-purple-200  text-purple-500 rounded-md">
            <div className="p-1">
              <MdEmail size={30} />
            </div>
          </div>
        </div>
        <div className="ml-2">
          <div className="text-md font-semibold">Email</div>
          <div className="text-gray-500 text-sm font-itim">{data.name}</div>
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
  );
}

export default memo(CustomNode);
