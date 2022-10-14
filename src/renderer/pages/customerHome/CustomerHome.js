import {Button, Typography} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";
import TextField from '@mui/material/TextField';


import "./style.css";



const CustomerHome = ({}) => {

  return (
    <>
      <AppBar className="topbar"  >
        <Toolbar>
          <Typography variant="h6" className="title"  >Theater Ticket Manager</Typography>
          <Typography variant="subtitle1" className="title" >Home</Typography>
          <NavLink to={"/employee/login"}>
            <Button className="button">
              Employee Login
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    <CustomerHeader>
      <Typography varient="h1" >Customer Home Page</Typography>
      <NavLink to={"/customer/events"}>
        <Button>
          See All Events
        </Button>
      </NavLink>
      <NavLink to={"/employee/login"}>
        <Button className="button">
          Employee Login
        </Button>
      </NavLink>
    </CustomerHeader>
  )
}

export default CustomerHome;
