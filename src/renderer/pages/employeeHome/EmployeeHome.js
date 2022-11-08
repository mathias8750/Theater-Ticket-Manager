import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 


const EmployeeHome = ({}) => {

  return (
    <>
      <EmployeeHeader>
        <Typography
          variant="h3"
          align="center">
          Employee Home
        </Typography>
        <div 
          display= "block"
          margin= "auto"
          align="center"
          style={{marginTop: '70px'}}>
          <NavLink to={"/employee/home/events"} style={{textDecoration : 'none'}}>
            <Button variant="text"
                style={{fontSize: 30}}>
              Create/Manage Events
          </Button>
          </NavLink>
        </div>
        <div 
          display= "block"
          margin="auto"
          align="center"
          style={{marginTop: '70px'}}>
            <NavLink to={"/employee/home/seasons"} style={{textDecoration : 'none'}}>
              <Button variant="text"
                style={{fontSize: 30}}>
                  Create/Manage Seasons
              </Button>
            </NavLink>
        </div>
        
        <div 
          display= "block"
          margin="auto"
          align="center"
          style={{marginTop: '70px'}}>
            <NavLink to={"/employee/home/organizations"} style={{textDecoration : 'none'}}>
              <Button variant="text" 
                style={{fontSize: 30}}>
                  Create/Manage Organizations
              </Button>
            </NavLink>
        </div>
        
      </EmployeeHeader>
    </>
  )
}

export default EmployeeHome;
