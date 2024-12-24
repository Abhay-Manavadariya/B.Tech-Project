import React, { useState, useEffect } from "react";
import "./Add.css";
import Button from "@mui/material/Button";
import { UilPlus, UilTimesCircle } from "@iconscout/react-unicons";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@material-ui/core/Input";
import TextField from "@mui/material/TextField";
import axiosApi from "../../Common/BaseUrl";
import moment from "moment/moment";
import { toast } from "react-toastify";
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

const Add = () => {
  const [EquipmentList, setEquipmentList] = useState([]);

  //Get All Data of PumpName
  useEffect(() => {
    const intervalid = setInterval(() => {
      axiosApi
        .get("api/getAllPumpName")
        .then((response) => {
          if (response.status === 200) {
            setEquipmentList(response.data);
          }
        })
        .catch((error) => {});
    }, 100);
    return () => clearInterval(intervalid);
  }, []);

  //open Add Pump Model
  const [openAddPump, setOpenAddPump] = useState(false);
  const handleOpenAddPump = () => setOpenAddPump(true);
  const handleCloseAddPump = () => {
    setOpenAddPump(false);
    setValuesForAddPump(initialValuesForAddPump);
  };

  //open Add new Stock Model
  const [openAddNewStock, setOpenAddNewStock] = useState(false);
  const handleOpenAddNewStock = () => setOpenAddNewStock(true);
  const handleCloseAddNewStock = () => {
    setOpenAddNewStock(false);
    setValuesForAddNewStock(initialStateForAddNewStock);
  };

  //----------------------------------Start of Add Pump Code------------------------------//

  //initial State for Add pump
  const initialValuesForAddPump = {
    pumpName: "",
    dispenserType: "Static Pump",
    unitName: "PUMP",
    noOfNozzles: "",
    storageCapacity: "",
    stopPumpEvent: "",
  };

  const [valuesForAddPump, setValuesForAddPump] = useState(
    initialValuesForAddPump
  );

  const handleChangeForAddPump = (differentParam) => (event) => {
    setValuesForAddPump({
      ...valuesForAddPump,
      [differentParam]: event.target.value,
    });
  };

  var {
    pumpName,
    dispenserType,
    unitName,
    noOfNozzles,
    storageCapacity,
    stopPumpEvent,
  } = valuesForAddPump;

  const handleSubmitForAddPump = async (e) => {
    e.preventDefault();

    let validationFlag = true;

    if (!pumpName || !noOfNozzles || !storageCapacity || !stopPumpEvent) {
      validationFlag = false;
      toast.error("Please enter all the required field.");
    } else if (!/^\d*$/.test(noOfNozzles)) {
      validationFlag = false;
      toast.error("Please enter Only Number in Nozzle Field.");
    } else if (!/^\d*$/.test(storageCapacity)) {
      validationFlag = false;
      toast.error("Please enter Only Number in storage capacity Field.");
    } else if (!/^\d*$/.test(stopPumpEvent)) {
      validationFlag = false;
      toast.error("Please enter Only Number in Stop pump event Field.");
    }

    if (validationFlag) {
      const payload = {
        pumpName: pumpName,
        storageCapacity: storageCapacity,
        unitName: unitName,
        noOfNozzle: noOfNozzles,
        dispenseStop: stopPumpEvent,
        dispenserType: dispenserType,
      };
      await axiosApi.post("api/addPumpDetails", payload).then((response) => {
        if (response.status === 200) {
          toast.success("Pump Details Successfully Added.");
          //reset value
          setValuesForAddPump(initialValuesForAddPump);
        } else {
          toast.error(
            "The task you trying to perform is temporarily unavailable"
          );
        }
      });
    }
  };

  //---------------------------------End of Add Code------------------------------------------//

  //---------------------------------Start of Add New Stock Code------------------------------//

  //for Date
  const [startDate, setStartDate] = useState(new Date());

  const initialStateForAddNewStock = {
    remark: "",
    petrolLtr: "",
    equipmentList: "",
    petrolRate: "",
  };

  const [valuesForAddNewStock, setValuesForAddNewStock] = useState(
    initialStateForAddNewStock
  );

  const handleChangeForAddNewStock = (differentParam) => (event) => {
    setValuesForAddNewStock({
      ...valuesForAddNewStock,
      [differentParam]: event.target.value,
    });
  };

  var { remark, petrolLtr, equipmentList, petrolRate } = valuesForAddNewStock;

  const handleSubmitForAddNewStock = async (e) => {
    e.preventDefault();

    let validationFlag = true;

    if (!petrolLtr) {
      validationFlag = false;
      toast.error("Please enter all the required field.");
    } else if (!/^\d*$/.test(petrolLtr)) {
      validationFlag = false;
      toast.error("Please enter Only Number in Petrol(Ltr) Field.");
    } else if (!/^\d+(\.\d+)?$/.test(petrolRate)) {
      validationFlag = false;
      toast.error("Please enter Only Number in Petrol Rate Field.");
    }

    if (validationFlag) {
      const payload = {
        pumpId: equipmentList,
        remark: remark,
        petrolRate: petrolRate,
        addNewStockOfPetrolLitre: petrolLtr,
        addNewStockDate: moment(startDate).format("YYYY-MM-DD"),
      };

      await axiosApi.post("api/AddNewStock", payload).then((response) => {
        console.log("response :- ", response);
        if (response.status === 200) {
          toast.success("New Stock of petrol Added Successfully.");
          //reset value
          setValuesForAddNewStock(initialStateForAddNewStock);

          setStartDate(new Date());
          handleCloseAddNewStock();
        } else {
          toast.error(
            "The task you trying to perform is temporarily unavailable"
          );
        }
      });
    }
  };

  //---------------------------------End of Add New Stock Code--------------------------------//
  return (
    <>
      <div className="Add">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Add</h1>
          </div>

          <div className="button">
            <div className="btnpump">
              <Button variant="contained" onClick={handleOpenAddPump}>
                <UilPlus />
                <span style={{ marginLeft: "4px" }}> Add Pump</span>
              </Button>
            </div>
            <div className="btnNewStock">
              <Button
                variant="contained"
                style={{ backgroundColor: "darkslategray" }}
                onClick={handleOpenAddNewStock}
              >
                <UilPlus />
                <span style={{ marginLeft: "4px" }}> Add New Stock</span>
              </Button>
            </div>
          </div>

          <div className="model">
            <Modal
              open={openAddPump}
              onClose={!openAddPump}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Pump
                  <Button
                    style={{ marginLeft: "75%" }}
                    onClick={handleCloseAddPump}
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
                    Pump Name :-
                  </Typography>
                  {/* <Input className="text" placeholder="Enter Ltr" /> */}
                  <TextField
                    id="outlined-basic"
                    label="Pump Name"
                    variant="outlined"
                    name="pumpName"
                    value={valuesForAddPump.pumpName}
                    onChange={handleChangeForAddPump("pumpName")}
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
                    Dispenser Type:-
                  </Typography>

                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Dispenser Type"
                    defaultValue="Static Pump"
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
                    unitName:-
                  </Typography>

                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="unitName"
                    defaultValue="Pump"
                    InputProps={{
                      readOnly: true,
                    }}
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
                    No. Of Nozzles:-
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    label="Nozzle"
                    variant="outlined"
                    name="noOfNozzles"
                    value={valuesForAddPump.noOfNozzles}
                    onChange={handleChangeForAddPump("noOfNozzles")}
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
                    Storage Capacity (Ltr):-
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    label="Capacity"
                    variant="outlined"
                    name="storageCapacity"
                    value={valuesForAddPump.storageCapacity}
                    onChange={handleChangeForAddPump("storageCapacity")}
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
                    Stop Pump Event (Ltr):-
                  </Typography>

                  <TextField
                    id="outlined-basic"
                    label="Ltr"
                    variant="outlined"
                    name="stopPumpEvent"
                    value={valuesForAddPump.stopPumpEvent}
                    onChange={handleChangeForAddPump("stopPumpEvent")}
                  />
                </div>

                <div className="form-group col-md-4 model">
                  <Button
                    variant="contained"
                    style={{ margin: "auto" }}
                    onClick={handleSubmitForAddPump}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </Modal>

            <Modal
              open={openAddNewStock}
              onClose={!openAddNewStock}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Stock
                  <Button
                    style={{ marginLeft: "67%" }}
                    onClick={handleCloseAddNewStock}
                  >
                    <span>
                      <UilTimesCircle />
                    </span>
                  </Button>
                  <hr />
                </Typography>

                <div className="form-group col-md-4 model">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ width: "-webkit-fill-available" }}
                  >
                    EquipmentList :-
                  </Typography>
                  <select
                    name="list"
                    className="form-control select"
                    style={{ width: "110%" }}
                    values={valuesForAddNewStock.equipmentList}
                    onChange={handleChangeForAddNewStock("equipmentList")}
                  >
                    <option>-- Select EquipmentList --</option>

                    {EquipmentList.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.pumpName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-4 model">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ width: "-webkit-fill-available" }}
                  >
                    Date :-
                  </Typography>
                  <DatePicker
                    className="DateForAdd"
                    selected={startDate}
                    showIcon={true}
                    popperPlacement="bottom-start"
                    onChange={(date) => setStartDate(date)}
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
                    }}
                  >
                    Petrol(Ltr) :-
                  </Typography>
                  <Input
                    className="text"
                    placeholder="Enter Ltr"
                    values={valuesForAddNewStock.petrolLtr}
                    onChange={handleChangeForAddNewStock("petrolLtr")}
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
                    }}
                  >
                    Rate :-
                  </Typography>
                  <Input
                    className="text"
                    placeholder="Enter Rate"
                    values={valuesForAddNewStock.petrolRate}
                    onChange={handleChangeForAddNewStock("petrolRate")}
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
                    }}
                  >
                    Remark :-
                  </Typography>
                  <Input
                    className="text"
                    values={valuesForAddNewStock.remark}
                    onChange={handleChangeForAddNewStock("remark")}
                  />
                </div>

                <div className="form-group col-md-4 model">
                  <Button
                    variant="contained"
                    style={{ margin: "auto" }}
                    onClick={handleSubmitForAddNewStock}
                  >
                    Save
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
