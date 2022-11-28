import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import supabase from "../../../utils/Supabase";
import SelectedSeatList from "../../../components/SelectedSeatList";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";


const FinalizeExchangeDialog = ({ handleClose, open, selectedEvent, selectedTickets, originalEvent, originalTickets, customer, handleAlert }) => {

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false)

  const onSuccessClose = () => {
    setSuccessOpen(!successOpen);
    handleClose(true)
    navigate('/employee/home/events')

  }

  const onErrorClose = () => {
    setErrorOpen(!open)
  }

  let navigate = useNavigate();

  const checkTicketSold = async () => {
    for (const index in selectedTickets) {
      const { data: ticket } = await supabase
        .from('Tickets')
        .select('*')
        .eq('ticketID', selectedTickets[index].ticketID)

      if (ticket[0].soldBool) {
        return true
      }
    }

    return false
  }

  const resetTicket =  async () => {
    const {data, error} = await supabase
      .from('Tickets')
      .upsert(originalTickets.map((ticket) => {
        return {
          ticketID: ticket.ticketID,
          seasonTicketHolderID: ticket.seasonTicketHolderID,
          soldBool: false,
          priceValue: ticket.priceValue,
          eventID: ticket.eventID,
          seasonID: ticket.seasonID,
          seatNumber: ticket.seatNumber,
          rowNumber: ticket.rowNumber,
          sectionNumber: ticket.sectionNumber,
          venueID: ticket.venueID,
          customerID: null
        }
      }))
      .select()

    if (error) {
      console.log(error)
      return true
    } else {
      return false
    }
  }

  const purchaseTicket = async () => {
    const {data, error} = await supabase
      .from('Tickets')
      .upsert(selectedTickets.map((ticket) => {
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
          venueID: ticket.venueID,
          customerID: customer.customerID
        }
      }))
      .select()

    if (error) {
      console.log(error)
      return true
    } else {
      return false
    }
  }

  const handleConfirm = async () => {

    if (await checkTicketSold()) {
      setErrorOpen(true)
    } else if (await resetTicket()) {
      setErrorOpen(true)
    } else if (await purchaseTicket()) {
      setErrorOpen(true)
    } else {
      setSuccessOpen(true)
    }
  }

  if (!selectedEvent) {
    return <></>
  }

  const newCost = () => {
    let oldSum = 0
    let newSum = 0

    originalTickets.map((ticket) => {
      oldSum += ticket.priceValue
    })

    selectedTickets.map((ticket) => {
      newSum += ticket.priceValue
    })

    let difference = oldSum - newSum

    if (difference < 0) {
      return <Typography style={{padding: 0}}>Cost: ${(Math.abs(difference)).toFixed(2)}</Typography>
    } else {
      return <Typography style={{padding: 0}}>Refund: ${(Math.abs(difference)).toFixed(2)}</Typography>
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Stack>

          <Card style={{ margin: '10px'}}>
            <CardHeader
              title={customer.customerName}
              subheader={customer.customerEmail}
            />
          </Card>

          <Grid container style={{ width: '100%', padding: '10px'}}>
            <Grid item md={5} style={{ width: '50%'}}>
              <SelectedSeatList event={originalEvent} selectedSeats={originalTickets}/>
            </Grid>

            <Grid item md={2}>
                <ArrowForwardIcon style={{ width: '100%', height: '100%', margin: 'auto'}}/>
            </Grid>

            <Grid item md={5} style={{ width: '50%'}}>
              <SelectedSeatList event={selectedEvent} selectedSeats={selectedTickets}/>
            </Grid>
          </Grid>

          <Card style={{ margin: '10px'}}>
            <CardContent>
              {newCost()}
            </CardContent>
          </Card>

          <Button
            style={{margin: '10px'}}
            variant={'contained'}
            onClick={handleConfirm}
          >
            Confirm
          </Button>

        </Stack>

      </Dialog>

      <Dialog open={successOpen} onClose={onSuccessClose}>
        <Alert severity={'success'}>
          Exchanged Tickets!
        </Alert>
      </Dialog>

      <Dialog open={errorOpen} onClose={onErrorClose}>
        <Alert severity={'error'}>
          Error: Try Again
        </Alert>
      </Dialog>
    </>

  )
}

export default FinalizeExchangeDialog;
