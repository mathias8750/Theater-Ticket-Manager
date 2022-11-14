import {Typography, Button, TextField, Dialog, DialogActions, DialogTitle, DialogContentText} from "@mui/material";
import { useContext, useState, useRef } from "react";
import {Link as NavLink, useNavigate} from "react-router-dom";
import { OrganizationContext } from "renderer/context/Context";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "renderer/utils/Supabase";
import SnackbarAlert from "renderer/components/SnackbarAlert";

import { generateTickets } from "../employeeEvents/utils/TicketGenerator";

const EmployeeOrganizations = ({}) => {

  const {state, update} = useContext(OrganizationContext);
  const [currentOrganization, setCurrentOrganization] = useState(state.selectedOrg);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateSuccessOpen, setUpdateSuccess] = useState(false);
  const [updateErrorOpen, setUpdateError] = useState(false);
  const orgNameRef = useRef("");
  const orgEmailRef = useRef("");
  const orgMinPriceRef = useRef("");
  const orgMaxPriceRef = useRef("");
  let navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!confirmationOpen);
  }

  const toggleDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(!deleteConfirmationOpen);
  }

  const toggleUpdateSuccess = () => {
    setUpdateSuccess(!updateSuccessOpen);
  }

  const toggleUpdateError = () => {
    setUpdateError(!updateErrorOpen);
  }


  const updateOrg = async (oldOrgName) => {
    if((orgNameRef.current.value.trim() != '') && (orgEmailRef.current.value.trim() != '') && (orgMinPriceRef.current.value.trim() != '') && (orgMaxPriceRef.current.value.trim() != '') && (parseFloat(orgMinPriceRef.current.value.trim()) >= 0) && (parseFloat(orgMaxPriceRef.current.value.trim()) > parseFloat(orgMinPriceRef.current.value.trim()))) {
      const { data, error } = await supabase
        .from('Organizations')
        .update({ organizationName: orgNameRef.current.value.trim(), organizationEmail: orgEmailRef.current.value.trim(), organizationMinPrice: parseFloat(orgMinPriceRef.current.value.trim()), organizationMaxPrice: parseFloat(orgMaxPriceRef.current.value.trim()) })
        .eq('organizationName', oldOrgName.trim());

      if(error) {
        toggleUpdateError();
        return;
      }
      
      update({selectedOrg: data[0]});
      setCurrentOrganization(data[0]);
      toggleUpdateSuccess();
    } else {
      toggleUpdateError();
    }
  }

  const deleteOrg = async () => {
    const {data, error} = await supabase
      .from('Organizations')
      .delete()
      .eq('organizationID', currentOrganization.organizationID);
  }

  const handleConfirm = () => {
    let oldOrgName = currentOrganization.organizationName;
    updateOrg(oldOrgName);
    toggleConfirmationDialog();
  }

  const handleCancel = () => {
    toggleConfirmationDialog();
  }

  const handleDeleteConfirm = () => {
    deleteOrg().then(navigate("/employee/login"));
    toggleDeleteConfirmationDialog();
  }

  const handleDeleteCancel = () => {
    toggleDeleteConfirmationDialog();
  }

  const onUpdateClick = () => {
    toggleConfirmationDialog();
  }

  const onDeleteClick = () => {
    toggleDeleteConfirmationDialog();
  }

    return (
    <>
      <EmployeeHeader>
        <div style={{height: '100%'}}>
        <Typography variant="h6" align="center" style={{paddingTop: '5%', paddingBottom: '1%'}}>Organization Settings</Typography>
        <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
        }}>
        <TextField
            id='orgNameTextField'
            
            label='Name'
            defaultValue={currentOrganization.organizationName}
            inputRef={orgNameRef}
         />
         </div>
         <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
         }}>
         <TextField
            id='orgEmailTextField'
            label='Email'
            type='email'
            defaultValue={currentOrganization.organizationEmail}
            inputRef={orgEmailRef}
         />
         </div>
         <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
         }}>
         <TextField
            id='orgMinPriceTextField'
            label='Minimum Ticket Price'
            type='number'
            defaultValue={currentOrganization.organizationMinPrice}
            inputRef={orgMinPriceRef}
         />
         </div>
         <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
         }}>
         <TextField
            id='orgMaxPriceTextField'
            label='Maximum Ticket Price'
            type='number'
            defaultValue={currentOrganization.organizationMaxPrice}
            inputRef={orgMaxPriceRef}
         />
         </div>
         <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
         }}>
         <Button
            onClick={onUpdateClick}
         > Update Settings </Button>
         </div>
         <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
         }}>
         <Button
            onClick={onDeleteClick}
            style={{
              color: '#FF0000'
            }}
          > Delete Organization </Button>
         </div>
         <SnackbarAlert 
            alertOpen={updateSuccessOpen} 
            toggleAlert={toggleUpdateSuccess}
            alertSeverity={'success'}
            alertText={'Field(s) updated'}
          />
         <SnackbarAlert 
            alertOpen={updateErrorOpen} 
            toggleAlert={toggleUpdateError}
            alertSeverity={'error'}
            alertText={'Failed to update settings'}
          />
          <Dialog
            open={confirmationOpen}
          >
            <DialogTitle>Update Settings?</DialogTitle>
              <DialogActions>
                  <Button autoFocus onClick={handleCancel}>
                      Cancel
                  </Button>
                  <Button onClick={handleConfirm}>
                      Confirm
                  </Button>
              </DialogActions>
          </Dialog>
          <Dialog
            open={deleteConfirmationOpen}
          >
            <DialogTitle>Delete Organization?</DialogTitle>
            <DialogContentText> This will log you out</DialogContentText>
              <DialogActions>
                  <Button autoFocus onClick={handleDeleteCancel}>
                      Cancel
                  </Button>
                  <Button onClick={handleDeleteConfirm}>
                      Confirm
                  </Button>
              </DialogActions>
          </Dialog>
          </div>
      </EmployeeHeader>
    </>
  )
}

export default EmployeeOrganizations;