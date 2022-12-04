import {Typography, Button} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";
import {OrganizationContext} from "renderer/context/Context";
import {useContext} from "react";
// List of imported libraries and components above

// Page for the employee once the user has logged in and selected an organization

const EmployeeHome = ({}) => {

  // Uses a react context so the selected organization details can be used here
  const {state} = useContext(OrganizationContext);

  return (
    // Outputs the three buttons that can be interfaced to navigate to their 
    // respective management pages; also signals the help backdrop of 
    // what page this is
    <>
      <EmployeeHeader helpID={4}>
        <Typography
          variant="h3"
          align="center"
        >
          {state.selectedOrg.organizationName} Employee Homepage
        </Typography>
        <div
          display="block"
          margin="auto"
          align="center"
          style={{marginTop: '70px'}}>
          <NavLink to={"/employee/home/events"} style={{textDecoration: 'none'}}>
            <Button variant="text"
                    style={{fontSize: 20}}>
              Create/Manage Events
            </Button>
          </NavLink>
        </div>
        <div
          display="block"
          margin="auto"
          align="center"
          style={{marginTop: '70px'}}>
          <NavLink to={"/employee/home/seasons"} style={{textDecoration: 'none'}}>
            <Button variant="text"
                    style={{fontSize: 20}}>
              Create/Manage Org Seasons
            </Button>
          </NavLink>
        </div>

        <div
          display="block"
          margin="auto"
          align="center"
          style={{marginTop: '70px'}}>
          <NavLink to={"/employee/home/organizations"} style={{textDecoration: 'none'}}>
            <Button variant="text"
                    style={{fontSize: 20}}>
              Organization Settings
            </Button>
          </NavLink>
        </div>

      </EmployeeHeader>
    </>
  )
}

// Export EmployeeHome function to output to screen
export default EmployeeHome;
