import React from "react";
import {Typography, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {matchIsValidTel, MuiTelInput} from "mui-tel-input";
import isEmail from "validator/es/lib/isEmail";

const EditTicketHolderDialog = ({open, onClose, name, setName, email, setEmail, phone, setPhone, onUpdateTicketHolderClick}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{
        justifyContent: 'center',
      }}
    >
      <DialogTitle style={{paddingLeft: '6.5%'}}>Edit Season Ticket Holder</DialogTitle>
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
          onClick={onUpdateTicketHolderClick}
        >
          Save
        </Button>
      </div>
    </Dialog>
  )
}

export default EditTicketHolderDialog;
