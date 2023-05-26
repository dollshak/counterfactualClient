import React, { useState, useEffect } from "react";
import { ParametersModal } from "../ParametersModal/ParametersModal";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import DictionaryForm from "../ParametersModal/dictionaryForm/dictionaryForm";
import { AlgoType } from "../../Objects/ConfigService";
import HomeIcon from "@mui/icons-material/Home";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RunAlgorithmsPage = () => {
  const navigate = useNavigate();
  const [modelParamsList, setModelParamsList] = useState([]);
  const [modelParam, setmodelParam] = useState("");
  const [paramsStr, setParamsStr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [algorithmToAddParams, setAlgorithmToAddParams] = useState();
  const [algorithmsList, setAlgorithmsList] = useState([]);
  const [algorithmsListFiltered, setAlgorithmsListFiltered] = useState([]);
  const [modelFile, setModelFile] = useState();
  const [modelInputsFile, setModelInputsFile] = useState();
  const [selectedType, setSelectedType] = useState(AlgoType.Regressor);
  const [algosInputs, setAlgosInputs] = useState({});

  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });

  const onSubmit = () => {
    const algo_names = Object.keys(algosInputs);
    const arg_list_obj = Object.values(algosInputs);
    const arg_list = arg_list_obj.map((obj) => Object.values(obj));
    var formData = new FormData();
    formData.append("algo_names", JSON.stringify(algo_names));
    formData.append("arg_list", JSON.stringify(algosInputs));
    formData.append("model_file", modelFile);
    formData.append("model_input", modelInputsFile);
    console.log("algo names " + JSON.stringify(algo_names));
    console.log(algosInputs);

    console.log(formData);
    const loadingToastId = toast.loading("Running the algorithms...", {
      autoClose: false,
    });

    api
      .post("/runAlgorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.dismiss(loadingToastId);
        navigate("/results", { state: res.data });
      })
      .catch((err) => {
        toast.dismiss(loadingToastId);
        toast.error("there was a problem running the algorithms");
        console.log(err);
      });
  };

  const addAlgoToList = (algorithm) => {
    if (!(algorithm.name in algosInputs)) {
      algosInputs[algorithm.name] = {};
      algorithm.argument_lst.forEach((param) => {
        algosInputs[algorithm.name][param.param_name] = "";
      });
    }
  };

  const algorithmChecked = (algorithm) => {
    var checkBox = document.getElementById(algorithm._id);
    var text = document.getElementById("p" + algorithm._id);
    if (checkBox.checked) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
    addAlgoToList(algorithm);
  };

  const onAddParamsClick = (algorithm) => {
    setAlgorithmToAddParams(algorithm);
    setOpenModal(true);
  };

  // const getDummyAlgos = () =>{
  //   return [
  //     {
  //         "_id": "6468d77faab4f8dd6e113b32",
  //         "additional_info": "no add",
  //         "algo_type": [
  //             "regressor"
  //         ],
  //         "argument_lst": [
  //             {
  //                 "accepted_types": [
  //                     "dictionary"
  //                 ],
  //                 "default_value": null,
  //                 "description": "features name and ranges",
  //                 "param_name": "features"
  //             },
  //             {
  //                 "accepted_types": [
  //                     "string"
  //                 ],
  //                 "default_value": null,
  //                 "description": "target column name in data",
  //                 "param_name": "outcome_name"
  //             },
  //             {
  //                 "accepted_types": [
  //                     "float"
  //                 ],
  //                 "default_value": 4,
  //                 "description": "number of expected results",
  //                 "param_name": "total_CFs"
  //             },
  //             {
  //                 "accepted_types": [
  //                     "float"
  //                 ],
  //                 "default_value": 2,
  //                 "description": "class to find",
  //                 "param_name": "desired_class"
  //             },
  //             {
  //                 "accepted_types": [
  //                     "list"
  //                 ],
  //                 "default_value": [
  //                     0.8,
  //                     1
  //                 ],
  //                 "description": "acceptable value range",
  //                 "param_name": "desired_range"
  //             },
  //             {
  //                 "accepted_types": [
  //                     "boolean"
  //                 ],
  //                 "default_value": true,
  //                 "description": "is for classification task?",
  //                 "param_name": "is_classifier"
  //             }
  //         ],
  //         "description": "dice regression",
  //         "name": "Dice_23",
  //         "output_example": "[\"check not 1\"]"
  //     }
  //   ]
  // }
  useEffect(() => {
    api
      .get("/getAllAlgorithms")
      .then((res) => {
        console.log(res?.data);
        setAlgorithmsList(res?.data);
        setSelectedType(AlgoType.Regressor);
        setAlgorithmsListFiltered(
          res.data.filter((a) => a.algo_type.includes(AlgoType.Regressor))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onBackClick = () => {
    navigate("/");
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setModelFile(e.target.files[0]);
    }
  };
  const handleModelInputsFileUpload = (e) => {
    if (e.target.files) {
      setModelInputsFile(e.target.files[0]);
    }
  };

  const changeType = () => {
    const newType =
      selectedType === AlgoType.Regressor
        ? AlgoType.Classifier
        : AlgoType.Regressor;
    setSelectedType(newType);
    setAlgorithmsListFiltered(
      algorithmsList.filter((a) => a.algo_type.includes(newType))
    );
  };
  return (
    <div className="backgroundComp">
      <div>
        <button className="back_button" onClick={onBackClick}>
          <h1>
            <HomeIcon />
          </h1>
        </button>
        <ToastContainer hideProgressBar={true} />
        <h1 className="mainTitle">Run Algorithms</h1>
      </div>
      <div className="fields">
        <div className="row">
          <div className="column">
            <label className="fieldTitle">Model's Type:</label>
          </div>
          <div className="column">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography className="switchText">Regression</Typography>
              <Switch onChange={changeType} />
              <Typography className="switchText">Classification</Typography>
            </Stack>
          </div>
        </div>

        <div className="rowModels">
          <div className="column">
            <label className="fieldTitle">Counterfactual selection</label>
          </div>
          <div className="column">
            <label
              className="missingAlgoTxt"
              hidden={algorithmsListFiltered.length > 0}
            >
              {" "}
              No Compatible Algorithm Exist{" "}
            </label>
            <div className="modelsList">
              {algorithmsListFiltered.map((algorithm) => (
                <div className="algorithm" key={algorithm._id}>
                  <input
                    type="checkbox"
                    className="checkboxClass"
                    id={algorithm._id}
                    name={algorithm.name}
                    value={algorithm.name}
                    onClick={() => algorithmChecked(algorithm)}
                  />
                  <label className="algo_name" htmlFor={algorithm._id}>
                    {algorithm.name}
                  </label>
                  <button
                    className="add_params_button"
                    id={"p" + algorithm._id}
                    hidden={true}
                    onClick={() => onAddParamsClick(algorithm)}
                  >
                    add params
                  </button>

                  <ParametersModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    algo={algorithmToAddParams}
                    algosInputs={algosInputs}
                    setAlgosInputs={setAlgosInputs}
                  />
                  {console.log(algosInputs)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rowSmall">
          <div className="column">
            <p className="fieldTitle">upload a model:</p>
          </div>
          <div className="column">
            <input
              type="file"
              className="fileClass"
              accept=".pkl, .joblib"
              id="files"
              onChange={handleModelFileUpload}
            />
          </div>
        </div>
        <div className="rowSmall">
          <div className="column">
            <p className="fieldTitle">upload model parameters:</p>
          </div>
          <div className="column">
            <input
              type="file"
              className="fileClass"
              accept=".json"
              id="files"
              onChange={handleModelInputsFileUpload}
            />
          </div>
        </div>
      </div>
      <div className="run_algo_page_container">
        <div className="row">
          <button className="submitButton" onClick={onSubmit}>
            run
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunAlgorithmsPage;
