import React, {useState, useRef} from 'react';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import {useQuery} from "@tanstack/react-query";
import LoginHeader from "../../components/LoginHeader";
import AdminSidebar from "../../components/AdminSidebar";
import SnackbarAlert from "../../components/SnackbarAlert";
import supabase from "../../utils/Supabase";

const AdminPage = ({}) => {

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlert] = useState(false);
  const [successAlertOpen, setSuccessAlert] = useState(false);
  const [failureAlertOpen, setFailureAlert] = useState(false);
  const [userAddOpen, setUserAddOpen] = useState(false);
  const [passwordFailureOpen, setPasswordFailureOpen] = useState(false);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');

  // Toggles the success alert
  const toggleSuccessAlert = () => {
    setSuccessAlert(!successAlertOpen);
  }

  // Toggles the failure alert
  const toggleFailureAlert = () => {
    setFailureAlert(!failureAlertOpen);
  }

  // Toggles password mismatch error alert
  const togglePasswordFailureAlert = () => {
    setPasswordFailureOpen(!passwordFailureOpen);
  }

  // Toggles the delete alert
  const toggleDeleteAlert = () => {
    setDeleteAlert(!deleteAlertOpen);
  }

  // Toggles the add user dialog
  const toggleAddUserDialog = () => {
    setUserAddOpen(!userAddOpen);
  }

  // Adds a user to the db if the username is not already taken
  const addUser = async () => {
    if (usernameRef.current.value.trim() != '' && passwordRef.current.value.trim() != '') {
      if (passwordRef.current.value.trim() === passwordConfirmRef.current.value.trim()) {
        const {data: Users, error} = await supabase
          .from('Users')
          .insert([{username: usernameRef.current.value.trim(), password: passwordRef.current.value.trim()}]);

        if (error) {
          toggleFailureAlert();
        } else {
          usernameRef.current.value = '';
          passwordRef.current.value = '';
          passwordConfirmRef.current.value = '';
          toggleAddUserDialog();
          toggleSuccessAlert();
          fetchUsers();
        }
      } else {
        togglePasswordFailureAlert();
      }
    }
  }

  // Remove account from users table and list
  const removeUserAccount = async (user) => {
    const {delUser, error} = await supabase
      .from("Users")
      .delete()
      .eq('username', user.username);

    if (!error) {
      fetchUsers();
      setDeleteAlert(true);
      return delUser;
    }
  }

  // When the user clicks the remove account button, remove the account
  const onUserClick = (user) => {
    removeUserAccount(user);
  }

  // Confirmation dialog for user deletion
  const openConfirmationDialog = (user) => {
    setSelectedUser(user);
    setConfirmationOpen(!confirmationOpen);
  }

  // User confirmed; delete user account
  const handleConfirm = (event) => {
    removeUserAccount(selectedUser);
    setConfirmationOpen(!confirmationOpen);
  }

  // User cancelled; close dialog and do nothing
  const handleCancel = (event) => {
    setConfirmationOpen(!confirmationOpen);
  }

  // Get data from users table to use in the user list (this also refreshes the user list)
  const fetchUsers = async () => {
    const {data: users} = await supabase
      .from('Users')
      .select('username')
      .neq('username', 'admin');

    setUserList(users);
    return users;
  }

  let {status, data, error} = useQuery(['users'], fetchUsers)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (

    <>
      <LoginHeader>
        <div style={{height: '100%'}}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="h6" align="center" style={{padding: '2%'}}>Employee Accounts</Typography>
          </div>
          <div style={{display: 'flex', height: '50%', justifyContent: 'center'}}>
            <AdminSidebar users={userList} onUserClick={openConfirmationDialog}/>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', paddingTop: '1%'}}>
            <Button color='primary' size='small' onClick={toggleAddUserDialog}>Add Employee Account</Button>
          </div>
          <Dialog open={userAddOpen} onClose={toggleAddUserDialog} style={{justifyContent: 'center'}}>
            <DialogTitle>Create Employee Account</DialogTitle>
            <div style={{display: 'flex', justifyContent: 'center', paddingRight: '2%', paddingBottom: '4%'}}>
              <TextField id='usernameTextField' label='Username' inputRef={usernameRef}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingRight: '2%', paddingBottom: '4%'}}>
              <TextField id='passwordTextField' label='Password' type='password' inputRef={passwordRef}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingRight: '2%', paddingBottom: '6%'}}>
              <TextField id='passwordConfirmTextField' label='Confirm Password' type='password'
                         inputRef={passwordConfirmRef}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingRight: '2%', paddingBottom: '6%'}}>
              <Button variant='contained' color='primary' size='small' onClick={addUser}>Create Account</Button>
            </div>
          </Dialog>


          <SnackbarAlert
            alertOpen={failureAlertOpen}
            toggleAlert={toggleFailureAlert}
            alertSeverity={'error'}
            alertText={'Username already in use'}
          />

          <SnackbarAlert
            alertOpen={successAlertOpen}
            toggleAlert={toggleSuccessAlert}
            alertSeverity={'success'}
            alertText={'User Added Successfully'}
          />

          <SnackbarAlert
            alertOpen={deleteAlertOpen}
            toggleAlert={toggleDeleteAlert}
            alertSeverity={'success'}
            alertText={'User Deleted Successfully'}
          />

          <SnackbarAlert
            alertOpen={passwordFailureOpen}
            toggleAlert={togglePasswordFailureAlert}
            alertSeverity={'error'}
            alertText={'Passwords do not match'}
          />

          <Dialog
            open={confirmationOpen}
          >
            <DialogTitle>Delete User?</DialogTitle>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </LoginHeader>
    </>
  )

}

export default AdminPage;
