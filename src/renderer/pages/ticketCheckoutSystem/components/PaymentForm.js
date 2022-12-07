import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {MenuItem} from "@mui/material";
import {useContext, useState} from "react";
import isCreditCard from "validator/es/lib/isCreditCard";
import isDate from "validator/es/lib/isDate";
import {CheckoutContext} from "../TicketCheckout";

const CashPaymentForm = ({}) => {
  return (
    <Typography variant="h6" gutterBottom>
      The Cashier will take your cash as payment.
    </Typography>
  )
}

const CheckPaymentForm = ({}) => {
  return (
    <Typography variant="h6" gutterBottom>
      The Cashier will take your check as payment.
    </Typography>
  )
}

function isCvv(input) {
  const cvv = /^[0-9]{3,4}$/;
  if (input.match(cvv)) {
    return true;
  } else {
    return false;
  }
}

const CreditCardPaymentForm = ({}) => {

  const {name, setName, ccNumber, setCcNumber, setDate, date, setCvv, cvv} = useContext(CheckoutContext)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardName"
          label="Name on card"
          fullWidth
          autoComplete="cc-name"
          variant="standard"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardNumber"
          label="Card number"
          fullWidth
          autoComplete="cc-number"
          variant="standard"
          value={ccNumber}
          onChange={event => setCcNumber(event.target.value)}
          error={!isCreditCard(ccNumber)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          defaultValue={"YYYY/MM/DD"}
          required
          id="expDate"
          label="Expiry date"
          fullWidth
          autoComplete="cc-exp"
          variant="standard"
          value={date}
          onChange={event => setDate(event.target.value)}
          error={!isDate(date)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          helperText="Last three digits on signature strip"
          fullWidth
          autoComplete="cc-csc"
          variant="standard"
          value={cvv}
          onChange={event => setCvv(event.target.value)}
          error={!isCvv(cvv)}
        />
      </Grid>
    </Grid>
  )
}


export default function PaymentForm() {

  const { selectedPaymentType, setSelectedPaymentType } = useContext(CheckoutContext)


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <TextField
        label={"Payment Type"}
        value={selectedPaymentType}
        select
        fullWidth
        onChange={event => setSelectedPaymentType(event.target.value)}
      >
        <MenuItem key={0} value={0}>Credit/Debit Card</MenuItem>
        <MenuItem key={1} value={1}>Check</MenuItem>
        <MenuItem key={2} value={2}>Cash</MenuItem>
      </TextField>
      {selectedPaymentType === 0 ? (
        <CreditCardPaymentForm/>
      ) : selectedPaymentType === 1 ? (
        <CheckPaymentForm/>
      ) : selectedPaymentType === 2 ? (
        <CashPaymentForm/>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
