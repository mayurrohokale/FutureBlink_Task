import React, { useState, useCallback, memo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import LoadSource from "../NodeTypes/LoadSource";
import ColdEmail from "../NodeTypes/ColdEmail";
import Delay from "../NodeTypes/Delay";
import Cstbutton from "../reusables/CstButton";
import EmailPopup from "../PopUp/EmailPopup";
import DelayPopup from "../PopUp/DelayPopup";
import { toast, ToastContainer } from "react-toastify";
import { useAppState } from "../../utils/appState";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketOutline } from "react-icons/io5";



const BASE_URL = process.env.REACT_APP_API_KEY || "http://localhost:8000";

const AddButtonNode = memo(({ data, isConnectable }) => {
  return (
    <div className="p-3 rounded bg-white border border-gray-300 w-[180px] text-center">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <button
        onClick={data.onAdd}
        className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
      >
        + Add Node
      </button>
    </div>
  );
});

const nodeTypes = {
  addButton: AddButtonNode,
  loadSourceNode: LoadSource,
  coldEmailNode: ColdEmail,
  delayNode: Delay,
};

const initialNodes = [
  {
    id: "1",
    type: "loadSourceNode",
    data: { label: "Leads From", role: "Tech Lead" },
    position: { x: 50, y: 50 },
  },
  {
    id: "add-button",
    type: "addButton",
    data: { label: "" },
    position: { x: 50, y: 150 },
  },
];

const initialEdges = [
  {
    id: "e1-add",
    source: "1",
    target: "add-button",
    type: "straight",
  },
];

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isCreatingNode, setIsCreatingNode] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [newNodeData, setNewNodeData] = useState(null);
  const { user } = useAppState();
  // const [scheduledEmail, setScheduledEmail] = useState(null);

  const handleSaveandSubmit = async () => {
    console.log(nodes);
    try {
      const response = await Axios.post(`${BASE_URL}/api/sequence`, {
        email: user.email,
        sequence: nodes,
      });
      console.log(response);
      
      if (response?.data?.message === "Sequence saved and scheduled successfully") {
        toast.success(response?.data?.message || "Sequence Saved ", {
          position: "top-center",
        })}
          
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while saving the sequence.", {
        position: "top-center",
      });
    }
  };

  console.log(nodes);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = useCallback(() => {
    setIsCreatingNode(true);
    setSelectedOption("");
  }, []);

  const handleCreateNode = useCallback(() => {
    if (!selectedOption) {
      alert("Please select an option before creating the node.");
      return;
    }

    const newNodeId = (
      nodes.filter((n) => n.id !== "add-button").length + 1
    ).toString();
    const lastNodeId = nodes[nodes.length - 2].id;
    const lastNodePosition = nodes[nodes.length - 2].position;

    const nodeType =
      selectedOption === "Cold Email" ? "coldEmailNode" : "delayNode";
    const initialData =
      selectedOption === "Cold Email"
        ? { label: selectedOption, email: "" }
        : { label: selectedOption, waitFor: "", waitType: "" };

    setNewNodeData({
      id: newNodeId,
      type: nodeType,
      data: initialData,
      position: { x: lastNodePosition.x, y: lastNodePosition.y + 100 },
      lastNodeId,
      lastNodePosition,
    });

    setIsCreatingNode(false);
    setShowInputPopup(true);
  }, [nodes, selectedOption]);

  const handleInputSubmit = useCallback(
    (inputData) => {
      const { id, type, data, position, lastNodeId, lastNodePosition } =
        newNodeData;

      const updatedNode = {
        id,
        type,
        data: { ...data, ...inputData },
        position,
      };

      const addButtonNode = {
        id: "add-button",
        type: "addButton",
        data: { label: "", onAdd: onAddNode },
        position: { x: lastNodePosition.x, y: lastNodePosition.y + 200 },
      };

      const newEdges = [
        {
          id: `e${lastNodeId}-${id}`,
          source: lastNodeId,
          target: id,
          type: "straight",
        },
        {
          id: `e${id}-add`,
          source: id,
          target: "add-button",
          type: "straight",
        },
      ];

      setNodes((nds) => [
        ...nds.filter((n) => n.id !== "add-button"),
        updatedNode,
        addButtonNode,
      ]);

      setEdges((eds) => [
        ...eds.filter((e) => e.target !== "add-button"),
        ...newEdges,
      ]);

      setShowInputPopup(false);
      setNewNodeData(null);
    },
    [newNodeData, onAddNode, setNodes, setEdges]
  );

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "add-button") {
          return {
            ...node,
            data: { ...node.data, onAdd: onAddNode },
          };
        }
        return node;
      })
    );
  }, [onAddNode, setNodes]);

  const NodeDialog = () => (
    <div className="fixed w-[250px] md:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 border border-gray-300 rounded shadow-lg z-80  ">
      <h3 className="mb-3">Select Node Type</h3>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      >
        <option value="">-- Select --</option>
        <option value="Cold Email">Cold Email</option>
        <option value="Delay">Delay</option>
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsCreatingNode(false)}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateNode}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  );

  const InputPopup = () => {
    const handleEmailSubmit = (emailData) => {
      handleInputSubmit(emailData);
    };

    const handleDelaySubmit = (delayData) => {
      handleInputSubmit(delayData);
    };

    console.log("inside sequence");

    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg z-50">
        {newNodeData?.type === "coldEmailNode" ? (
          <EmailPopup
            onSubmit={handleEmailSubmit}
            onCancel={() => setShowInputPopup(false)}
          />
        ) : (
          <>
            <DelayPopup
              onSubmit={handleDelaySubmit}
              onCancel={() => setShowInputPopup(false)}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between px-6 p-4 border border-b-1 border-gray-400 gap-1">
        <h1 className="font-bold font-josiefin text-xs md:text-md">
          Create Email Marketing Sequence Flow
        </h1>
        <button  className="text-white flex items-center text-center gap-1 bg-blue-500 text-xs md:text-md font-semibold p-1 md:p-2 rounded-md"
        onClick={handleSaveandSubmit}
        ><IoRocketOutline/>Save & Schedule</button>
       
      </div>
      <div className="w-full h-[80vh] md:h-[90vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>

        {isCreatingNode && <NodeDialog />}
        {showInputPopup && <InputPopup />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FlowEditor;
