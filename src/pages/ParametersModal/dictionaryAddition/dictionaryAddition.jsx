import React, { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./dictionaryAddition.css";
import InputAddition from "./inputAddition/inputAddition";

const DictionaryAddition = () => {
  const [treeData, setTreeData] = useState({
    id: "root",
    name: "root",
    type: "",
    value: "",
    children: [
      {
        id: "1",
        name: "first child",
        type: "",
        value: "",
        children: [],
      },
    ],
  });

  const arg = {
    param_name: "y",
    description: "param desc",
    accepted_types: ["string", "boolean"],
  };

  const label = (
    <>
      <input type="text" />
      {<b> : </b>}
      <InputAddition
        arg={arg}
        node={treeData.children[0]}
        parent={treeData}
        treeData={treeData}
        setTreeData={setTreeData}
      ></InputAddition>
    </>
  );

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={label}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );
  return (
    <div>
      {treeData.children.map((nodes, index) => (
        <TreeView
          key={index}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(nodes)}
        </TreeView>
      ))}
    </div>
  );
};

export default DictionaryAddition;

// const treeData = {
//   id: "root",
//   name: "Parent Node",
//   type: "string",
//   value: "a",
//   children: [
//     {
//       id: "child1",
//       name: "Child Node 1",
//       type: "string",
//       value: "a",
//       children: [
//         {
//           id: "grandchild1",
//           name: "Grandchild Node 1",
//           type: "string",
//           value: "a",
//         },
//         {
//           id: "grandchild2",
//           name: "Grandchild Node 2",
//           type: "string",
//           value: "a",
//         },
//       ],
//     },
//     {
//       id: "child2",
//       name: "Child Node 2",
//       type: "string",
//       value: "a",
//     },
//   ],
// };
