import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { AlgoType } from "../../Objects/ConfigService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pink } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlgorithmPage = () => {
  const { state } = useLocation();
  console.log(state);

  const [algorithmFile, setAlgorithmFile] = useState();
  const [algoName, setAlgoName] = useState(state ? state.name : "");
  const [originName, setOriginAlgoName] = useState(state ? state.name : "");
  const [algoDesc, setAlgoDesc] = useState(state ? state.description : "");
  const [algoInfo, setAlgoInfo] = useState(state ? state.additional_info : "");
  const [algoOutputExample, setAlgoOutputExample] = useState(
    state ? state.output_example : ""
  );
  const [parametersList, setParametersList] = useState(
    state ? state.argument_lst : []
  );
  const [algoTypes, setAlgoTypes] = useState(state ? state.algo_type : []);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitValid, setIsSubmitValid] = useState(false);
  const [addingClicked, setAddingClicked] = useState(false);
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const onBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    onDataChange();
  });
  const onNameChange = (event) => {
    setAlgoName(event.target.value);
  };
  const onDescChange = (event) => {
    setAlgoDesc(event.target.value);
  };
  const onInfoChange = (event) => {
    setAlgoInfo(event.target.value);
  };
  const onOutputChange = (event) => {
    setAlgoOutputExample(event.target.value);
  };

  const onAddParamsClick = () => {
    console.log("trying to open");
    setOpenModal(true);
  };
  const onDataChange = () => {
    if (
      // (!state && !algorithmFile) ||
      !algoName ||
      algoName.length < 1 ||
      !algoDesc ||
      algoDesc.length < 1 ||
      !algoOutputExample ||
      algoOutputExample.length < 1 ||
      !algoTypes ||
      algoTypes.length < 1
    ) {
      // setIsSubmitValid(false);
    } else {
      setIsSubmitValid(true);
    }
  };
  const onAddClick = () => {
    console.log("starting to add");
    if (!state && !algorithmFile) {
      return;
    }

    const loadingToastId = toast.loading(
      state ? "Editing the algorithm..." : "Adding the algorithm...",
      {
        autoClose: false,
      }
    );
    var formData = new FormData();
    if (algorithmFile) formData.append("file_content", algorithmFile);
    formData.append("name", algoName);
    formData.append("argument_lst", JSON.stringify(parametersList));
    formData.append("description", algoDesc);
    formData.append("additional_info", algoInfo);
    formData.append("output_example", [algoOutputExample]);
    formData.append("type", JSON.stringify(algoTypes));
    state && formData.append("origin_name", originName);

    setAddingClicked(true);

    state
      ? editAlgo(formData, loadingToastId)
      : addAlgo(formData, loadingToastId);
  };

  const addAlgo = (formData, loadingToastId) => {
    console.log("starting to add algorithm");
    api
      .post("/algorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        toast.dismiss(loadingToastId);
        toast.success("algorithm was added successfully");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loadingToastId);
        toast.error(err.response.data);
      });
  };

  const editAlgo = (formData, loadingToastId) => {
    console.log(formData);
    api
      .put("/algorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.dismiss(loadingToastId);
        toast.success("algorithm was edited successfully");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loadingToastId);
        toast.error(err.response.data);
      });
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setAlgorithmFile(e.target.files[0]);
    }
  };

  // const onTypeClick = (e) => {
  //   let algoType = e.target.value;
  //   if (e.target.checked && !algoTypes.includes(algoType)) {
  //     algoTypes.push(algoType);
  //   } else {
  //     const index = algoTypes.indexOf(algoType);
  //     if (index >= 0) {
  //       algoTypes.splice(index);
  //     }
  //   }
  // };

  const onTypeClick = (e) => {
    let algoType = e.target.value;
    if (e.target.checked && !algoTypes.includes(algoType)) {
      setAlgoTypes((prevTypes) => [...prevTypes, algoType]);
    } else {
      setAlgoTypes((prevTypes) =>
        prevTypes.filter((type) => type !== algoType)
      );
    }
  };
  return (
    <div className="addAlgo-container">
      <div>
        <button className="back_button" onClick={onBackClick}>
          <h1>
            <HomeIcon />
          </h1>
        </button>
        <ToastContainer hideProgressBar={true} />
      </div>
      <h1 className="mainTitle">
        {state ? "Edit Algorithm" : "Add New Algorithm"}
      </h1>

      <div className="fields">
        {/* {state && (
          <div className="rowSmall">
            <div className="columnLeftAddAlgo">
              <label className="fieldTitle">Origin Algorithm's name</label>
            </div>
            <div className="columnRightAddAlgo">
              <input
                className="inputClass"
                type="text"
                value={originName}
                onChange={onNameChange}
                placeholder="ex. DiCE"
                disabled={true}
              />
            </div>
          </div>
        )} */}
        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Algorithm's name</label>
          </div>
          <div className="columnRightAddAlgo">
            <input
              className="inputClass"
              type="text"
              value={algoName}
              onChange={onNameChange}
              placeholder="ex. DiCE"
            />
          </div>
        </div>

        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Description</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoDesc}
              onChange={onDescChange}
              placeholder="wirte a short text about your algorithm so others would be able to undertsand before choosing it."
            />
          </div>
        </div>

        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Output example description</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoOutputExample}
              onChange={onOutputChange}
              placeholder="describe how the output should be, for example, it minimizes the distance from origin input"
            />
          </div>
        </div>
        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Additional Info</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoInfo}
              onChange={onInfoChange}
              placeholder="here is the place to elaborate and explained further about your agorithm, only those who would like to see further information would be exposed to this part.
              you could place your email. github,website and so on."
            />
          </div>
        </div>

        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">
              {state ? "Update File" : "Code File"}
            </label>
          </div>
          <div className="columnRightAddAlgo">
            <input
              className="fileClass"
              type="file"
              id="files"
              onChange={handleModelFileUpload}
            />
          </div>
        </div>

        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Acceptable Models </label>
          </div>
          <div className="columnRightAddAlgo">
            <FormControlLabel
              value={AlgoType.Regressor}
              className="checkboxLeft"
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                  onChange={onTypeClick}
                />
              }
              checked={algoTypes.includes(AlgoType.Regressor)}
              label="Regression Models"
              labelPlacement="Regression Models"
            />
            <FormControlLabel
              className="checkboxRight"
              value={AlgoType.Classifier}
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                  onChange={onTypeClick}
                />
              }
              checked={algoTypes.includes(AlgoType.Classifier)}
              label="Classification Models"
              labelPlacement="Classification Models"
            />
          </div>
        </div>

        <div className="row">
          <div className="shortInput">
            <button className="paramsButton" onClick={onAddParamsClick}>
              {parametersList.length === 0
                ? "Add Parameters"
                : "Edit parameters"}
            </button>
          </div>
        </div>
      </div>

      <AddParametersModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        paramsList={parametersList}
        setParamsList={setParametersList}
      />
      <div>
        <button
          className="submitButton"
          disabled={!isSubmitValid || addingClicked}
          onClick={onAddClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddAlgorithmPage;
