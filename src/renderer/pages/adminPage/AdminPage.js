import React, { useState, useRef } from 'react';
import LoginHeader from 'renderer/components/LoginHeader';
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button,  Dialog, Alert, AlertTitle } from '@mui/material';
import supabase from 'renderer/utils/Supabase';

const AdminPage = ({}) => {

    const [successAlertOpen, setSuccessAlert] = useState(false);
    const [failureAlertOpen, setFailureAlert] = useState(false);
    const usernameRef = useRef('');
    const passwordRef = useRef('');

    // Toggles the success alert
    const toggleSuccessAlert = () => {
        setSuccessAlert(!successAlertOpen);
      }
    
    // Toggles the failure alert
    const toggleFailureAlert = () => {
        setFailureAlert(!failureAlertOpen);
    }

    // Adds a user to the db if the username is not already taken
    const addUser = async () => {
            if(usernameRef.current.value.trim() != '' && passwordRef.current.value.trim() != '') {
                const {data: Users, error} = await supabase
                .from('Users')
                .insert([{ username: usernameRef.current.value.trim(), password: passwordRef.current.value.trim()}]);

                if (error) {
                    toggleFailureAlert();
                } else {
                    toggleSuccessAlert();
                }
            }
            usernameRef.current.value = '';
            passwordRef.current.value = '';
    }

    return (
    
        <>
            <LoginHeader>
                <Typography>Admin Page</Typography>
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
                    onClick={addUser}
                >
                    Add User
                </Button>

                <Dialog open={failureAlertOpen} onClose={toggleFailureAlert}>
                    <Alert
                        severity="error"
                    >
                        <AlertTitle>Alert</AlertTitle>
                        Username Already in Use
                    </Alert>
                </Dialog>
                <Dialog open={successAlertOpen} onClose={toggleSuccessAlert}>
                    <Alert
                        severity="success"
                    >
                        <AlertTitle>Success</AlertTitle>
                        User Added Successfully
                    </Alert>
                </Dialog>
            </LoginHeader>
        </>
      )

}

export default AdminPage;
