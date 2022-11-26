import {
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


const FinalizeExchangeDialog = ({ handleClose, open, selectedEvent, selectedTickets, originalEvent, originalTickets, customer, handleAlert }) => {

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
      handleAlert(false)
    } else if (await resetTicket()) {
      handleAlert(false)
    } else if (await purchaseTicket()) {
      handleAlert(false)
    } else {
      //handleAlert(true)
    }


    handleClose(true)

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
      return <Typography style={{padding: 0}}>Cost: ${Math.abs(difference)}</Typography>
    } else {
      return <Typography style={{padding: 0}}>Refund: ${Math.abs(difference)}</Typography>
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
    </>

  )
}

export default FinalizeExchangeDialog;
