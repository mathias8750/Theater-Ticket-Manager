import React from "react";
import {Typography, Button, Dialog, DialogTitle, TextField} from "@mui/material";

const AddTicketHolderDialog = ({open, onClose, nameRef, emailRef, phoneRef, onSelectSeatsClick}) => {

    return (
        <Dialog
              open={open}
              onClose={onClose}
              style={{
                justifyContent: 'center',
              }}
            >
            <DialogTitle style={{paddingLeft: '30%'}}>Add Season Ticket Holder</DialogTitle>
            <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '4%',
            }}>
            <TextField
            id='newHolderNameTextField'
            label='Name'
            inputRef={nameRef}
            />
            </div>
            <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '4%',
            }}>
            <TextField
            id='newHolderEmailTextField'
            label='Email'
            inputRef={emailRef}
            />
            </div>
            <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '4%',
            }}>
            <TextField
            id='newHolderPhoneTextField'
            label='Phone #'
            inputRef={phoneRef}
            />
            </div>
            <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '4%',
            }}>
            <Button
            variant='contained'
            type='submit'
            color='primary'
            size='small'
            onClick={onSelectSeatsClick}
            >
              Select Seats
            </Button>
            </div>
        </Dialog>
    )
}

export default AddTicketHolderDialog;