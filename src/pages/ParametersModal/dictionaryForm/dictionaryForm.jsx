import * as React from "react";
import * as ReactDOM from "react-dom";
import JsonEditor from "react-json-editor-ui";
import "react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css";
import "./dictionaryForm.css";

const DictionaryForm = (
  {
    // setTempAlgoInputs,
    // currDict,
  }
) => {
  const [editObject, setEditObject] = React.useState({
    name: "may",
    age: null,
    address: [
      "Panyu Shiqiao on Canton",
      "Tianhe",
      {
        city: "forida meta 11",
      },
    ],
    ohters: {
      id: 1246,
      joinTime: "2017-08-20. 10:20",
      description: "another",
    },
  });

  return (
    <div className="dict-container">
      <JsonEditor
        data={editObject}
        onChange={(data) => {
          setEditObject(data);
        }}
        optionsMap={{
          color: [
            { value: "red", label: "Red" },
            { value: "blue", label: "Blue" },
          ],
          city: [
            { value: "beijing", label: "Beijing" },
            { value: "shanghai", label: "Shanghai" },
          ],
        }}
      />
    </div>
  );
};
export default DictionaryForm;
