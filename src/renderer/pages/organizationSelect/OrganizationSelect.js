import {Button, Typography, TextField, Dialog, DialogTitle} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Link as NavLink, useNavigate} from "react-router-dom";
import React, {useRef, useState, useContext} from "react";
import {OrganizationContext} from "renderer/context/Context";
import {useQuery} from "@tanstack/react-query";
import LoginHeader from "renderer/components/LoginHeader";
import SnackbarAlert from "renderer/components/SnackbarAlert";
import OrganizationScrollableList from "renderer/components/OrganizationScrollableList";
import supabase from "renderer/utils/Supabase";


const OrganizationSelect = ({}) => {

  const {state, update} = useContext(OrganizationContext);
  const [newOrgErrOpen, setNewOpen] = useState(false);
  const [orgAddedOpen, setAddedOpen] = useState(false);
  const [orgAddOpen, setAddOpen] = useState(false);
  const [orgs, setOrgs] = useState([]);
  const newOrgNameRef = useRef('');
  const newOrgEmailRef = useRef('');
  const newOrgObjectRef = useRef('');
  const navigate = useNavigate();

  // Get organizations from the supabase
  const getOrganizations = async () => {
    const {data: organizations} = await supabase.from("Organizations").select("*");
    update({selectedOrg: {organizationID: 0, organizationName: "defaultname", organizationEmail: "defaultemail"}});
    setOrgs(organizations);
    return organizations;
  };
  let {status, data, error} = useQuery(['orgs'], getOrganizations);

  // Display loading screen while loading data from supabase
  if (status === 'loading') {
    return <span>Loading...</span>
  }

  // Display error msg in case of query error
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }


  // If org isn't selected alert the user, if it is navigate to employee home page
  const onSelectButton = (org) => {
    update({selectedOrg: org});
    navigate("/employee/home");
  }

  // Function to control adding organization
  const onAddButton = async () => {

    if ((newOrgNameRef.current.value.trim() != '') && (newOrgEmailRef.current.value.trim() != '')) {

      // Get the current array of orgs from the db, before adding the new org
      const {data: orgs_compare} = await supabase
        .from('Organizations')
        .select('*')

      // Add the new org to the db, supabase will handle uniqueness constraints
      const {data: orgs, error} = await supabase
        .from('Organizations')
        .insert([{
          organizationName: newOrgNameRef.current.value.trim(),
          organizationEmail: newOrgEmailRef.current.value.trim().toLowerCase()
        }]);

      // Check if the org name or email is already in use; if it is display alert
      let orgSelectAlertStatus = false;
      for (let i = 0; i < orgs_compare.length; i++) {
        if ((orgs_compare[i].organizationName == newOrgNameRef.current.value.trim()) || (orgs_compare[i].organizationEmail.toLowerCase() == newOrgEmailRef.current.value.trim().toLowerCase())) {
          orgSelectAlertStatus = true;
        }
      }
      if (orgSelectAlertStatus == true) {
        toggleNewOrgAlert();
      } else {
        toggleOrgAddedAlert();

        // Org added; pass new org to org list to update the list
        let newOrgs = orgs_compare.concat(orgs);
        setOrgs(newOrgs);
        toggleAddOrgDialog();
      }
    }

    // Clear the new org name and new org email text fields
    newOrgNameRef.current.value = "";
    newOrgEmailRef.current.value = "";
  }

  // Function to toggle the new org alert message
  const toggleNewOrgAlert = () => {
    setNewOpen(!newOrgErrOpen);
  }

  // Function to toggle the org added alert message
  const toggleOrgAddedAlert = () => {
    setAddedOpen(!orgAddedOpen);
  }

  // Function to toggle the add org dialog
  const toggleAddOrgDialog = () => {
    setAddOpen(!orgAddOpen);
  }

  return (

      <LoginHeader helpID={3}>
        <div style={{height: '100%'}}>
            
            <div
            style={{
              display: 'flex',
              height: '50%',
              justifyContent: 'center',
            }}>
            <OrganizationScrollableList orgs={orgs} onOrgClick={onSelectButton}/>
            </div>
            <div
            style={{
              paddingTop: '7%',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Button
              color='primary'
              size='small'
              onClick={toggleAddOrgDialog}
              >
                Create New Organization
              </Button>
            </div>
            <Dialog
              open={orgAddOpen}
              onClose={toggleAddOrgDialog}
              style={{
                justifyContent: 'center',
              }}
            >
            <DialogTitle>Create Organization</DialogTitle>
            <div
            style={{
            display: 'flex',
            height: '50%',
            justifyContent: 'center',
          }}>
          <OrganizationScrollableList orgs={orgs} onOrgClick={onSelectButton}/>
        </div>
        <div
          style={{
            paddingTop: '7%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Button
            color='primary'
            size='small'
            onClick={toggleAddOrgDialog}
          >
            Create New Organization
          </Button>
        </div>
        <Dialog
          open={orgAddOpen}
          onClose={toggleAddOrgDialog}
          style={{
            justifyContent: 'center',
          }}
        >
          <DialogTitle>Create Organization</DialogTitle>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '2%',
              paddingBottom: '4%',
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingRight: '2%',
              }}>
              <TextField
                id='newOrgNameTextField'
                label='Organization Name'
                inputRef={newOrgNameRef}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingRight: '2%',
              }}>
              <TextField
                id='newOrgEmailTextField'
                label='Organization Email'
                inputRef={newOrgEmailRef}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingRight: '2%',
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
            </div>
          </div>
        </Dialog>
      </div>
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
