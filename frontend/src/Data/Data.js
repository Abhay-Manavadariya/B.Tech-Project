// Sidebar imports
import {
  UilEstate,
  UilSignOutAlt,
  UilDatabase,
  UilRupeeSign, 
  UilPlusCircle,
  UilUserSquare,
  UilUsersAlt ,
  UilEnvelopeShare 
} from "@iconscout/react-unicons";

// Recent Card Imports
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Home",
    href:"",
  },
  {
    icon: UilDatabase,
    heading: "Device Raw Data",
    href:"DeviceRawData",
  },
  {
    icon: UilRupeeSign,
    heading: 'Rate Change',
    href:"RateChange",
  },
  {
    icon: UilPlusCircle,
    heading: 'Add',
    href:"Add",
  },
  {
    icon: UilDatabase,
    heading: 'Tank Filling Data',
    href:"TankFillingData",
  },
  {
    icon: UilUserSquare,
    heading: 'Add worker details',
    href:"AddWorkerDetails",
  },
  {
    icon: UilUsersAlt,
    heading: 'Show worker details',
    href:"ShowWorkerDetails",
  },
  {
    icon: UilEnvelopeShare ,
    heading: 'Device Firmware',
    href:"DeviceFirmware",
  },
  {
    icon: UilSignOutAlt,
    heading: 'Logout',
    href:"",
  }
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Fuel sale data",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    value: "FuelSaleData"
  },
  {
    title: "Pump Master Dashboard",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    value: "PumpDetails"
  },
  // {
  //   title: "Expenses",
  //   color: {
  //     backGround:
  //       "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
  //     boxShadow: "0px 10px 20px 0px #F9D59B",
  //   },
  //   barValue: 60,
  //   value: "1,234"
  // },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
