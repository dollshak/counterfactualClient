import React, { useState } from "react";

const RunAlgorithmsPage = () => {
  const [showArgs, setShowArgs] = useState(false);
  // const [algorithmsList, setAlgorithmsList] = useState([]);
  const algorithmsList = [
    {
      _id: "1",
      name: "Dummy_CF",
      file_content: "from server.businessLayer...",
      description: "dummy",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
    {
      _id: "2",
      name: "Alibi",
      file_content: "from server.businessLayer...",
      description: "albidesc",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
  ];

  const onSubmit = () => {};

  const algorithmChecked = (algorithmId) => {
    var checkBox = document.getElementById(algorithmId);
    var text = document.getElementById("p" + algorithmId);
    console.log(checkBox.checked);
    if (checkBox.checked) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  };
  return (
    <div className="RunAlgorithmsPage">
      <h1>run algorithms</h1>
      <div className="algorithms_list">
        {algorithmsList.map((algorithm) => (
          <div className="algorithm" key={algorithm._id}>
            <input
              type="checkbox"
              id={algorithm._id}
              name={algorithm.name}
              value={algorithm.name}
              onClick={() => algorithmChecked(algorithm._id)}
            />
            <label htmlFor={algorithm._id}>{algorithm.name}</label>
            <div id={"p" + algorithm._id} hidden={true}></div>
          </div>
        ))}
      </div>
      <div className="submit button">
        <button onClick={onSubmit}>run</button>
      </div>
    </div>
  );
};

export default RunAlgorithmsPage;
