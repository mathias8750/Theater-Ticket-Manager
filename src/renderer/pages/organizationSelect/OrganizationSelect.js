import {Button, Box, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle, Dialog} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import OrganizationList from "../../components/OrganizationList";
import LoginHeader from "renderer/components/LoginHeader";
import { OrganizationContext } from "renderer/context/Context";
import React, {useRef, useState, useContext} from "react";
import supabase from "renderer/utils/Supabase";
import { fontFamily } from "@mui/system";
import SnackbarAlert from "renderer/components/SnackbarAlert";

const OrganizationSelect = ({}) => {

  const {state} = useContext(OrganizationContext);
  const [orgErrOpen, setOpen] = useState(false);
  const [newOrgErrOpen, setNewOpen] = useState(false);
  const [orgAddedOpen, setAddedOpen] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const newOrgNameRef = useRef('');
  const newOrgEmailRef = useRef('');
  const newOrgObjectRef = useRef('');
  const navigate = useNavigate();


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
    
    if((newOrgNameRef.current.value.trim() != '') && (newOrgEmailRef.current.value.trim() != '')){

      // Get the current array of orgs from the db, before adding the new org
      const { data: orgs_compare} = await supabase
        .from('Organizations')
        .select('*')

      // Add the new org to the db, supabase will handle uniqueness constraints
      const {data: orgs, error} = await supabase
        .from('Organizations')
        .insert([{organizationName: newOrgNameRef.current.value.trim(), organizationEmail: newOrgEmailRef.current.value.trim().toLowerCase()}]);
      
      // Check if the org name or email is already in use; if it is display alert
      let orgSelectAlertStatus = false;
      for(let i = 0; i < orgs_compare.length; i++){
        if((orgs_compare[i].organizationName == newOrgNameRef.current.value.trim()) || (orgs_compare[i].organizationEmail.toLowerCase() == newOrgEmailRef.current.value.trim().toLowerCase())){
          orgSelectAlertStatus = true;
        }
      }
      if(orgSelectAlertStatus == true){
        toggleNewOrgAlert();
      } else {
        toggleOrgAddedAlert();

        // Org added; pass new org to org list to update the list
        setOrgs({...orgs});
      }
    }

    // Clear the new org name and new org email text fields
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
      
      <LoginHeader>
        <div style={{height: '100%'}}>
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={onSelectButton}
          >
          Select Organization
          </Button>
          <OrganizationList newOrgs={orgs}/>
        </div>
      
        <div style={{
        display: 'flex',
        alignItems: 'center',
       
      }}>  

          <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={onAddButton}
          >
            Add Organization
          </Button>
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

          
        </div>
        </div>

        <SnackbarAlert 
        alertOpen={orgErrOpen} 
        toggleAlert={toggleOrgSelectAlert}
        alertSeverity={'info'}
        alertText={'Please select an organization'}
        />

        <SnackbarAlert 
        alertOpen={newOrgErrOpen} 
        toggleAlert={toggleNewOrgAlert}
        alertSeverity={'error'}
        alertText={'Organization Name/Email already in use'}
        />

        <SnackbarAlert 
        alertOpen={orgAddedOpen} 
        toggleAlert={toggleOrgAddedAlert}
        alertSeverity={'success'}
        alertText={'Successfully Added New Organization'}
        />
    </LoginHeader>

  )
}

export default OrganizationSelect;
