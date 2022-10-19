import {Button, Typography, TextField, AlertTitle, Dialog, Alert} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import React, {useRef, useState, Component} from "react";
import supabase from '../../utils/Supabase.js';


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

    // Find user record with matching username to the user input
    let {data: Users, error} = await supabase
      .from('Users')
      .select('*')
      .eq('username', usernameRef.current.value);

    // If the array is empty no user with the specified username was found
    // Alert the user due to invalid username
    if(Users.length == 0){
      toggleAlert();
    }

    // Otherwise the username is in the database and the code below will execute
    Users.forEach(function (item, index){

      // If the user input password matches the password from the user record
      // found in the db, navigate to the org select screen
      if(item.password == passwordRef.current.value){
        console.log('Logged in successfully');
        navigate("/employee/login/select");
      } else {
        // Invalid password, alert the user
        toggleAlert();
      }
    });

  }


  return (
    <>
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
    </>
  )
}

export default EmployeeLogin;
