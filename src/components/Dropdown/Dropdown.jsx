import React from "react";
import "./Dropdown.css";
import Select from "react-select";

const Dropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
  setSelectedOptionsList,
}) => {
  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const selectedOptionsList = selectedOptions.map((option) => option.value);
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
