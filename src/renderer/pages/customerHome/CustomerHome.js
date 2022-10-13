import {Button, Typography} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";


const CustomerHome = ({}) => {

  return (
    <CustomerHeader>
      <Typography varient="h1" >Customer Home Page</Typography>

      <NavLink to={"/customer/events"}>
        <Button>
          Customer Events
        </Button>
      </NavLink>
      <NavLink to={"/employee/login"}>
        <Button>
          Employee Login
        </Button>
      </NavLink>
    </CustomerHeader>
  )
}

export default CustomerHome;
