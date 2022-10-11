import {Typography, Button} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';

const EmployeeHome = ({}) => {

  return (
    <>

      <Typography variant="h3" >
          Employee Home
      </Typography>

      <NavLink to={"/employee/home/events"}>
        <Button variant="text">
          Create/Manage Events
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/seasons"}>
        <Button variant="text">
          Create/Manage Seasons
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/organizations"}>
        <Button variant="text">
          Create/Manage Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
