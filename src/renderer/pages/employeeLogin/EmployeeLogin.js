import {Button, Typography, TextField} from "@mui/material";
import {Link as NavLink, useNavigate} from "react-router-dom";
import React, {useRef, Component} from "react";
import supabase from '../../Supabase.js';


const EmployeeLogin = ({}) => {

  const usernameRef = useRef('');
  const passwordRef = useRef('');
  let navigate = useNavigate();

  // Function to login as employee and access the org select screen
  async function login() {

    // Find user record with matching username to the user input
    let {data: Users, error} = await supabase
      .from('Users')
      .select('*')
      .eq('username', usernameRef.current.value);

    // If the array is empty, no user with the specified username was found  
    if(Users.length == 0){
      console.log('Username not recognized');
    }  
    
    // Otherwise the username is in the database and the code below will execute
    Users.forEach(function (item, index){

      // If the user input password matches the password from the user record
      // found in the db, navigate to the org select screen
      if(item.password == passwordRef.current.value){
        console.log('Logged in successfully');
        navigate("/employee/login/select");
      } else {
        console.log('Incorrect password');
      }
    });

  }


  return (
    <>
      <Typography>This is the Employee Login Page</Typography>

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

    </>
  )
}

export default EmployeeLogin;
