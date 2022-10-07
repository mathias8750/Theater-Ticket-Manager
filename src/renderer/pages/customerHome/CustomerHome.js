import {Button, Typography} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';


const CustomerHome = ({}) => {

  return (
    <>
      <Typography>This is the Customer Home Page</Typography>


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
    </>
  )
}

export default CustomerHome;
