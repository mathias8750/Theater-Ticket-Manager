import {Button, Typography} from "@mui/material";
import {Link as NavLink} from "react-router-dom";


const OrganizationSelect = ({}) => {

  return (
    <>

      <Typography>This is the Organization Select Page</Typography>


      <NavLink to={"/employee/home"}>
        <Button>
          Employee Home
        </Button>
      </NavLink>
    </>
  )
}

export default OrganizationSelect;
