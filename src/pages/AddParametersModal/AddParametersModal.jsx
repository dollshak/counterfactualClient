import React, { Fragment, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import EditableRow from "../../components/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import AddIcon from '@mui/icons-material/Add';
export const AddParametersModal = ({
  open,
  onClose,
  paramsList,
  setParamsList,
}) => {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDefaultValue,setNewDefaultValue] = useState(undefined);
  const [newAcceptedTypes, setNewAcceptedTypes] = useState([]);
  const [showParamExistMessage, setShowParamExistMessage] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedDesc, setEditedDesc] = useState("");
  const [editedTypes, setEditedTypes] = useState([]);
  const [editedDefVal, setEditedDefVal] = useState("");
  const [isEditedDefValUse, setIsEditedDefValUse] = useState(false);
  const [dropdownSelectedOptions, setDropdownSelectedOptions] = useState([]);
  const [isUseDefaultValue,setIsUseDefaultValue] = useState(false);
  const [messageToUser, setMessageToUser] = useState("")
  const acceptedTypes = [
    { value: "float", label: "float" },
    { value: "string", label: "string" },
    { value: "boolean", label: "boolean" },
    { value: "dictionary", label: "dictionary" },
    { value: "list", label: "list" },
  ];

  if (!open) return null;

  const onDelete = (param_name) => {
    const filteredParamsList = paramsList.filter(
      (param) => param.param_name !== param_name
    );
    setParamsList(filteredParamsList);
  };

  const onEdit = (event, param) => {
    event.preventDefault();
    setEditedTypes(param.accepted_types);
    setEditedDesc(param.description);
    setEditedDefVal(param.default_value);
    setIsEditedDefValUse(param.default_value !== undefined);
    setEditRow(param.param_name);
  };

  const onSave = (event, paramName) => {
    event.preventDefault();
    const paramToModify = paramsList.find(
      (param) => param.param_name === paramName
    );
    const modifiedDefaultVal =  isEditedDefValUse? editedDefVal : undefined

    if (paramToModify) {
      paramToModify.description = editedDesc;
      paramToModify.accepted_types = editedTypes;
      paramToModify.default_value = modifiedDefaultVal;
    }
    setParamsList(paramsList);
    setEditRow(null);
    setEditedDefVal( undefined);
  };
  const onNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };
  const onDefaultValueClick =() =>{
    setIsUseDefaultValue(!isUseDefaultValue)
  }
  const onDescChange = (event) => {
    setNewDesc(event.target.value);
  };
  const onDefaultValChange = (event) => {
    setNewDefaultValue(event.target.value);
  };


  const parseArg = (argStr, argType) => {
    switch (argType) {
      case "boolean":
        return argStr === "True" || argStr === "true";
      case "float":
        return parseFloat(argStr);
      case "string":
        return argStr;
      case "dictionary":
        const discinaryVal = JSON.parse(argStr);
        return discinaryVal;
      case "list":
        const parsedList = JSON.parse(argStr);
        return parsedList;
      default:
        return argStr;
    }
  }
  
  const argStrToVal = (argStr, acceptedTypes) => {
    if (!argStr ||  argStr ==="" ){
      return undefined;
    }
    for (const argType of acceptedTypes){
      if (parseArg(argStr, argType)){
        return parseArg(argStr, argType)
      }
    }
    return undefined;
  };


  const onAddParamClick = (event) => {
    event.preventDefault();
    let defaultValueToSave = isUseDefaultValue? newDefaultValue : undefined
    const isParamNameExists = paramsList.some(
      (param) => param.param_name === newName
    );
    if (isParamNameExists) {
      setShowParamExistMessage(true);
      setMessageToUser("This param name is already exist!");
    } else if ( newName === undefined || newName === "" || newDesc=== undefined || newDesc === "" || newAcceptedTypes.length <1 ){
      // TODO should set time out or change to new feature shaked is using
      setShowParamExistMessage(true);
      setMessageToUser("name, description and accepted types must be filled ");
    }
    else if (isUseDefaultValue && !argStrToVal(defaultValueToSave, newAcceptedTypes)){
      setShowParamExistMessage(true);
      setMessageToUser("default value does not match selected types");
    } 
    else {
      defaultValueToSave = argStrToVal(defaultValueToSave, newAcceptedTypes)
      setShowParamExistMessage(false);
      const newParam = {
        param_name: newName,
        description: newDesc,
        accepted_types: newAcceptedTypes,
        default_value: defaultValueToSave,
      };
      const updatedParamsList = [...paramsList, newParam];
      setParamsList(updatedParamsList);
      setNewName("");
      setNewDesc("");
      setNewAcceptedTypes([]);
      setDropdownSelectedOptions([]);
      setNewDefaultValue("");
      setIsUseDefaultValue(false)
    }
  };

  
  return (
    <div className="backgroundComp">
       <div>
       <button className="back_button" onClick={onClose}>
          x
        </button>
      </div>
      <div>
        <h1 className="mainTitle">Parameters</h1>
      </div>
      <div className="table_container">
        <form className="APM_form">
          <table>
            <thead>
              <tr>
                <th className="paramTableHeader">name</th>
                <th className="paramTableHeader">description</th>
                <th className="paramTableHeader">defualt value</th>
                <th className="paramTableHeader">accepted types</th>
                <th className="paramTableHeader">actions</th>
              </tr>
            </thead>
            <tbody>
              {paramsList.map((param) => (
                <Fragment key={param.param_name}>
                  {editRow === param.param_name ? (
                    <EditableRow
                      param={param}
                      setEditRow={setEditRow}
                      setEditedDesc={setEditedDesc}
                      setEditedTypes={setEditedTypes}
                      setEditedDefVal={setEditedDefVal}
                      setIsEditedDefValUse = {setIsEditedDefValUse}
                      isEditedDefValUse = {isEditedDefValUse}
                      onSave={onSave}
                      acceptedTypes={acceptedTypes}
                    />
                  ) : (
                    <ReadOnlyRow
                      param={param}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  )}
                </Fragment>
              ))}
              <tr className="add_param_row">
                <td>
                  <input
                    className="name_input"
                    type="text"
                    value={newName}
                    onChange={onNameChange}
                  />
                </td>
                <td>
                  <textarea
                    className="desc_input"
                    type="text"
                    value={newDesc}
                    onChange={onDescChange}
                  />
                </td>
                <td>
                  <div>
                    <input type="checkbox"
                    id="scales" name="scales"
                    value={isUseDefaultValue}
                    onChange={onDefaultValueClick}
                    checked={isUseDefaultValue}
                    /> set defualt value
                  </div>
                  <div>
                    <textarea
                      className="desc_input"
                      type="text"
                      value={newDefaultValue}
                      onChange={onDefaultValChange}
                      disabled={!isUseDefaultValue}
                    />
                  </div>
                </td>
                <td>
                  <Dropdown
                    options={acceptedTypes}
                    selectedOptions={dropdownSelectedOptions}
                    setSelectedOptions={setDropdownSelectedOptions}
                    setSelectedOptionsList={setNewAcceptedTypes}
                  ></Dropdown>
                </td>
                <td>
                  <button
                    className="action_button"
                    onClick={(event) => onAddParamClick(event)}
                  >
                    <AddIcon/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {showParamExistMessage && <p className="errorMessage">{messageToUser} </p>}

      <div className="add_save_button_container">
        <button className="submitButton" onClick={onClose}>
          save
        </button>
      </div>
    </div>
  );
};
