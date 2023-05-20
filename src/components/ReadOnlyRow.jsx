import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const ReadOnlyRow = ({ param, onDelete, onEdit }) => {
  return (
    <tr id={param.param_name}>
      <td className="name">{param.param_name}</td>
      <td className="desc">{param.description}</td>
      <td className="desc">{param.default_value}</td>
      <td className="types">{param.accepted_types.join(", ")}</td>
      <td>
        <button
          className="action_button"
          onClick={(event) => onEdit(event, param)}
          title="edit parameter"

        >
          <EditOutlinedIcon/>
        </button>
        <button
          className="action_button_cancel"
          onClick={() => onDelete(param.param_name)}
          title="delete"
        >
          <DeleteOutlineOutlinedIcon/>
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
