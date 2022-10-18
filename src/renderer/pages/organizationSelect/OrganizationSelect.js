import {Button, Typography, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle, Dialog} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import OrganizationList from "../../components/OrganizationList";
import { OrganizationContext } from "renderer/context/OrganizationContext";
import React, {useRef, useState, useContext} from "react";
import React from "react";


const OrganizationSelect = ({}) => {

  const {state} = useContext(OrganizationContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // If org isn't selected alert the user, if it is navigate to employee home page
  const onButton = () => {
    if(state.selectedOrg.organizationID == 0){
        toggleAlert();
    } else {
      navigate("/employee/home");
    }
  }

  // Function to toggle the alert message
  const toggleAlert = () => {
    setOpen(!open);
  }

  return (
    <>

      <Typography>Organization Select Page</Typography>

      <OrganizationList/>

      <Button
      variant='contained'
      color='primary'
      size='small'
      onClick={onButton}
      >
        Select Organization
      </Button>

      <Dialog open={open} onClose={toggleAlert}>
        <Alert
        severity="info"
        >
          <AlertTitle>Alert</AlertTitle>
          Please select an organization
          </Alert>
      </Dialog>
    </>
  )
}

export default OrganizationSelect;
