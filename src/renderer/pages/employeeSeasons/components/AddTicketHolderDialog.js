import React from "react";
import {Typography, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {matchIsValidTel, MuiTelInput} from "mui-tel-input";
import isEmail from "validator/es/lib/isEmail";

// component for dialog to add season ticket holder
const AddTicketHolderDialog = ({open, onClose, name, setName, email, setEmail, phone, setPhone, onSelectSeatsClick}) => {

  // return components to be displayed
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
          fullWidth
          id='newHolderNameTextField'
          label='Name'
          value={name}
          onChange={(event => setName(event.target.value))}
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
          fullWidth
          id='newHolderEmailTextField'
          label='Email'
          value={email}
          onChange={(event => setEmail(event.target.value))}
          error={!isEmail(email)}
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
        <MuiTelInput
          fullWidth
          value={phone}
          onChange={(newPhone => setPhone(newPhone))}
          error={!matchIsValidTel(phone)}
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
