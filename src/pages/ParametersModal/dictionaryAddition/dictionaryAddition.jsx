import React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./dictionaryAddition.css";

const treeData = {
  id: "root",
  name: "Parent Node",
  children: [
    {
      id: "child1",
      name: "Child Node 1",
      children: [
        {
          id: "grandchild1",
          name: "Grandchild Node 1",
        },
        {
          id: "grandchild2",
          name: "Grandchild Node 2",
        },
      ],
    },
    {
      id: "child2",
      name: "Child Node 2",
    },
  ],
};

const label = (
  <>
    <input type="text" />
    {<b> : </b>}
    <input type="text" />
  </>
);

const renderTree = (nodes) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={label}>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </TreeItem>
);

const SimpleTreeView = () => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(treeData)}
    </TreeView>
  );
};

export default SimpleTreeView;
