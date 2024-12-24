import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import Updates from "./components/Updates/Updates";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login/login";
import DeviceRawData from "./components/DeviceRawData/DeviceRawData";
import FuelSaleData from "./components/FuelSaleData/FuelSaleData";
import RateChange from "./components/RateChange/RateChange";
import PumpDetails from "./components/PumpDetails/PumpDetails";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Add from "./components/Add/Add";
import TankFillingData from "./components/TankFillingData/TankFillingData";
import AddWorkerDetails from "./components/AddWorkerDetails/AddWorkerDetails";
import ShowWorkerDetails from "./components/ShowWorkerDetails/ShowWorkerDetails";
import DeviceFirmware from "./components/DeviceFirmware/DeviceFirmware";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <MainDash />
              </>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route
            path="DeviceRawData"
            element={
              <>
                <Sidebar />
                <DeviceRawData />
              </>
            }
          />
          <Route
            path="FuelSaleData"
            element={
              <>
                <Sidebar />
                <FuelSaleData />
              </>
            }
          />
          <Route
            path="RateChange"
            element={
              <>
                <Sidebar />
                <RateChange />
              </>
            }
          />
          <Route
            path="PumpDetails"
            element={
              <>
                <Sidebar />
                <PumpDetails />
              </>
            }
          />
          <Route
            path="Add"
            element={
              <>
                <Sidebar />
                <Add />
              </>
            }
          />
          <Route
            path="TankFillingData"
            element={
              <>
                <Sidebar />
                <TankFillingData />
              </>
            }
          />
          <Route
            path="AddWorkerDetails"
            element={
              <>
                <Sidebar />
                <AddWorkerDetails />
              </>
            }
          />
          <Route
            path="ShowWorkerDetails"
            element={
              <>
                <Sidebar />
                <ShowWorkerDetails />
              </>
            }
          />
          <Route
            path="DeviceFirmware"
            element={
              <>
                <Sidebar />
                <DeviceFirmware />
              </>
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default App;
