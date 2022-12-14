// import libraries
import {Typography, Button, TextField, Dialog, DialogActions, DialogTitle, DialogContentText} from "@mui/material";
import {useContext, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";
import {OrganizationContext} from "../../context/Context";
import SnackbarAlert from "../../components/SnackbarAlert";
import supabase from "../../utils/Supabase";
import isEmail from "validator/es/lib/isEmail";

// Employee Organization
const EmployeeOrganizations = ({}) => {

  // Define constants
  const {state, update} = useContext(OrganizationContext);
  const [currentOrganization, setCurrentOrganization] = useState(state.selectedOrg);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateSuccessOpen, setUpdateSuccess] = useState(false);
  const [updateErrorOpen, setUpdateError] = useState(false);
  const orgNameRef = useRef("");
  const [orgEmail, setOrgEmail] = useState(currentOrganization.organizationEmail)
  const orgMinPriceRef = useRef("");
  const orgMaxPriceRef = useRef("");
  const orgSeasonTicketPriceRef = useRef("");
  let navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  // Toggle confirmation message
  const toggleConfirmationDialog = () => {
    setConfirmationOpen(!confirmationOpen);
  }

  // Toggle deletion message
  const toggleDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(!deleteConfirmationOpen);
  }

  // Toggle update message
  const toggleUpdateSuccess = () => {
    setUpdateSuccess(!updateSuccessOpen);
  }

  // Toggle error message
  const toggleUpdateError = () => {
    setUpdateError(!updateErrorOpen);
  }

  // Update the selection organization
  const updateOrg = async (oldOrgName) => {
    // Checks if data is valid
    if ((orgNameRef.current.value.trim() != '') && (isEmail(orgEmail)) && (orgMinPriceRef.current.value.trim() != '') && (orgMaxPriceRef.current.value.trim() != '') && (orgSeasonTicketPriceRef.current.value.trim() != '') && (parseFloat(orgSeasonTicketPriceRef.current.value.trim()) >= 0) && (parseFloat(orgMinPriceRef.current.value.trim()) >= 0) && (parseFloat(orgMaxPriceRef.current.value.trim()) > parseFloat(orgMinPriceRef.current.value.trim()))) {
      // Access supabase
      const {data, error} = await supabase
        .from('Organizations')
        .update({
          organizationName: orgNameRef.current.value.trim(),
          organizationEmail: orgEmail,
          organizationMinPrice: parseFloat(orgMinPriceRef.current.value.trim()),
          organizationMaxPrice: parseFloat(orgMaxPriceRef.current.value.trim()),
          organizationSeasonTicketPrice: parseFloat(orgSeasonTicketPriceRef.current.value.trim())
        })
        .eq('organizationName', oldOrgName.trim());
      
      // Check for error
      if (error) {
        toggleUpdateError();
        return;
      }

      // Update organization
      update({selectedOrg: data[0]});
      setCurrentOrganization(data[0]);
      toggleUpdateSuccess();
    } else {
      toggleUpdateError();
    }
  }

  // Delete organization from supabase
  const deleteOrg = async () => {
    const {data, error} = await supabase
      .from('Organizations')
      .delete()
      .eq('organizationID', currentOrganization.organizationID);
  }

  // Confirm changes
  const handleConfirm = () => {
    let oldOrgName = currentOrganization.organizationName;
    updateOrg(oldOrgName);
    toggleConfirmationDialog();
  }

  // Cancel changes
  const handleCancel = () => {
    toggleConfirmationDialog();
  }

  // Delete organization and logout
  const handleDeleteConfirm = () => {
    deleteOrg().then(navigate("/employee/login"));
    toggleDeleteConfirmationDialog();
  }

  // Cancel deletion
  const handleDeleteCancel = () => {
    toggleDeleteConfirmationDialog();
  }

  const onUpdateClick = () => {
    toggleConfirmationDialog();
  }

  const onDeleteClick = () => {
    toggleDeleteConfirmationDialog();
  }

  // Page contents
  return (
    <>
      <EmployeeHeader helpID={7}>
        <div style={{height: '100%'}}>
          <Typography variant="h6" align="center" style={{paddingTop: '5%', paddingBottom: '1%'}}>Organization
            Settings</Typography>
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
              value={orgEmail}
              onChange={(event) => setOrgEmail(event.target.value)}
              error={!isEmail(orgEmail)}
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
            <TextField
              id='orgSeasonTicketPriceTextField'
              label='Season Ticket Price'
              type='number'
              defaultValue={currentOrganization.organizationSeasonTicketPrice}
              inputRef={orgSeasonTicketPriceRef}
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
