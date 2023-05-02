import * as React from "react";
import * as ReactDOM from "react-dom";
import JsonEditor from "react-json-editor-ui";
import "react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css";

const DictionaryForm = () => {
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
  {
    console.log(editObject);
  }

  return (
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
  );
};
export default DictionaryForm;
