import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useLocation} from "react-router-dom";
import CustomerInformationForm from "./components/CustomerInformationForm";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/ReviewForm";
import {createContext, useState} from "react";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {matchIsValidTel} from "mui-tel-input";
import isEmail from "validator/es/lib/isEmail";
import isCreditCard from "validator/es/lib/isCreditCard";
import isDate from "validator/es/lib/isDate";

export const CheckoutContext = createContext({})

const steps = ['Customer Info', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CustomerInformationForm/>;
    case 1:
      return <PaymentForm/>;
    case 2:
      return <Review/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);

  const location = useLocation();

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const [paymentType, setPaymentType] = useState(0)

  const [name, setName] = useState('Robby')
  const [date, setDate] = useState("2023/12/01")
  const [ccNumber, setCcNumber] = useState('2221005663144978')
  const [cvv, setCvv] = useState('343')

  const checkTicketSold = async () => {
    let errorFound = false


    for (const index in location.state) {
      const {data: ticket} = await supabase
        .from('Tickets')
        .select('*')
        .eq('ticketID', location.state[index].ticketID)

      console.log(ticket)
      if (ticket[0].soldBool) {
        return true
      }
    }


    return errorFound
  }

  const getCustomer = async () => {
    const {data: customers, customerCheckError} = await supabase
      .from('Customers')
      .select('*')
      .eq('customerEmail', customerEmail)

    if (customerCheckError) {
      return null
    } else {
      return customers
    }
  }

  const addCustomer = async () => {
    const {data: customerData, customerInsertError} = await supabase
      .from('Customers')
      .insert({
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
      })


    if (customerInsertError) {
      return false
    } else {
      return true
    }

  }

  function isCvv(input) {
    const cvv = /^[0-9]{3,4}$/;
    if (input.match(cvv)) {
      return true;
    } else {
      return false;
    }
  }

  const handleNext = async () => {

    if (activeStep === 0) {
      // VALIDILITY CHECKER FOR CUSTOMER INFORMATION

      if (!isEmail(customerEmail) || customerName === '' || !matchIsValidTel(customerPhone)) {

      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      // VALIDILITY CHECKER FOR PAYMENTS

      if (paymentType === 0) {
        if (name === '' || !isCreditCard(ccNumber) || !isCvv(cvv) || !isDate(date)) {

        } else {
          setActiveStep(activeStep + 1);

        }
      } else {
        setActiveStep(activeStep + 1);

      }


    } else if (activeStep === 2) {


      // CHECKS IF TICKETS ARE SOLD

      let errorFound = await checkTicketSold()

      if (errorFound) {
        setError('uh oh sphagettios')

      } else {
        let customers = await getCustomer();

        if (customers) {
          if (customers.length === 0) {
            // INSERTS THE CUSTOMER

            let customerInsertReturn = await addCustomer();

            if (!customerInsertReturn) {
              setError('oh god oh no')
            } else {

            }

            // GETS THE CUSTOMER AFTER INSERTING
            customers = await getCustomer();


          }

          if (customers) {

            // UPDATES THE TICKETS IN THE DATABASE

            const {data, error} = await supabase
              .from('Tickets')
              .upsert(location.state.map((ticket) => {
                return {
                  ticketID: ticket.ticketID,
                  seasonTicketHolderID: ticket.seasonTicketHolderID,
                  soldBool: true,
                  priceValue: ticket.priceValue,
                  eventID: ticket.eventID,
                  seasonID: ticket.seasonID,
                  seatNumber: ticket.seatNumber,
                  rowNumber: ticket.rowNumber,
                  sectionNumber: ticket.sectionNumber,
                  customerID: customers[0].customerID,
                }
              }))
              .select()
          }
        } else {
          setError('oh god')
        }

        if (error) {
          setError(error)
        }
      }

      setActiveStep(activeStep + 1);
    }


  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  function checkoutResult() {
    if (error) {
      return (
        <>We're sorry, there was an issue on our end. Please try again later.</>
      )
    } else {
      return (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #{Math.trunc(Math.random() * 1000)}. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </React.Fragment>
      )
    }
  }

  return (
    <CustomerHeader helpID={9}>
      <ThemeProvider theme={theme}>
        <CheckoutContext.Provider
          value={{
            customerName: customerName,
            setCustomerName: setCustomerName,
            customerPhone: customerPhone,
            setCustomerPhone: setCustomerPhone,
            customerEmail: customerEmail,
            setCustomerEmail: setCustomerEmail,
            setName: setName,
            name: name,
            setCvv: setCvv,
            cvv: cvv,
            setCcNumber: setCcNumber,
            ccNumber: ccNumber,
            date: date,
            setDate: setDate,
            selectedPaymentType: paymentType,
            setSelectedPaymentType: setPaymentType,
          }}
        >

          <CssBaseline/>
          <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <>{checkoutResult()}</>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{mt: 3, ml: 1}}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Paper>
          </Container>
        </CheckoutContext.Provider>
      </ThemeProvider>
    </CustomerHeader>

  );
}
