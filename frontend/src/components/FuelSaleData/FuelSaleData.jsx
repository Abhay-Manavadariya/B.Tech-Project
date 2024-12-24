import React, { useEffect,useState } from "react";
import "./FuelSaleData.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DataTable,{ createTheme } from "react-data-table-component";

createTheme('solarized', {
  text: {
    primary: '#d2d2d2',
    secondary: '#afff7e',
  },
  background: {
    default: '#002b36',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

// const columns = [
//   { id: "id", label: "id", minWidth: 100 },
//   { id: "dateTime", label: "Date Time", minWidth: 100 },
//   { id: "nozzle", label: "Nozzle", minWidth: 150 },
//   { id: "filler", label: "Filler", minWidth: 165 },
//   {
//     id: "vehicle",
//     label: "Vehicle",
//     minWidth: 100,
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "ltr",
//     label: "Ltr",
//     minWidth: 100,
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "rate",
//     label: "Rate",
//     minWidth: 150,
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: "amount",
//     label: "Amount",
//     minWidth: 150,
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: "mismatch",
//     label: "Mismatch(Ltr)",
//     minWidth: 180,
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: "createdate",
//     label: "Create Date",
//     minWidth: 150,
//     format: (value) => value.toFixed(2),
//   }
// ];

// function createData(id, Uid, RequestParams, ResponseParams,MsgId,Address,Entrypoint,CreateDate,LastUpdateDate,RequestedDate,CreatedBy,LastUpdatedBy) {
//   return { id, Uid, RequestParams, ResponseParams, MsgId,Address, Entrypoint, CreateDate, LastUpdateDate,RequestedDate,CreatedBy, LastUpdatedBy};
// }

// const rows = [
//   // createData()
// ];

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

const dropDownList = [
  "Oliver Hansen",
  "Van Henry",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FuelSaleData = () => {

  const data = [
    // {
    //   Id: "1",
    //   DateTime: "12-22-2003",
    //   Nozzle: "2",
    //   Filler: "0",
    //   Vehicle: "0",
    //   Ltr: "138.01",
    //   Rate: "80.98",
    //   Amount: "11,176.05",
    //   Mismatch: "0.00",
    //   CreateDate: "2022-03-02 20:43",
    // },
    // {
    //   Id: "2",
    //   DateTime: "12-22-2003",
    //   Nozzle: "2",
    //   Filler: "0",
    //   Vehicle: "0",
    //   Ltr: "138.01",
    //   Rate: "80.98",
    //   Amount: "11,176.05",
    //   Mismatch: "0.00",
    //   CreateDate: "2022-03-02 20:43",
    // },
    // {
    //   Id: "3",
    //   DateTime: "12-22-2003",
    //   Nozzle: "2",
    //   Filler: "0",
    //   Vehicle: "0",
    //   Ltr: "138.01",
    //   Rate: "80.98",
    //   Amount: "11,176.05",
    //   Mismatch: "0.00",
    //   CreateDate: "2022-03-02 20:43",
    // },
  ];

  const columns = [
    {
      name: "Id",
      selector: (row) => row.Id,
      sortable: true,
      width: "80px",
      button:true,
      fontSize:'50px',
    },
    {
      name: "DateTime",
      selector: (row) => row.DateTime,
      sortable: true,
      button:true,
    },
    {
      name: "Nozzle",
      selector: (row) => row.Nozzle,
      button:true,
    },
    {
      name: "Filler",
      selector: (row) => row.Filler,
      button:true,
    },
    {
      name: "Vehicle",
      selector: (row) => row.Vehicle,
      button:true,
    },
    {
      name: "Ltr",
      selector: (row) => row.Ltr,
      button:true,
    },
    {
      name: "Rate",
      selector: (row) => row.Rate,
      button:true,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
      button:true,
    },
    {
      name: "MisMatch",
      selector: (row) => row.Mismatch,
      button:true,
    },
    {
      name: "CreateDate",
      selector: (row) => row.CreateDate,
      sortable: true,
      width: "150px",
      button:true,
    },
  ];

  const [value, setValue] = React.useState(dayjs(""));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState("Abhay");

  const handleChangepersonname = (event) => {
    setPersonName(event.target.value);
  };

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
    []
  );

  
  return (
    <>
      <div className="fuelsaledata">
        <div className="main">
          <div className="title">
            <h1 style={{ margin: "1rem" }}>Fuel Sale Data</h1>
          </div>

          <div className="box">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "23ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date Range-1"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DesktopDatePicker
                  label="Date Range-2"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl sx={{ m: 0, width: 300, mt: 3 }}>
                <InputLabel id="demo-multiple-name-label">
                  Equipment List
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={personName}
                  onChange={handleChangepersonname}
                  input={<OutlinedInput label="Equipment List" />}
                  MenuProps={MenuProps}
                >
                  {dropDownList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="success"
                style={{
                  padding: "0.7rem",
                  backgroundColor: "rgb(0 8 64)",
                  color: "khaki",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </div>

        <div className="table">
          <div className="tablemain">
            <DataTable
              title="Fuel Sale Data Record"
              //keyField="id"
              theme="solarized"
              columns={columns}
              data={data}
              pagination
              fixedHeader
              responsive
              highlightOnHover
              actions={actionsMemo}
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search Here"
                  //value={search}
                  // onChange={
                  //   (e) => setSearch(e.target.value)
                  // }
                  style={{
                    width: "10rem",
                    padding: "9px",
                    border: "2px solid #4e96b4",
                    borderRadius: "4px",
                    fontSize:"initial",
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

export default FuelSaleData;

//   <Paper sx={{ width: "100%" }}>
//   <TableContainer sx={{ maxHeight: 440 }}>
//     <Table stickyHeader aria-label="sticky table" className="scroll">
//       <TableHead>
//         <TableRow>
//           {columns.map((column) => (
//             <TableCell
//               key={column.id}
//               align={column.align}
//               style={{ minWidth: column.minWidth, backgroundColor:"rgb(0 8 64)",color: "lightpink", textAlign:"center"}}
//             >
//               {column.label}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody style={{backgroundColor:"lightgrey"}}>
//         {rows
//           .slice(
//             page * rowsPerPage,
//             page * rowsPerPage + rowsPerPage
//           )
//           .map((row) => {
//             return (
//               <TableRow
//                 hover
//                 role="checkbox"
//                 tabIndex={-1}
//                 key={row.code}

//               >
//                 {columns.map((column) => {
//                   const value = row[column.id];
//                   return (
//                     <TableCell key={column.id} align={column.align} style={{textAlign:"center"}}>
//                       {column.format && typeof value === "number"
//                         ? column.format(value)
//                         : value}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             );
//           })}
//       </TableBody>
//     </Table>
//   </TableContainer>
//   <TablePagination
//     rowsPerPageOptions={[10, 25, 100]}
//     component="div"
//     count={rows.length}
//     rowsPerPage={rowsPerPage}
//     page={page}
//     onPageChange={handleChangePage}
//     onRowsPerPageChange={handleChangeRowsPerPage}
//     style={{backgroundColor:"rgb(0 8 64)",color: "lightpink"}}
//   />
// </Paper>
