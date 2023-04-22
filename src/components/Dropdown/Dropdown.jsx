import React, { useState } from "react";
import "./Dropdown.css";
import Select from "react-select";

const Dropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  setSelectedOptionsList,
}) => {
  // const tempOptions = [
  //   { value: "option1", label: "Option 1" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   { value: "option4", label: "Option 4" },
  // ];

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const selectedOptionsList = selectedOptions.map((option) => option.value);
    console.log("options list " + selectedOptionsList);
    setSelectedOptionsList(selectedOptionsList);
  };

  return (
    <Select
      options={options}
      isMulti
      value={selectedOptions}
      onChange={handleSelectChange}
    />
  );
};

export default Dropdown;
