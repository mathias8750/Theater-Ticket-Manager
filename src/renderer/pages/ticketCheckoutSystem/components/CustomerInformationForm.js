import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useContext} from "react";
import {CheckoutContext} from "../TicketCheckout";
import {matchIsValidTel, MuiTelInput} from "mui-tel-input";

export default function CustomerInformationForm() {

  const {customerName, setCustomerName, customerEmail, setCustomerEmail, customerPhone, setCustomerPhone} = useContext(CheckoutContext)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            value={customerName}
            onChange={(event) => {
              setCustomerName(event.target.value)
            }}
            error={customerName === ''}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={customerEmail}
            onChange={(event) => {
              setCustomerEmail(event.target.value)
            }}
            error={customerEmail === ''}
            fullWidth
            autoComplete="email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTelInput
            fullWidth
            value={customerPhone}
            onChange={(newPhone) => setCustomerPhone(newPhone)}
            error={!matchIsValidTel(customerPhone)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="contactMe" value="yes" />}
            label="Accept updates about future events"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
