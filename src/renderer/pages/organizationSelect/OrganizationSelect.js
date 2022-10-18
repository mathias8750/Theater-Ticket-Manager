import {Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle, Dialog} from "@mui/material";
import {Link as NavLink, useNavigate, useLocation} from "react-router-dom";
import OrganizationList from "../../components/OrganizationList";
import { OrganizationContext } from "renderer/context/OrganizationContext";
import React, {useRef, useState, useContext} from "react";
import React from "react";
import supabase from "renderer/utils/Supabase";
import { fontFamily } from "@mui/system";


const OrganizationSelect = ({}) => {

  const {state} = useContext(OrganizationContext);
  const [orgErrOpen, setOpen] = useState(false);
  const [newOrgErrOpen, setNewOpen] = useState(false);
  const [orgAddedOpen, setAddedOpen] = useState(false);
  const newOrgNameRef = useRef('');
  const newOrgEmailRef = useRef('');
  let orgName = "";
  const navigate = useNavigate();
  const location = useLocation();

  // If org isn't selected alert the user, if it is navigate to employee home page
  const onSelectButton = () => {
    if(state.selectedOrg.organizationName == "defaultname"){
        toggleOrgSelectAlert();
    } else {
      navigate("/employee/home");
    }
  }

  // Function to control adding organization
  const onAddButton = async () => {
    
    if((newOrgNameRef != '') && (newOrgEmailRef != '')){

      const { data: orgs_compare} = await supabase
        .from('Organizations')
        .select('*')

      const {data: orgs, error} = await supabase
        .from('Organizations')
        .insert([{organizationName: newOrgNameRef.current.value, organizationEmail: newOrgEmailRef.current.value}]);


      let orgSelectAlertStatus = false;
      for(let i = 0; i < orgs_compare.length; i++){
        console.log(' Org name ' + orgs_compare[i].organizationName + ' Org email ' + orgs_compare[i].organizationEmail);
        console.log(' New Org name ' + newOrgNameRef.current.value + ' New Org email ' + newOrgEmailRef.current.value);


        if((orgs_compare[i].organizationName == newOrgNameRef.current.value) || (orgs_compare[i].organizationEmail == newOrgEmailRef.current.value)){
          orgSelectAlertStatus = true;
        }
      }

      if(orgSelectAlertStatus == true){
        toggleNewOrgAlert();
      } else {
        toggleOrgAddedAlert();
        navigate(location.pathname);
      }
    }
    orgName = newOrgNameRef.current.value;
    newOrgNameRef.current.value = "";
    newOrgEmailRef.current.value = "";
  }


  // Function to toggle the org select alert message
  const toggleOrgSelectAlert = () => {
    setOpen(!orgErrOpen);
  }

  // Function to toggle the new org alert message
  const toggleNewOrgAlert = () => {
    setNewOpen(!newOrgErrOpen);
  }

  // Function to toggle the org added alert message
  const toggleOrgAddedAlert = () => {
    setAddedOpen(!orgAddedOpen);
  }

  return (
    <>

      <Typography>Organization Select Page</Typography>

      <OrganizationList/>

      <TextField
      id='newOrgNameTextField'
      label='Organization Name'
      inputRef={newOrgNameRef}
      />

      <TextField
      id='newOrgEmailTextField'
      label='Organization Email'
      inputRef={newOrgEmailRef}
      />

      <Button
      variant='contained'
      type='submit'
      color='primary'
      size='small'
      onClick={onSelectButton}
      >
        Select Organization
      </Button>

      <Button
      variant='contained'
      type='submit'
      color='primary'
      size='small'
      onClick={onAddButton}
      >
        Add Organization
      </Button>

      <Dialog open={orgErrOpen} onClose={toggleOrgSelectAlert}>
        <Alert
        severity="info"
        >
          <AlertTitle>Alert</AlertTitle>
          Please select an organization
        </Alert>
      </Dialog>

      <Dialog open={newOrgErrOpen} onClose={toggleNewOrgAlert}>
        <Alert
        severity="info"
        >
          <AlertTitle>Alert</AlertTitle>
          Oranization Name/Email is already in use
        </Alert>
      </Dialog>

      <Dialog open={orgAddedOpen} onClose={toggleOrgAddedAlert}>
        <Alert
        severity="success"
        >
          <AlertTitle>Organization Added</AlertTitle>
          Successfully Added New Organization
        </Alert>
      </Dialog>
    </>
  )
}

export default OrganizationSelect;
