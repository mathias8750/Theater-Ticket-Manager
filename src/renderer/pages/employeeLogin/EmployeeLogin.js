import {Button, Typography} from "@mui/material";
import {Link as NavLink} from "react-router-dom";


const EmployeeLogin = ({}) => {

  return (
    <>
      <Typography>This is the Employee Login Page</Typography>


      <NavLink to={"/employee/login/select"}>
        <Button>
          Organization Select
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeLogin;
