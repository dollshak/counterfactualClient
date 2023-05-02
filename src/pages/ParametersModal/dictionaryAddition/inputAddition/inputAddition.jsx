import { SecurityUpdateWarningTwoTone } from "@mui/icons-material";
import "./inputAddition.css";
const InputAddition = ({ arg, node, parent, treeData, setTreeData }) => {
  const types = ["string", "boolean", "float", "list", "dictionary"];
  const onParamChange = (event) => {
    // setNode({
    //   ...node,
    //   value: event.target.value,
    // });
  };

  const onTypeChoose = (event) => {
    const chosenType = event.target.value;
    const updatedNode = { ...node, type: chosenType };
    const updatedTree = updateNodeInTree(treeData, updatedNode);
    setTreeData(updatedTree);

    if (chosenType === "dictionary") {
      //   addNewChildToParent();
      const newChild = addNewChildToNode();
      parent = node;
      node = newChild;
      console.log(treeData);
    }
  };

  const addNewChildToParent = () => {
    const newChild = {
      id: Date.now().toString(),
      value: "",
      type: "",
      children: [],
    };
    const updatedChildren = [...parent.children, newChild];
    const updatedParent = { ...parent, children: updatedChildren };
    const updatedTree = updateNodeInTree(treeData, updatedParent);
    setTreeData(updatedTree);
  };

  const addNewChildToNode = () => {
    const newChild = {
      id: Date.now().toString(),
      value: "",
      type: "",
      children: [],
    };
    const updatedChildren = [...node.children, newChild];
    const updatedNode = { ...node, children: updatedChildren };
    const updatedTree = updateNodeInTree(treeData, updatedNode);
    setTreeData(updatedTree);
    return newChild;
  };

  const updateNodeInTree = (tree, nodeToUpdate) => {
    if (tree.id === nodeToUpdate.id) {
      // If the current node matches the node to update, replace it with the updated node
      return nodeToUpdate;
    } else if (tree.children) {
      // Otherwise, recursively update the node's children
      const updatedChildren = tree.children.map((child) =>
        updateNodeInTree(child, nodeToUpdate)
      );
      const updatedTree = { ...tree, children: updatedChildren };
      setTreeData(updatedTree);
      return updatedTree;
    } else {
      console.log("not found");
      // If the node is not found in the tree, return the original tree
      return tree;
    }
  };

  return (
    <div className="inputAddition-container">
      <form>
        {(node.type === "string" ||
          node.type === "float" ||
          node.type === "list") && (
          <input
            className="input"
            type="text"
            onChange={(event) => onParamChange(event, arg)}
          />
        )}

        {node.type === "boolean" && (
          <div>
            <input
              type="radio"
              id="true"
              value="true"
              name="boolean"
              onChange={(event) => onParamChange(event)}
            />
            <label htmlFor="true">true</label>
            <input
              type="radio"
              id="false"
              value="false"
              name="boolean"
              onChange={(event) => onParamChange(event)}
            />
            <label htmlFor="false">false</label>
          </div>
        )}
      </form>

      <div className="IA_types">
        {types.map((type, index) => (
          <div>
            <input
              type="radio"
              id={type}
              value={type}
              name={arg.param_name}
              onChange={(event) => onTypeChoose(event)}
              key={index}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputAddition;
