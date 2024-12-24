import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./TankFillingData.css";
import DataTable, { createTheme } from "react-data-table-component";
import axiosApi from "../../Common/BaseUrl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment/moment";
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

const TankFillingData = () => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [search, setSearch] = useState();

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

  useEffect(() => {
    if (data) {
      const result = data.filter((data) => {
        return data.addNewStockDate.match(search);
      });
      setFilterData(result);
    }
  }, [search]);

  const [pumpId, setPumpId] = useState();

  const handleChangeForTankFilling = (event) => {
    setPumpId(event.target.value);
  };

  const handleSubmitForTankFillingData = async (e) => {
    e.preventDefault();

    const payload = {
      pumpId: pumpId,
    };

    await axiosApi.post("api/getTankFillingData", payload).then((response) => {
      console.log("response :- ", response);
      if (response.status === 200) {
        setData(response.data);
        setFilterData(response.data);
      }
    });
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
      name: "Old Stock(Ltr)",
      selector: (row) => row.oldStockOfPetrolLitre,
      sortable: true,
      button: true,
      width: "150px",
    },
    {
      name: "Add Stock(Ltr)",
      selector: (row) => row.addNewStockOfPetrolLitre,
      width: "300px",
      button: true,
    },
    {
      name: "New Stock(Ltr)",
      selector: (row) => row.newCurrentStockOfPetrolLitre,
      button: true,
      width: "150px",
    },
    {
      name: "Petrol Rate",
      selector: (row) => row.petrolRate,
      button: true,
      width: "150px",
      cell: (row) => `₹ ${row.petrolRate}`
    },
    {
      name: "Add Stock Date",
      selector: (row) => row.addNewStockDate,
      button: true,
      width: "150px",
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      button: true,
      width: "150px",
    },
    {
      name: "Created Date",
      selector: (row) => moment(row.createdOn).format("YYYY MMM DD h:mm A"),
      button: true,
      width: "250px",
    },
  ];

  const TankData = filterData;
  if (TankData) {
    TankData.map((item, index) => {
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
      <div className="TankFillingData">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Tank Filling Data</h1>
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
                onChange={handleChangeForTankFilling}
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
              onClick={handleSubmitForTankFillingData}
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
              data={filterData}
              pagination
              fixedHeader
              responsive
              actions={actionsMemo}
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search From Add Stock Date"
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
export default TankFillingData;
