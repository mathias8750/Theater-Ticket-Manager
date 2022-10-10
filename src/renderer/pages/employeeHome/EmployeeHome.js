import {Typography, Button} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';

const EmployeeHome = ({}) => {

  return (
    <>

      <Typography variant="h1" >
          Employee Home Page
      </Typography>

      <NavLink to={"/employee/home/events"}>
        <Button variant="contained">
          Create/Manage Events
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/seasons"}>
        <Button variant="contained">
          Create/Manage Seasons
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/organizations"}>
        <Button variant="contained">
          Create/Manage Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
