import {Button, Typography} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";
import TextField from '@mui/material/TextField';


import "./style.css";



const CustomerHome = ({}) => {

  return (
    <CustomerHeader>
      <Typography varient="h1" >Customer Home Page</Typography>

      <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
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
