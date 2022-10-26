import React, { useState, useRef, useEffect } from 'react';
import LoginHeader from 'renderer/components/LoginHeader';
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button,  Dialog, Alert, AlertTitle } from '@mui/material';
import supabase from 'renderer/utils/Supabase';
import { useQuery } from "@tanstack/react-query";
import AdminSidebar from 'renderer/components/AdminSidebar';

const AdminPage = ({}) => {

    const [deleteAlert, setDeleteAlert] = useState(false);
    const [userList, setUserList] = useState([]);
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
                fetchUsers();
            }
        }
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    }

    // Remove account from users table and list
    const  removeUserAccount = async(user) => {
        const {delUser, error} = await supabase
            .from("Users")
            .delete()
            .eq('username', user.username);

        if(!error) {
            fetchUsers();
            setDeleteAlert(true);
            return delUser;
        }
    }
  
    // When the user clicks the remove account button, remove the account
    const onUserClick = (user) => {
        removeUserAccount(user);
    }
    
    // Get data from users table to use in the user list (this also refreshes the user list)
    const fetchUsers = async () => {
        const { data: users } = await supabase
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
            <div
            style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            }} >
            <Typography>Add New User</Typography>
            </div>
            <div
            style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5px',
            height: '10%',
            }} >
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
                </div>
                
                <AdminSidebar users={userList} onUserClick={onUserClick} />
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
                </div>
            </LoginHeader>
        </>
    )

}

export default AdminPage;
