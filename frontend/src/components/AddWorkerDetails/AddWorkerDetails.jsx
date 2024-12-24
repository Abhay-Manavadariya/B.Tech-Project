import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "./AddWorkerDetails.css";
import { UilPlus } from "@iconscout/react-unicons";
import axiosApi from "../../Common/BaseUrl";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as EmailValidator from "email-validator";
const AddWorkerDetails = () => {
  const [EquipmentList, setEquipmentList] = useState([]);

  //Get All Data of PumpName
  useEffect(() => {
    axiosApi
      .get("api/getAllPumpName")
      .then((response) => {
        if (response.status === 200) {
          setEquipmentList(response.data);
        }
      })
      .catch((error) => {});
  }, []);

  //initial State for Add Worker Details
  const initialValuesForAddWorkerDetails = {
    pumpId: "",
    firstName: "",
    lastName: "",
    email: "",
    aadhaarCard: "",
    joiningDate: "",
    mobileNo: "",
    address: "",
    salary: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  };

  const [valuesForAddWorkerDetails, setValuesForAddWorkerDetails] = useState(
    initialValuesForAddWorkerDetails
  );

  const handleChangeForAddWorkerDetails = (differentParam) => (event) => {
    setValuesForAddWorkerDetails({
      ...valuesForAddWorkerDetails,
      [differentParam]: event.target.value,
    });
  };

  var {
    pumpId,
    firstName,
    lastName,
    email,
    aadhaarCard,
    mobileNo,
    address,
    salary,
    joiningDate,
    country,
    state,
    city,
    pinCode,
  } = valuesForAddWorkerDetails;

  const handleSubmitForAddWorkerDetails = async (e) => {
    e.preventDefault();
    console.log("values :-", valuesForAddWorkerDetails);

    let flag = true;

    if (
      !pumpId ||
      !firstName ||
      !lastName ||
      !email ||
      !aadhaarCard ||
      !mobileNo ||
      !address ||
      !joiningDate ||
      !salary ||
      !country ||
      !state ||
      !city ||
      !pinCode
    ) {
      flag = false;
      toast.error("Please fill up all details.");
    } else if (!/^\d+$/.test(mobileNo) || mobileNo.length != 10) {
      flag = false;
      toast.warn("Please enter correct mobile no.");
    } else if (!EmailValidator.validate(email)) {
      flag = false;
      toast.warn("Please enter correct email address.");
    } else if (aadhaarCard.length != 12) {
      flag = false;
      toast.warn("Please enter valid aadhaarCard number.");
    } else if (flag) {
      const payload = {
        pumpId: pumpId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        aadhaarCard: aadhaarCard,
        mobileNo: mobileNo,
        address: address,
        pinCode: pinCode,
        joiningDate: moment(joiningDate).format("YYYY-MM-DD"),
        salary: salary,
        country: country,
        state: state,
        city: city,
      };
      await axiosApi
        .post("api/AddWorkerDetails", payload)
        .then((response) => {
          if (response.status === 201) {
            toast.success("WorkerDetails Added Successfully.");
            resetForAddWorkerDetails();
          }
        })
        .catch((error) => {});
    } else {
      toast.error("Something Error!!!!");
    }
  };

  const resetForAddWorkerDetails = () => {
    setValuesForAddWorkerDetails(initialValuesForAddWorkerDetails);
  };

  return (
    <>
      <div className="AddWorkerDetails">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Add Worker Details</h1>
          </div>

          <div className="form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <FormControl sx={{ m: 1, minWidth: "98%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Equipment List
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Equipment List"
                    value={pumpId}
                    onChange={handleChangeForAddWorkerDetails("pumpId")}
                  >
                    <MenuItem
                      style={{
                        backgroundColor: "rgb(0 7 42)",
                        color: "antiquewhite",
                      }}
                      key={0}
                      value={0}
                    >
                      --Select--
                    </MenuItem>
                    {EquipmentList.map((data) => (
                      <MenuItem
                        key={data.id}
                        value={data.id}
                        style={{
                          backgroundColor: "rgb(0 7 42)",
                          color: "antiquewhite",
                        }}
                      >
                        {data.pumpName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="First Name"
                    value={firstName}
                    onChange={handleChangeForAddWorkerDetails("firstName")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Last Name"
                    value={lastName}
                    onChange={handleChangeForAddWorkerDetails("lastName")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Email"
                    value={email}
                    onChange={handleChangeForAddWorkerDetails("email")}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Aadhaar Card"
                    value={aadhaarCard}
                    onChange={handleChangeForAddWorkerDetails("aadhaarCard")}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Mobile No"
                    value={mobileNo}
                    onChange={handleChangeForAddWorkerDetails("mobileNo")}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Joining Date"
                    value={joiningDate}
                    placeholder="YYYY-MM-DD"
                    onChange={handleChangeForAddWorkerDetails("joiningDate")}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Address"
                    value={address}
                    onChange={handleChangeForAddWorkerDetails("address")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Salary"
                    value={salary}
                    onChange={handleChangeForAddWorkerDetails("salary")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="PinCode"
                    value={pinCode}
                    onChange={handleChangeForAddWorkerDetails("pinCode")}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="Country"
                    value={country}
                    onChange={handleChangeForAddWorkerDetails("country")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "17px",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="State"
                    value={state}
                    onChange={handleChangeForAddWorkerDetails("state")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    id="outlined-text"
                    label="City"
                    value={city}
                    onChange={handleChangeForAddWorkerDetails("city")}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
                </div>
              </div>

              {/* <div style={{ margin: "8px" }}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                  >
                    <UilPlus style={{ padding: "4px", marginTop: "-1px" }} />
                    Upload Photo
                  </Button>
                </label>
              </div> */}
              <div style={{ margin: "8px" }}>
                <Button
                  variant="contained"
                  style={{ background: "dodgerblue" }}
                  onClick={handleSubmitForAddWorkerDetails}
                >
                  Save
                </Button>

                <Button
                  variant="contained"
                  style={{ background: "#7a7a7a", marginLeft: "23px" }}
                  onClick={resetForAddWorkerDetails}
                >
                  Reset
                </Button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkerDetails;
