import {Button, Typography, TextField, AlertTitle, Dialog, Alert, Box} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import React, {useRef, useState, Component, useContext, useEffect} from "react";
import supabase from '../../utils/Supabase.js';
import LoginHeader from "renderer/components/LoginHeader.js";
import SnackbarAlert from "renderer/components/SnackbarAlert.js";
import { UserContext } from "renderer/context/Context";


const EmployeeLogin = ({}) => {

  const [failureAlertOpen, setFailureAlert] = useState(false);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [selectedUser, setSelectedUser] = useState(null)
  let navigate = useNavigate();

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
    if(Users.length == 0) {
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


  return (
    
    <LoginHeader>

      <Typography>Employee Login</Typography>

      <TextField
      id='usernameTextField'
      label='Username'
      inputRef={usernameRef}
      />

      <TextField
      id='passwordTextField'
      label='Password'
      type='password'
      inputRef={passwordRef}
      />

      <Button
      variant='contained'
      color='primary'
      size='small'
      onClick={() => login()}
      >
        Login
      </Button>

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
