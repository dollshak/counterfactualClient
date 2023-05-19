import React from "react";
import { useNavigate } from "react-router-dom";
import DictionaryForm from "../ParametersModal/dictionaryForm/dictionaryForm";
const HomePage = () => {
  const navigate = useNavigate();

  const onClickAddAlgorithm = () => {
    navigate("/addAlgorithm");
  };

  const onClickRunAlgorithms = () => {
    navigate("/runAlgorithms");
  };
  return (
    <div className="backgroundComp">
        <p class="mainTitle">Welcome!</p>
        <p class="subTitle">please choose your action</p>    
        <div>
          <button className="button" onClick={onClickAddAlgorithm}>
            Add New Algorithm
          </button>
        </div>    
        <div>
          <button className="button" onClick={onClickRunAlgorithms}>
            run algorithms
          </button>
        </div>
    </div>
  );
};

export default HomePage;
