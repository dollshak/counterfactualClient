import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import JsonEditor from "react-json-editor-ui";
import "react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css";
import "./dictionaryForm.css";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const DictionaryForm = ({
  setTempAlgoInputs,
  fieldName,
  open,
  onClose,
  tempAlgoInputs,
}) => {
  const [editObject, setEditObject] = React.useState(
    tempAlgoInputs[fieldName] === ""
      ? {}
      : JSON.parse(tempAlgoInputs[fieldName])
  );

  const onDictChange = (data) => {
    setEditObject(data);
    setTempAlgoInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: JSON.stringify(editObject),
    }));
  };

  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div>
          <button className="back_button" onClick={onClose}>
            x
          </button>
        </div>
        <JsonEditor
          data={editObject}
          onChange={(data) => {
            onDictChange(data);
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
        <div className="row">
          <button className="submitButton saveDict" onClick={onClose}>
            <SaveAsOutlinedIcon />
            save
          </button>
        </div>
      </div>
    </div>
  );
};
export default DictionaryForm;
