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
              style={{fontSize: 20, marginLeft: 0, marginRight: 0, marginTop: -40}}>
           Create/Manage Events
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/seasons"} style={{textDecoration : 'none'}}>
        <Button variant="text"
              style={{fontSize: 20, marginLeft: -285, marginRight: 0, marginTop: 100}}>
           Create/Manage Seasons
        </Button>
      </NavLink>

      <NavLink to={"/employee/home/organizations"} style={{textDecoration : 'none'}}>
        <Button variant="text"
              style={{fontSize: 20, marginLeft: -303, marginRight: 0, marginTop: 240}}>
           Create/Manage Organizations
        </Button>
      </NavLink>
    </>
  )
}

export default EmployeeHome;
