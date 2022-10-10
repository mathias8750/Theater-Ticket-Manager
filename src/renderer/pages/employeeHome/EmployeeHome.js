import {Typography, Button} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';

const EmployeeHome = ({}) => {

  return (
    <>

      <Typography>This is the Employee Home Page</Typography>

      <NavLink to={""}>
        <Button variant="contained">
          Events
        </Button>
      </NavLink>

      <NavLink to={""}>
        <Button variant="contained">
          Seasons
        </Button>
      </NavLink>

      <NavLink to={""}>
        <Button variant="contained">
          Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
