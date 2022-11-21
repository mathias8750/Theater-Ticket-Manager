import { Typography, Button, Dialog, Alert } from "@mui/material";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeHeader from "renderer/components/EmployeeHeader";
import supabase from "renderer/utils/Supabase";

const TicketHolderFinalization = ({}) => {

    // set price in organization settings?
    const seasonTicketPrice = 200.00;

    const {state: customer} = useLocation();
    const [successOpen, setSuccessOpen] = useState(false);
    const [seatSoldErrorOpen, setSeatSoldErrorOpen] = useState(false);
    const [customerAddErrorOpen, setCustomerAddErrorOpen] = useState(false);
    const ticketSoldCheck = useRef(false);
    const customerIDRef = useRef(0);
    const ticketHolderID = useRef(0);
    const navigate = useNavigate();

    const fetchCustomer = async() => {
        const {data: cust, error} = await supabase
          .from('Customers')
          .select('*')
          .eq('customerName', customer.newTicketHolderData.name)
          .eq('customerPhone', customer.newTicketHolderData.phone)
          .eq('customerEmail', customer.newTicketHolderData.email);
        
        if (!error) {
            if (cust.length != 0) {
                customerIDRef.current = cust[0].customerID;
            }
        }
    }

    const insertCustomer = async() => {
        const {data: cust, error} = await supabase
          .from('Customers')
          .insert({customerName: customer.newTicketHolderData.name, customerPhone: customer.newTicketHolderData.phone, customerEmail: customer.newTicketHolderData.email});

        if (!error) {
            customerIDRef.current = cust[0].customerID;
        }
    }

    const insertTicketHolder = async(customerID) => {
        const {data: holder, error} = await supabase
          .from('SeasonTicketHolders')
          .insert({customerID: customerID, 
                   seasonID: customer.newTicketHolderData.season.seasonID, 
                   concertHallSeatNumber: customer.concertHallSeat.current.seatNumber, 
                   concertHallRowNumber: customer.concertHallSeat.current.rowNumber,
                   concertHallSectionNumber: customer.concertHallSeat.current.sectionNumber,
                   playhouseSeatNumber: customer.playhouseSeat.current.seatNumber,
                   playhouseRowNumber: customer.playhouseSeat.current.rowNumber,
                   playhouseSectionNumber: customer.playhouseSeat.current.sectionNumber,
                });
        if (!error) {
            ticketHolderID.current = holder[0].seasonTicketHolderID;
        }
    }

    const updateConcertHallTicketSoldValues = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({soldBool: true})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 1)
          .eq('seatNumber', customer.concertHallSeat.current.seatNumber)
          .eq('rowNumber', customer.concertHallSeat.current.rowNumber)
          .eq('sectionNumber', customer.concertHallSeat.current.sectionNumber);
    }

    const updateConcertHallTicketHolderID = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({seasonTicketHolderID: ticketHolderID.current})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 1)
          .eq('seatNumber', customer.concertHallSeat.current.seatNumber)
          .eq('rowNumber', customer.concertHallSeat.current.rowNumber)
          .eq('sectionNumber', customer.concertHallSeat.current.sectionNumber);
    }

    const updatePlayhouseTicketSoldValues = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({soldBool: true})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 2)
          .eq('seatNumber', customer.playhouseSeat.current.seatNumber)
          .eq('rowNumber', customer.playhouseSeat.current.rowNumber)
          .eq('sectionNumber', customer.playhouseSeat.current.sectionNumber);
    }

    const updatePlayhouseTicketHolderID = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({seasonTicketHolderID: ticketHolderID.current})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 2)
          .eq('seatNumber', customer.playhouseSeat.current.seatNumber)
          .eq('rowNumber', customer.playhouseSeat.current.rowNumber)
          .eq('sectionNumber', customer.playhouseSeat.current.sectionNumber);
    }

    const updateConcertHallCustomerID = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({customerID: customerIDRef.current})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 1)
          .eq('seatNumber', customer.concertHallSeat.current.seatNumber)
          .eq('rowNumber', customer.concertHallSeat.current.rowNumber)
          .eq('sectionNumber', customer.concertHallSeat.current.sectionNumber);
    }

    const updatePlayhouseCustomerID = async() => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({customerID: customerIDRef.current})
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 2)
          .eq('seatNumber', customer.playhouseSeat.current.seatNumber)
          .eq('rowNumber', customer.playhouseSeat.current.rowNumber)
          .eq('sectionNumber', customer.playhouseSeat.current.sectionNumber);
    }

    const checkConcertHallTicketSales = async() => {
        const {data: ticket, error} = await supabase
          .from('Tickets')
          .select('soldBool')
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 1)
          .eq('seatNumber', customer.concertHallSeat.current.seatNumber)
          .eq('rowNumber', customer.concertHallSeat.current.rowNumber)
          .eq('sectionNumber', customer.concertHallSeat.current.sectionNumber);

        if (!error) {
            if (ticket[0]?.soldBool === true) {
                ticketSoldCheck.current = true;
            }
        }
    }

    const checkPlayhouseTicketSales = async() => {
        const {data: ticket, error} = await supabase
          .from('Tickets')
          .select('soldBool')
          .eq('seasonID', customer.newTicketHolderData.season.seasonID)
          .eq('venueID', 2)
          .eq('seatNumber', customer.playhouseSeat.current.seatNumber)
          .eq('rowNumber', customer.playhouseSeat.current.rowNumber)
          .eq('sectionNumber', customer.playhouseSeat.current.sectionNumber);

        if (!error) {
            if (ticket[0]?.soldBool === true) {
                ticketSoldCheck.current = true;
            }
        }
    }

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

    const onCancelClick = () => {
        navigate('/employee/home/seasons');
    }

    const onSuccessClose = () => {
        setSuccessOpen(!successOpen);
        navigate('/employee/home/seasons');
    }

    const onSeatSoldErrorClose = () => {
        setSeatSoldErrorOpen(!seatSoldErrorOpen);
        navigate('/employee/home/seasons');
    }

    const onCustomerAddErrorClose = () => {
        setCustomerAddErrorOpen(!customerAddErrorOpen);
        navigate('/employee/home/seasons');
    }

    return (
        <EmployeeHeader>
          <div style={{height: '100%'}}>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography variant="h6" align="center" style={{paddingTop: '5%', paddingBottom: '1%'}}>Finalize Purchase</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Name: {customer.newTicketHolderData.name}</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Email: {customer.newTicketHolderData.email}</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Phone #: {customer.newTicketHolderData.phone}</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Concert Hall Seat: {'Section: ' + customer.concertHallSeat.current.sectionNumber + ' Row: ' + customer.concertHallSeat.current.rowNumber + ' Seat: ' + customer.concertHallSeat.current.seatNumber}</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Playhouse Seat: {'Section: ' + customer.playhouseSeat.current.sectionNumber + ' Row: ' + customer.playhouseSeat.current.rowNumber + ' Seat: ' + customer.playhouseSeat.current.seatNumber}</Typography>
          </div>
          <div style={{
          display: 'flex',
          paddingBottom: '1%',
          justifyContent: 'center'
          }}>
            <Typography align="center" style={{paddingTop: '1%', paddingBottom: '1%'}}>Price: ${seasonTicketPrice}</Typography>
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