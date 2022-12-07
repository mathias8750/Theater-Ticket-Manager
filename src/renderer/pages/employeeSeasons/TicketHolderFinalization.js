// Import libraries
import {Typography, FormControl, InputLabel, Select, MenuItem, Button, Dialog, Alert} from "@mui/material";
import React, {useContext, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import EmployeeHeader from "renderer/components/EmployeeHeader";
import supabase from "renderer/utils/Supabase";
import {OrganizationContext} from "../../context/Context";

// Ticket Holder Finalization
const TicketHolderFinalization = ({}) => {

  // Define constants
  const {state: organization} = useContext(OrganizationContext)

  const {state: customer} = useLocation();
  const [successOpen, setSuccessOpen] = useState(false);
  const [seatSoldErrorOpen, setSeatSoldErrorOpen] = useState(false);
  const [customerAddErrorOpen, setCustomerAddErrorOpen] = useState(false);
  const ticketSoldCheck = useRef(false);
  const [paymentOption, setPaymentOption] = useState(0);
  const customerIDRef = useRef(0);
  const ticketHolderID = useRef(0);
  const navigate = useNavigate();

  // Get cusomter from database
  const fetchCustomer = async () => {
    const {data: cust, error} = await supabase
      .from('Customers')
      .select('*')
      .eq('customerEmail', customer.newTicketHolderData.email);

    // Check for database error
    if (!error) {
      if (cust.length != 0) {
        customerIDRef.current = cust[0].customerID;
      }
    }
  }

  // Add new customer
  const insertCustomer = async () => {
    const {data: cust, error} = await supabase
      .from('Customers')
      .insert({
        customerName: customer.newTicketHolderData.name,
        customerPhone: customer.newTicketHolderData.phone,
        customerEmail: customer.newTicketHolderData.email
      });
    // Check for database error
    if (!error) {
      customerIDRef.current = cust[0].customerID;
    }
  }

  // Add new season ticket holder
  const insertTicketHolder = async (customerID) => {
    const {data: holder, error} = await supabase
      .from('SeasonTicketHolders')
      .insert({
        customerID: customerID,
        seasonID: customer.newTicketHolderData.season.seasonID,
        concertHallSeatNumber: customer.concertHallSeat.seatNumber,
        concertHallRowNumber: customer.concertHallSeat.rowNumber,
        concertHallSectionNumber: customer.concertHallSeat.sectionNumber,
        playhouseSeatNumber: customer.playhouseSeat.seatNumber,
        playhouseRowNumber: customer.playhouseSeat.rowNumber,
        playhouseSectionNumber: customer.playhouseSeat.sectionNumber,
      });
    // Check for database error
    if (!error) {
      ticketHolderID.current = holder[0].seasonTicketHolderID;
    }
  }

  // Update Concert Hall sold tickets
  const updateConcertHallTicketSoldValues = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({soldBool: true})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 1)
      .eq('seatNumber', customer.concertHallSeat.seatNumber)
      .eq('rowNumber', customer.concertHallSeat.rowNumber)
      .eq('sectionNumber', customer.concertHallSeat.sectionNumber);
  }

  // Update Concert Hall Ticket Holder ID
  const updateConcertHallTicketHolderID = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({seasonTicketHolderID: ticketHolderID.current})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 1)
      .eq('seatNumber', customer.concertHallSeat.seatNumber)
      .eq('rowNumber', customer.concertHallSeat.rowNumber)
      .eq('sectionNumber', customer.concertHallSeat.sectionNumber);
  }

  // Update Playhouse Sold Tickets
  const updatePlayhouseTicketSoldValues = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({soldBool: true})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 2)
      .eq('seatNumber', customer.playhouseSeat.seatNumber)
      .eq('rowNumber', customer.playhouseSeat.rowNumber)
      .eq('sectionNumber', customer.playhouseSeat.sectionNumber);
  }

  // Update Playhouse Ticket holder ID
  const updatePlayhouseTicketHolderID = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({seasonTicketHolderID: ticketHolderID.current})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 2)
      .eq('seatNumber', customer.playhouseSeat.seatNumber)
      .eq('rowNumber', customer.playhouseSeat.rowNumber)
      .eq('sectionNumber', customer.playhouseSeat.sectionNumber);
  }

  // Update Concert Hall Customer ID
  const updateConcertHallCustomerID = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({customerID: customerIDRef.current})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 1)
      .eq('seatNumber', customer.concertHallSeat.seatNumber)
      .eq('rowNumber', customer.concertHallSeat.rowNumber)
      .eq('sectionNumber', customer.concertHallSeat.sectionNumber);
  }

  // Update Playhouse Customer ID
  const updatePlayhouseCustomerID = async () => {
    const {data: tickets, error} = await supabase
      .from('Tickets')
      .update({customerID: customerIDRef.current})
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 2)
      .eq('seatNumber', customer.playhouseSeat.seatNumber)
      .eq('rowNumber', customer.playhouseSeat.rowNumber)
      .eq('sectionNumber', customer.playhouseSeat.sectionNumber);
  }

  // Check for sold tickets at the Concert Hall
  const checkConcertHallTicketSales = async () => {
    const {data: ticket, error} = await supabase
      .from('Tickets')
      .select('soldBool')
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 1)
      .eq('seatNumber', customer.concertHallSeat.seatNumber)
      .eq('rowNumber', customer.concertHallSeat.rowNumber)
      .eq('sectionNumber', customer.concertHallSeat.sectionNumber);

    // Check for database error
    if (!error) {
      if (ticket[0]?.soldBool === true) {
        ticketSoldCheck.current = true;
      }
    }
  }

  // Check for sold tickets at the Playhouse
  const checkPlayhouseTicketSales = async () => {
    const {data: ticket, error} = await supabase
      .from('Tickets')
      .select('soldBool')
      .eq('seasonID', customer.newTicketHolderData.season.seasonID)
      .eq('venueID', 2)
      .eq('seatNumber', customer.playhouseSeat.seatNumber)
      .eq('rowNumber', customer.playhouseSeat.rowNumber)
      .eq('sectionNumber', customer.playhouseSeat.sectionNumber);

    // Check for database error
    if (!error) {
      if (ticket[0]?.soldBool === true) {
        ticketSoldCheck.current = true;
      }
    }
  }

  // Finalize purchase
  const onFinalizeClick = () => {
    fetchCustomer().then(() => {
      checkConcertHallTicketSales().then(() => {
        checkPlayhouseTicketSales().then(() => {
          if (ticketSoldCheck.current != true) {
            if (customerIDRef.current != 0) {
              insertTicketHolder(customerIDRef.current).then(() => {
                updateConcertHallTicketSoldValues();
                updateConcertHallTicketHolderID();
                updatePlayhouseTicketSoldValues();
                updatePlayhouseTicketHolderID();
                updateConcertHallCustomerID();
                updatePlayhouseCustomerID();
                setSuccessOpen(!successOpen);
              })
            } else {
              insertCustomer().then(() => {
                if (customerIDRef.current != 0) {
                  insertTicketHolder(customerIDRef.current).then(() => {
                    updateConcertHallTicketSoldValues();
                    updateConcertHallTicketHolderID();
                    updatePlayhouseTicketSoldValues();
                    updatePlayhouseTicketHolderID();
                    updateConcertHallCustomerID();
                    updatePlayhouseCustomerID();
                    setSuccessOpen(!successOpen);
                  })
                } else {
                  setCustomerAddErrorOpen(!customerAddErrorOpen);
                }
              })
            }
          } else {
            setSeatSoldErrorOpen(!seatSoldErrorOpen);
          }
        })
      })
    })
  }

  // Cancel ticket holder purchase
  const onCancelClick = () => {
    navigate('/employee/home/seasons');
  }

  // Success
  const onSuccessClose = () => {
    setSuccessOpen(!successOpen);
    navigate('/employee/home/seasons');
  }

  // Set sold error
  const onSeatSoldErrorClose = () => {
    setSeatSoldErrorOpen(!seatSoldErrorOpen);
    navigate('/employee/home/seasons');
  }

  // Customer add error
  const onCustomerAddErrorClose = () => {
    setCustomerAddErrorOpen(!customerAddErrorOpen);
    navigate('/employee/home/seasons');
  }

  // Page content
  return (
    <EmployeeHeader helpID={13}>
      <div style={{height: '100%'}}>
        <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
        }}>
          <Typography variant="h6" align="center" style={{paddingTop: '5%', paddingBottom: '1%'}}>Finalize
            Purchase</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{
            paddingBottom: '0.5%'
          }}>Name: {customer.newTicketHolderData.name}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{
            paddingBottom: '0.5%'
          }}>Email: {customer.newTicketHolderData.email}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Phone
            #: {customer.newTicketHolderData.phone}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Concert Hall
            Seat: {'Section: ' + customer.concertHallSeat.sectionNumber + ' Row: ' + customer.concertHallSeat.rowNumber + ' Seat: ' + customer.concertHallSeat.seatNumber}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Playhouse
            Seat: {'Section: ' + customer.playhouseSeat.sectionNumber + ' Row: ' + customer.playhouseSeat.rowNumber + ' Seat: ' + customer.playhouseSeat.seatNumber}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '0.5%',
          justifyContent: 'center'
        }}>
          <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Price:
            ${organization.selectedOrg.organizationSeasonTicketPrice}</Typography>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '1%',
          paddingLeft: '36%',
          paddingRight: '35%',
          justifyContent: 'center'
        }}>
          <FormControl fullWidth>
            <InputLabel id="payment-select-label">Payment Option</InputLabel>
              <Select
              fullWidth
              labelId="payment-select-label"
              id="payment-select"
              value={paymentOption}
              label="Payment Option"
              onChange={(event) => {
                setPaymentOption(event.target.value)
              }}
            >
              <MenuItem value={0}>Card</MenuItem>
              <MenuItem value={1}>Cash</MenuItem>
              <MenuItem value={2}>Check</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
        }}>
          <Button
            onClick={onFinalizeClick}
          > Finalize </Button>
        </div>
        <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
        }}>
          <Button
            onClick={onCancelClick}
            style={{
              color: '#FF0000'
            }}
          > Cancel </Button>
        </div>
      </div>
      <Dialog open={successOpen} onClose={onSuccessClose}>
        <Alert severity={'success'}>
          Season Ticket Holder Added
        </Alert>
      </Dialog>
      <Dialog open={seatSoldErrorOpen} onClose={onSeatSoldErrorClose}>
        <Alert severity={'error'}>
          Seat already sold
        </Alert>
      </Dialog>
      <Dialog open={customerAddErrorOpen} onClose={onCustomerAddErrorClose}>
        <Alert severity={'error'}>
          Error adding customer; email/phone number may be taken
        </Alert>
      </Dialog>
    </EmployeeHeader>
  )
}

export default TicketHolderFinalization;
