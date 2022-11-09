import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import {OrganizationContext} from "renderer/context/Context";
import {useContext} from "react";


const EmployeeHome = ({}) => {

const {state} = useContext(OrganizationContext);

  return (
    <>
      <EmployeeHeader>
        <Typography
          variant="h3"
          align="center"
          >
          {state.selectedOrg.organizationName} Employee Homepage
        </Typography>
        <div 
          display= "block"
          margin= "auto"
          align="center"
          style={{marginTop: '70px'}}>
          <NavLink to={"/employee/home/events"} style={{textDecoration : 'none'}}>
            <Button variant="text"
                style={{fontSize: 20}}>
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
                style={{fontSize: 20}}>
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
                style={{fontSize: 20}}>
                  Create/Manage Organizations
              </Button>
            </NavLink>
        </div>
        
      </EmployeeHeader>
    </>
  )
}

export default EmployeeHome;
