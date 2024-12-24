import React, { useState, useEffect } from "react";
import "./RateChange.css";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableCell";
import { TableHead } from "@mui/material";
import { EquipmentListApi } from "../../Common/EquipmentListApi";
import axiosApi from "../../Common/BaseUrl";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { toast } from "react-toastify";
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

const RateChange = () => {
  const theme = useTheme();

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

  const handleChangeForRateChange = (event) => {
    setPumpId(event.target.value);
  };

  const [rateInput, setRateInput] = useState();

  const handleChangeForRateInput = (event) => {
    setRateInput(event.target.value);
  };

  const handleSubmitForRateChange = async (e) => {
    e.preventDefault();

    if (pumpId != 0) {
      const payload = {
        pumpId: pumpId,
      };

      await axiosApi.post("api/getPumpDetails", payload).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setApiResponse(response.data);
          setRateInput(response.data.currentPetrolRate);
        }
      });
    } else {
      setApiResponse(null);
    }
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmitForRateInput = async (e) => {
    e.preventDefault();

    const payload = {
      currentRate: rateInput,
      pumpId: pumpId,
    };

    console.log("payload :- ", payload);

    await axiosApi.post("api/rateChange", payload).then((response) => {
      console.log(response);
      if (response.status === 200) {
        toast.success("Petrol rate change successfully.");
        setApiResponse(null);
        setPumpId();
      }
    });
  };

  return (
    <>
      <div className="RateChange">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>RateView</h1>
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
                onChange={handleChangeForRateChange}
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
              onClick={handleSubmitForRateChange}
            >
              Submit
            </Button>
          </div>
        </div>

        {apiResponse ? (
          <>
            <div
              className="card"
              style={{
                height: "28%",
                width: "60%",
                borderRadius: "1%",
                background: "darkslategray",
              }}
            >
              <Table bordered className="table">
                <TableBody>
                  <tr>
                    <td scope="row">
                      <b>UnitName :-</b>
                    </td>
                    <td>{apiResponse.pumpName}</td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <b>Total Nozzels :-</b>
                    </td>
                    <td>{apiResponse.totalNozzle}</td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <b>Last Rate Change:-</b>
                    </td>
                    <td>
                      {" "}
                      {moment(apiResponse.lastModifiedInRate).format(
                        "YYYY MMM DD h:mm A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <b>Last Updated on PUMP :-</b>
                    </td>
                    <td>
                      {" "}
                      {moment(apiResponse.lastUpdateOnPump).format(
                        "YYYY MMM DD h:mm A"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td scope="row">
                      <b>Update Rate :-</b>
                    </td>
                    <td>
                      {apiResponse ? (
                        <>
                          <Checkbox checked={checked} onChange={handleChange} />
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                </TableBody>
              </Table>
            </div>

            <div className="nozzelDetails">
              <table
                style={{
                  border: "1px solid black",
                  width: "auto",
                  marginLeft: "1rem",
                  background: "darkslategray",
                  borderRadius: "4px",
                  color: "antiquewhite",
                }}
              >
                <thead>
                  <tr>
                    <td className="td">Nozzel</td>
                    <td className="td">Rate</td>
                  </tr>
                </thead>
                <tbody>
                  {Array(apiResponse.totalNozzle)
                    .fill()
                    .map((_, i) => (
                      <React.Fragment key={i}>
                        <tr>
                          <td className="td">{i + 1}</td>
                          <td className="td">
                            <input
                              name={`myInput-${i}`}
                              style={{
                                padding: "8px",
                                width: "100px",
                                borderRadius: "4px",
                                backgroundColor: "transparent",
                                color: "aliceblue",
                              }}
                              value={rateInput}
                              onChange={handleChangeForRateInput}
                              disabled={!checked}
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>

              {checked ? (
                <>
                  {" "}
                  <div
                    style={{
                      display: "block",
                      margin: "20px",
                    }}
                  >
                    <Button
                      style={{
                        background: "#233434",
                        color: "aquamarine",
                      }}
                      onClick={handleSubmitForRateInput}
                    >
                      Update Rate
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default RateChange;
