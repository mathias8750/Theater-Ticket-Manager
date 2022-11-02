import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 


const EmployeeHome = ({}) => {

  return (
    <>
      <EmployeeHeader/>
      <Typography
          variant="h3"
          color="primary"
          style={{marginTop: -625}}>
          Employee Home
      </Typography>
      <NavLink to={"/employee/home/events"} style={{textDecoration : 'none'}}>
        <Button variant="text"
              style={{fontSize: 20, justifyContent: 'center', alignItems: 'center'}}>
           Create/Manage Events
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/seasons"} style={{textDecoration : 'none'}}>
        <Button variant="text"
              style={{fontSize: 20, justifyContent: 'center', alignItems: 'center'}}>
           Create/Manage Seasons
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/organizations"} style={{textDecoration : 'none'}}>
        <Button variant="text"
              style={{fontSize: 20, justifyContent: 'center', alignItems: 'center'}}>
           Create/Manage Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
