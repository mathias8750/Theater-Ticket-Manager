import {Button, Typography, TextField, AlertTitle, Dialog, Alert, Box} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import React, {useRef, useState, Component, useContext, useEffect} from "react";
import supabase from '../../utils/Supabase.js';
import LoginHeader from "renderer/components/LoginHeader.js";


const EmployeeLogin = ({}) => {

  const [open, setOpen] = useState(false);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  let navigate = useNavigate();

  const toggleAlert = () => {
    setOpen(!open);
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
      toggleAlert();
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

      <Dialog open={open} onClose={toggleAlert}>
        <Alert
        severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          Invalid Username/Password
        </Alert>
      </Dialog>
    </LoginHeader>
  )
}

export default EmployeeLogin;
