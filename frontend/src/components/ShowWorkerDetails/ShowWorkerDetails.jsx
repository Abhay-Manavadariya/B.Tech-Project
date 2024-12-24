import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./ShowWorkerDetails.css";
import DataTable, { createTheme } from "react-data-table-component";
import axiosApi from "../../Common/BaseUrl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

createTheme("solarized", {
  text: {
    primary: "#d2d2d2",
    secondary: "#afff7e",
  },
  background: {
    default: "#002b36",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
const ShowWorkerDetails = () => {
  const [data, setData] = useState();

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

  const handleChangeForShowWorkerDetails = (event) => {
    setPumpId(event.target.value);
  };

  const handleSubmitForShowWorkerDetails = async (e) => {
    e.preventDefault();

    const payload = {
      pumpId: pumpId,
    };

    console.log("payload :- ",payload);
    await axiosApi.post("api/getAllWorkerDetails", payload).then((response) => {
      console.log("response :- ", response);
      if (response.status === 200) {
        setData(response.data);
      }
    });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
      button: true,
    },
    {
      name: "FirstName",
      selector: (row) => row.firstName,
      sortable: true,
      button: true,
      width: "150px",
    },
    {
      name: "LastName",
      selector: (row) => row.lastName,
      width: "300px",
      button: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      button: true,
      width: "150px",
    },
    {
      name: "AadhaarCard",
      selector: (row) => row.aadhaarCard,
      button: true,
      width: "150px",
    },
    {
      name: "MobileNo",
      selector: (row) => row.mobileNo,
      button: true,
      width: "150px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      button: true,
      width: "250px",
    },
    {
      name: "Joining Date",
      selector: (row) => row.joiningDate,
      button: true,
      width: "250px",
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
      button: true,
      width: "250px",
    },
    {
      name: "Country",
      selector: (row) => row.country,
      button: true,
      width: "250px",
    },
    {
      name: "State",
      selector: (row) => row.state,
      button: true,
      width: "250px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      button: true,
      width: "250px",
    },
  ];

  return (
    <>
      <div className="ShowWorkerDetails">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Worker Details</h1>
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
                onChange={handleChangeForShowWorkerDetails}
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
          <div className="btn">
            <Button
              variant="contained"
              style={{ margin: "auto", width: "10rem" }}
              onClick={handleSubmitForShowWorkerDetails}
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="table">
          <div className="tablemain">
            <DataTable
              title="Records"
              //keyField="id"
              theme="solarized"
              columns={columns}
              data={data}
              pagination
              fixedHeader
              responsive
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowWorkerDetails;
