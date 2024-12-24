import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axiosApi from "../../Common/BaseUrl";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { UilPlus, UilTimesCircle } from "@iconscout/react-unicons";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./DeviceFirmware.css";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
const DeviceFirmware = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axiosApi
      .get("api/getAllDeviceFirmware")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {});
  }, []);

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
      width: "80px",
      button: true,
    },
    {
      name: "Uid",
      selector: (row) => row.uid,
      sortable: true,
      button: true,
      width: "150px",
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
      width: "300px",
      button: true,
    },
    {
      name: "Command",
      selector: (row) => row.cmd,
      button: true,
      width: "150px",
    },
    {
      name: "Value",
      selector: (row) => row.value,
      button: true,
      width: "150px",
    },
    {
      name: "Send Time",
      selector: (row) => moment(row.sendTime).format("DD-MM-YYYY HH:mm:ss"),
      button: true,
      width: "150px",
    },
    {
      name: "Create Date",
      selector: (row) => moment(row.createdOn).format("DD-MM-YYYY HH:mm:ss"),
      button: true,
      width: "150px",
    },
    {
      name: "status",
      selector: (row) => row.status,
      button: true,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      button: true,
      width: "150px",
      cell: (row) => (
        <Button
          style={{
            background: "wheat",
            width: "100px",
            height: "30px",
          }}
        >
          {row.action}
        </Button>
      ),
    },
  ];

  const deviceFirmData = data;
  if (deviceFirmData) {
    deviceFirmData.map((item, index) => {
      item.id = index + 1;
      return item;
    });
  }

  const initialValuesForAddDeviceFirmware = {
    batch: "",
    uid: "",
    command: "",
    value: "",
  };

  const [valuesForAddDeviceFirmware, setValuesForAddDeviceFirmware] = useState(
    initialValuesForAddDeviceFirmware
  );

  const handleChangeForDeviceFirmware = (differentParam) => (event) => {
    setValuesForAddDeviceFirmware({
      ...valuesForAddDeviceFirmware,
      [differentParam]: event.target.value,
    });
  };

  var { batch, uid, command, value } = valuesForAddDeviceFirmware;

  const handleSubmitForAddDeviceFirmware = async (e) => {
    e.preventDefault();
    const payload = {
      batch: batch,
      uid: uid,
      cmd: command,
      value: value,
      status: "pending",
      action: "cancel",
      sendTime: new Date(),
    };
    await axiosApi
      .post("api/addDevicecFirmwareDetails", payload)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Device firmware data added successfully.");
          //reset value
          setValuesForAddDeviceFirmware(initialValuesForAddDeviceFirmware);
          handleCloseAddDeviceFirmware();
        } else {
          toast.error(
            "The task you trying to perform is temporarily unavailable"
          );
        }
      });
  };

  const [openDeviceFirmware, setOpenDeviceFirmware] = useState(false);
  const handleOpenAddDeviceFirmware = () => setOpenDeviceFirmware(true);
  const handleCloseAddDeviceFirmware = () => {
    setOpenDeviceFirmware(false);
    setValuesForAddDeviceFirmware(initialValuesForAddDeviceFirmware);
  };

  return (
    <>
      <div className="TankFillingData">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Device Firmware</h1>
          </div>
        </div>

        <div className="button">
          <div className="btnpump">
            <Button variant="contained" onClick={handleOpenAddDeviceFirmware}>
              <UilPlus />
              <span style={{ marginLeft: "4px" }}>Add Device Firmware</span>
            </Button>
          </div>
        </div>

        <div className="model">
          <Modal
            open={openDeviceFirmware}
            onClose={!openDeviceFirmware}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Device Firmware
                <Button
                  style={{ margin: "auto", marginLeft: "57%" }}
                  onClick={handleCloseAddDeviceFirmware}
                >
                  <UilTimesCircle />
                </Button>
                <hr />
              </Typography>
              <div className="form-group col-md-4 model">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    width: "-webkit-fill-available",
                    marginLeft: "auto",
                    color: "green",
                  }}
                >
                  Batch :-
                </Typography>
                {/* <Input className="text" placeholder="Enter Ltr" /> */}
                <TextField
                  id="outlined-basic"
                  label="Batch"
                  variant="outlined"
                  name="Batch"
                  value={valuesForAddDeviceFirmware.batch}
                  onChange={handleChangeForDeviceFirmware("batch")}
                />
              </div>

              <div className="form-group col-md-4 model">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    width: "-webkit-fill-available",
                    marginLeft: "auto",
                    color: "green",
                  }}
                >
                  Uid:-
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="Uid"
                  variant="outlined"
                  name="Uid"
                  value={valuesForAddDeviceFirmware.uid}
                  onChange={handleChangeForDeviceFirmware("uid")}
                />
              </div>

              <div className="form-group col-md-4 model">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    width: "-webkit-fill-available",
                    marginLeft: "auto",
                    color: "green",
                  }}
                >
                  Command:-
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="Command"
                  variant="outlined"
                  name="Command"
                  value={valuesForAddDeviceFirmware.command}
                  onChange={handleChangeForDeviceFirmware("command")}
                />
              </div>

              <div className="form-group col-md-4 model">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    width: "-webkit-fill-available",
                    marginLeft: "auto",
                    color: "green",
                  }}
                >
                  value:-
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="Value"
                  variant="outlined"
                  name="Value"
                  value={valuesForAddDeviceFirmware.value}
                  onChange={handleChangeForDeviceFirmware("value")}
                />
              </div>

              <div className="form-group col-md-4 model">
                <Button
                  variant="contained"
                  style={{ margin: "auto" }}
                  onClick={handleSubmitForAddDeviceFirmware}
                >
                  Save
                </Button>
              </div>
            </Box>
          </Modal>
        </div>

        <div className="table">
          <div className="tablemain">
            <DataTable
              title="Device Firmware Data"
              //keyField="id"
              theme="solarized"
              columns={columns}
              data={deviceFirmData}
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
export default DeviceFirmware;
