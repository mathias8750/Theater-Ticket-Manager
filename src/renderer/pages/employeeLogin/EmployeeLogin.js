import {Button, Typography, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import supabase from '../../utils/Supabase.js';
import LoginHeader from "../../components/LoginHeader";
import SnackbarAlert from "../../components/SnackbarAlert";

// Employee Login page
const EmployeeLogin = ({}) => {

  // Variables for alert opens, user input, and navigation
  const [failureAlertOpen, setFailureAlert] = useState(false);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [selectedUser, setSelectedUser] = useState(null)
  let navigate = useNavigate();

  // Toggle alert for login failure
  const toggleFailureAlert = () => {
    setFailureAlert(!failureAlertOpen)
  }

  // Function to login as employee and access the org select screen
  async function login() {

    // Find user record with matching username and password to the user input
    let {data: Users, error} = await supabase
      .from('Users')
      .select('*')
      .eq('username', usernameRef.current.value.trim())
      .eq('password', passwordRef.current.value.trim());

    // If the username and password are valid, navigate to the employee login screen
    if (Users.length == 0) {
      // Invalid login info, alert the user
      toggleFailureAlert();
    } else {
      if (usernameRef.current.value.trim() == 'admin') {
        navigate('/employee/login/admin');
      } else {
        navigate('/employee/login/select');
      }
    }
  }

  // display components
  return (

    <LoginHeader helpID={2}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h6" align="center" style={{padding: '2%'}}>Employee Login</Typography>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '1%'}}>
        <TextField
          id='usernameTextField'
          label='Username'
          inputRef={usernameRef}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '1%'}}>
        <TextField
          id='passwordTextField'
          label='Password'
          type='password'
          inputRef={passwordRef}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <Button
          color='primary'
          size='small'
          onClick={() => login()}
        >
          Login
        </Button>
      </div>
      <SnackbarAlert
        alertOpen={failureAlertOpen}
        toggleAlert={toggleFailureAlert}
        alertSeverity={'error'}
        alertText={'Invalid Username/Password'}
      />
    </LoginHeader>
  )
}

export default EmployeeLogin;
