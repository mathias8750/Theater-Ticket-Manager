import {Button, Typography} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";
import TextField from '@mui/material/TextField';


import "./style.css";



const CustomerHome = ({}) => {

  return (
<<<<<<< HEAD
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
      
      <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
=======
    <CustomerHeader>
      <Typography varient="h1" >Customer Home Page</Typography>
>>>>>>> dev

      <NavLink to={"/customer/events"}>
        <Button>
          Customer Events
        </Button>
      </NavLink>
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
      />
      <NavLink to={"/employee/login"}>
        <Button>
          See All Events
        </Button>
      </NavLink>
    </CustomerHeader>
  )
}

export default CustomerHome;
