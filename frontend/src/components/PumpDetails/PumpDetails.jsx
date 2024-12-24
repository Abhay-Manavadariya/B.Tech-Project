import React, { useEffect, useState } from "react";
import "./PumpDetails.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Lottie from "lottie-react";
import system_name from "./system_name.json";
import bookmark from "./bookmark.json";
import bookmark2 from "./bookmark2.json";
import database from "./database.json";
import Card from "react-bootstrap/Card";
import loader from "./loader.json";
import axiosApi from "../../Common/BaseUrl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { UilCheckCircle } from "@iconscout/react-unicons";
import { UilTimesCircle } from "@iconscout/react-unicons";
import moment from "moment";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//switch component
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PumpDetails = () => {
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

  const [pumpId, setPumpId] = useState();

  const [apiResponse, setApiResponse] = useState();

  const handleChangeForPumpDetails = (event) => {
    setPumpId(event.target.value);
  };

  const handleSubmitForPumpDetailsData = async (e) => {
    e.preventDefault();

    if (pumpId != 0) {
      const payload = {
        pumpId: pumpId,
      };

      await axiosApi.post("api/getPumpDetails", payload).then((response) => {
        if (response.status === 200) {
          setApiResponse(response.data);
          console.log(response);
        }
      });
    } else {
      setApiResponse(null);
    }
  };

  const theme = useTheme();

  return (
    <>
      <div className="pumpdetails">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Pump Details</h1>
          </div>
        </div>

        <div className="selection">
          <div className="dropdown">
            <FormControl sx={{ m: 0, width: 210, mt: 3 }}>
              <InputLabel id="demo-multiple-name-label">
                Equipment List
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                input={<OutlinedInput label="Equipment List" />}
                MenuProps={MenuProps}
                style={{ width: "286%" }}
                values={pumpId}
                onChange={handleChangeForPumpDetails}
              >
                <MenuItem
                  style={{
                    backgroundColor: "rgb(0 7 42)",
                    color: "antiquewhite",
                  }}
                  value={0}
                  key={0}
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
          <div className="btn">
            <Button
              variant="contained"
              style={{ margin: "auto", width: "10rem" }}
              onClick={handleSubmitForPumpDetailsData}
            >
              Submit
            </Button>
          </div>
        </div>

        {apiResponse ? (
          <>
            <div className="cards">
              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie
                      animationData={system_name}
                      style={{ width: "4rem" }}
                    />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>System Name</Card.Title>
                    </div>

                    <Card.Text>
                      <div className="card-text">
                        {apiResponse.pumpName ? apiResponse.pumpName : ""}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>

              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie
                      animationData={bookmark}
                      style={{ width: "4rem" }}
                    />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>Total Nozzles</Card.Title>
                    </div>

                    <Card.Text>
                      <div className="card-text">
                        {apiResponse.totalNozzle ? apiResponse.totalNozzle : ""}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>

              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie
                      animationData={bookmark}
                      style={{ width: "4rem" }}
                    />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>
                        Pump Status:-{" "}
                        {apiResponse.dispensingStatus ? (
                          <>
                            <span>
                              <UilCheckCircle />
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              <UilTimesCircle />
                            </span>
                          </>
                        )}{" "}
                      </Card.Title>
                    </div>

                    <div className="card-title">
                      <Card.Title>
                        Dispensing Status:-{" "}
                        {apiResponse.dispensingStatus ? (
                          <>
                            <span>
                              <UilCheckCircle />
                            </span>
                          </>
                        ) : (
                          <span>
                            <UilTimesCircle />
                          </span>
                        )}
                      </Card.Title>
                    </div>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>
            </div>

            <div className="cards">
              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie animationData={loader} style={{ width: "4rem" }} />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>Last Rate Change</Card.Title>
                    </div>

                    <Card.Text>
                      <div className="card-text">
                        {apiResponse.lastModifiedInRate
                          ? moment(apiResponse.lastModifiedInRate).format(
                              "YYYY MMM DD h:mm A"
                            )
                          : ""}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>

              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie animationData={loader} style={{ width: "4rem" }} />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>Last Updated On Pump</Card.Title>
                    </div>

                    <Card.Text>
                      <div className="card-text">
                        {apiResponse.lastUpdateOnPump
                          ? moment(apiResponse.lastUpdateOnPump).format(
                              "YYYY MMM DD h:mm A"
                            )
                          : ""}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>

              <Card border="primary" className="card">
                <div className="items">
                  <div className="icons">
                    <Lottie animationData={loader} style={{ width: "4rem" }} />
                  </div>

                  <Card.Body>
                    <div className="card-title">
                      <Card.Title>FUEL CURRENT STOCK</Card.Title>
                    </div>

                    <Card.Text>
                      <div className="card-text">
                        {apiResponse.fuelCurrentStock
                          ? apiResponse.fuelCurrentStock
                          : ""}{" "}
                        Ltr
                      </div>
                    </Card.Text>
                  </Card.Body>
                </div>
                {/* <Card.Header></Card.Header> */}
              </Card>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default PumpDetails;
