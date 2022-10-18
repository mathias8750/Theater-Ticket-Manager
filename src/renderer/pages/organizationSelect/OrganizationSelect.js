import {Button, Typography, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import {Link as NavLink} from "react-router-dom";
import OrganizationList from "../../components/OrganizationList";
import React from "react";


const OrganizationSelect = ({}) => {

  return (
    <>

      <Typography>Organization Select Page</Typography>

      
      <OrganizationList/>

      <NavLink to={"/employee/home"}>
        <Button>
          Employee Home
        </Button>
      </NavLink>
    </>
  )
}

export default OrganizationSelect;
