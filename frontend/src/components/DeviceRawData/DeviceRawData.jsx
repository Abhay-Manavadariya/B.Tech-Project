import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./DeviceRawData.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DataTable, { createTheme } from "react-data-table-component";
import axiosApi from "../../Common/BaseUrl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
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

const DeviceRawData = () => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    if (data) {
      const result = data.filter((data) => {
        return data.requestedDate.toLowerCase().match(search.toLowerCase());
      });
      setFilterData(result);
    }
  }, [search]);

  //toooltip
  const [tooltipText, setTooltipText] = useState();

  const handleCellHover = (event) => {
    const cellText = event.target.textContent;
    setTooltipText(cellText);
  };

  const handleCellLeave = () => {
    setTooltipText("");
  };

  const [fromDate, setFromDate] = useState(null);

  const handleChangeForFromDate = (newValue) => {
    setFromDate(newValue);
  };

  const [toDate, setToDate] = useState(null);

  const handleChangeForToDate = (newValue) => {
    setToDate(newValue);
  };

  const initialStateForDeviceRawData = {
    errorMessageForFromDate: "",
    errorMessageForToDate: "",
  };

  const [valuesForDeviceRawData, setValuesForDeviceRawData] = useState(
    initialStateForDeviceRawData
  );

  var { errorMessageForFromDate, errorMessageForToDate } =
    valuesForDeviceRawData;

  const handleSubmitForDeviceRawData = async (e) => {
    e.preventDefault();

    let validationFlag = true;

    if (!fromDate) {
      validationFlag = false;
      setValuesForDeviceRawData({
        ...valuesForDeviceRawData,
        errorMessageForFromDate: "Please Enter From Date.",
      });
      return;
    } else if (!toDate) {
      validationFlag = false;
      setValuesForDeviceRawData({
        ...valuesForDeviceRawData,
        errorMessageForToDate: "Please Enter To Date.",
      });
      return;
    }

    if (validationFlag) {
      const payload = {
        fromDate: dayjs(fromDate).format("DD-MM-YYYY"),
        toDate: dayjs(toDate).format("DD-MM-YYYY"),
      };
      await axiosApi
        .post("api/getAllDeviceRawData", payload)
        .then((response) => {
          console.log("response :- ", response);
          if (response.status === 200) {
            setData(response.data);
            setFilterData(response.data);
            //reset the values
            setValuesForDeviceRawData(initialStateForDeviceRawData);
          } else {
            toast.error(
              "The task you trying to perform is temporarily unavailable"
            );
          }
        });
    }
  };

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
      name: "Request Params",
      selector: (row) => row.requestParams,
      width: "300px",
      button: true,
      conditionalCellStyles: [
        {
          when: (row) => row.requestParams === tooltipText,
          style: {
            cursor: "help",
            backgroundColor: "#002b36",
            position: "relative",
          },
        },
      ],
      cell: (row) => (
        <div
          onMouseEnter={handleCellHover}
          onMouseLeave={handleCellLeave}
          title={row.requestParams}
        >
          {row.requestParams}
        </div>
      ),
    },
    {
      name: "Response Params",
      selector: (row) => row.responseParams,
      button: true,
      width: "150px",
    },
    {
      name: "Msg Id",
      selector: (row) => row.msgId,
      button: true,
      width: "150px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      button: true,
    },
    {
      name: "Entrypoint",
      selector: (row) => row.entryPoint,
      button: true,
      width: "150px",
    },
    {
      name: "CreateDate",
      selector: (row) => row.createDate,
      button: true,
      width: "150px",
    },
    {
      name: "Last UpdateDate",
      selector: (row) => row.lastUpdateDate,
      button: true,
      width: "150px",
    },
    {
      name: "Requested Date",
      selector: (row) => row.requestedDate,
      sortable: true,
      width: "150px",
      button: true,
    },
    {
      name: "CreatedBy",
      selector: (row) => row.createdBy,
      sortable: true,
      width: "150px",
      button: true,
    },
    {
      name: "Last UpdatedBy",
      selector: (row) => row.lastUpdatedBy,
      sortable: true,
      width: "150px",
      button: true,
    },
  ];

  const deviceData = filterData;
  if (deviceData) {
    deviceData.map((item, index) => {
      item.id = index + 1;
      return item;
    });
  }

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        // eslint-disable-next-line no-plusplus
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  //Export CSV
  const Export = ({ onExport }) => (
    <Button
      onClick={(e) => onExport(e.target.value)}
      style={{
        backgroundColor: "#56c4fb",
        color: "black",
        fontSize: "15px",
        marginRight: "10px",
      }}
    >
      Export
    </Button>
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    [filterData]
  );

  return (
    <>
      <div className="DeviceRawData">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Device Raw Data</h1>
          </div>
          <div className="box">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    columnGap: "33px",
                    width: "auto",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <DatePicker
                      label="From Date"
                      inputFormat="MM/DD/YYYY"
                      value={fromDate}
                      onChange={handleChangeForFromDate}
                      renderInput={(params) => <TextField {...params} />}
                    />

                    {errorMessageForFromDate ? (
                      <>
                        <label
                          style={{
                            color: "red",
                            marginTop: "10px",
                          }}
                        >
                          {errorMessageForFromDate}
                        </label>
                      </>
                    ) : null}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <DatePicker
                      label="To Date"
                      inputFormat="MM/DD/YYYY"
                      value={toDate}
                      onChange={handleChangeForToDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {errorMessageForToDate ? (
                      <>
                        <label
                          style={{
                            color: "red",
                            marginTop: "10px",
                          }}
                        >
                          {errorMessageForToDate}
                        </label>
                      </>
                    ) : null}
                  </div>

                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      style={{
                        padding: "0.7rem",
                        backgroundColor: "rgb(0, 43, 54)",
                        color: "khaki",
                        fontWeight: "bold",
                        width: "8rem",
                      }}
                      onClick={handleSubmitForDeviceRawData}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </LocalizationProvider>
            </Box>
          </div>
        </div>

        <div className="table">
          <div className="tablemain">
            <DataTable
              title="Device Raw Data Records"
              //keyField="id"
              theme="solarized"
              columns={columns}
              data={filterData}
              pagination
              fixedHeader
              responsive
              actions={actionsMemo}
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search From Requested Date"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "10rem",
                    padding: "9px",
                    border: "2px solid #4e96b4",
                    borderRadius: "4px",
                    fontSize: "initial",
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceRawData;
