import EmployeeHeader from "../../components/EmployeeHeader";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText, MenuItem,
  TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useLocation, useNavigate} from "react-router-dom";
import supabase from "../../utils/Supabase";
import TicketViewer from "../ticketCheckoutSystem/components/TicketViewer";

const SeasonTicketSelectorSidebarVenueSelectedSeat = ({title, seat}) => {

  return (
    <Card style={{height: '100%'}}>
      <CardHeader
        title={title}
      />

      <Divider/>

      <CardContent style={{height: '100%', paddingRight: '0px'}}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            height: '85%',
            '& ul': {padding: 0},
          }}
          subheader={<li/>}
        >
          {seat.map((seat) => (
            <>
              <ListItem
                key={seat.id}
                sx={{
                  paddingLeft: '0px'
                }}>
                <ListItemText
                  primary={`${seat.sectionNumber} Row ${seat.rowNumber} Seat ${seat.seatNumber}`}
                  primaryTypographyProps={{
                    variant: 'h5'
                  }}
                  secondaryTypographyProps={{
                    variant: 'h6'
                  }}
                />
              </ListItem>
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const SeasonTicketSelectorSidebar = ({
                                       selectedVenue,
                                       setSelectedVenue,
                                       onCheckoutClick,
                                       concertHallSeat,
                                       playhouseSeat
                                     }) => {

  return (
    <Grid direction={'column'} container style={{height: '100%', padding: '10px'}} md={4}>
      <Grid item style={{height: '7%'}}>
        <TextField
          fullWidth={true}
          select
          label={"Venue Select"}
          value={selectedVenue}
          onChange={(event) => {
            setSelectedVenue(event.target.value)
          }}
        >
          <MenuItem key={1} value={1}>Concert Hall</MenuItem>
          <MenuItem key={2} value={2}>Playhouse</MenuItem>
        </TextField>
      </Grid>

      <Grid item style={{height: '44%'}}>
        <SeasonTicketSelectorSidebarVenueSelectedSeat title={"Concert Hall Seat"} seat={concertHallSeat}/>
      </Grid>

      <Grid item style={{height: '44%', paddingTop: '1%'}}>
        <SeasonTicketSelectorSidebarVenueSelectedSeat title={"Playhouse Seat"} seat={playhouseSeat}/>
      </Grid>

      <Grid item style={{height: '5%'}}>
        <div style={{height: '10%'}}/>
        <Button
          style={{width: '100%', height: '90%'}}
          variant={'contained'}
          disabled={concertHallSeat.length === 0 || playhouseSeat.length === 0}
          onClick={() => {
            onCheckoutClick()
          }}
        >
          Finalize
        </Button>
      </Grid>
    </Grid>
  )
}

const ConcertHallSeatSelector = ({uniqueID, seasonID, selectedSeats, setSelectedSeats}) => {

  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    let {data: tickets_sample, tickets_error} = await supabase
      .from('Tickets')
      .select('*')
      .eq('seasonID', seasonID)
      .eq('venueID', 1)

    let {data: ticket_holders, holders_error} = await supabase
      .from('SeasonTicketHolders')
      .select('*')
      .eq('seasonID', seasonID)

    let tickets = {}

    if (!tickets_error && !holders_error) {
      for (const ticket of tickets_sample) {
        const key = `${ticket.sectionNumber}-${ticket.rowNumber}-${ticket.seatNumber}`


        if (key in tickets) {
          if (!tickets[key].soldBool && ticket.soldBool) {
            tickets[key].soldBool = true
          }
        } else {
          tickets[key] = {
            sectionNumber: ticket.sectionNumber,
            rowNumber: ticket.rowNumber,
            seatNumber: ticket.seatNumber,
            soldBool: ticket.soldBool
          }
        }
      }

      if (tickets_sample.length === 0) {
        for (const holder of ticket_holders) {
          const key = `${holder.concertHallSectionNumber}-${holder.concertHallRowNumber}-${holder.concertHallSeatNumber}`

          if (key in tickets) {

          } else {
            tickets[key] = {
              sectionNumber: holder.concertHallSectionNumber,
              rowNumber: holder.concertHallRowNumber,
              seatNumber: holder.concertHallSeatNumber,
              soldBool: true
            }
          }
        }
      }
    }
    return Object.values(tickets)
  }

  const {
    status,
    error
  } = useQuery(['tickets', uniqueID], fetchTickets, {onSuccess: data => setTickets(data)})

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <TicketViewer
      key={`${seasonID}-${1}-${uniqueID}`}
      venue={1}
      tickets={tickets}
      selectedSeats={selectedSeats}
      setSelectedSeats={setSelectedSeats}
      maxSeats={1}
    />
  )
}

const PlayhouseSeatSelector = ({uniqueID, seasonID, selectedSeats, setSelectedSeats}) => {

  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    let {data: tickets_sample, error} = await supabase
      .from('Tickets')
      .select('*')
      .eq('seasonID', seasonID)
      .eq('venueID', 2)

    let {data: ticket_holders, holders_error} = await supabase
      .from('SeasonTicketHolders')
      .select('*')
      .eq('seasonID', seasonID)

    let tickets = {}

    if (!error) {
      for (const ticket of tickets_sample) {
        const key = `${ticket.sectionNumber}-${ticket.rowNumber}-${ticket.seatNumber}`

        if (key in tickets) {
          if (!tickets[key].soldBool && ticket.soldBool) {
            tickets[key].soldBool = true
          }
        } else {
          tickets[key] = {
            sectionNumber: ticket.sectionNumber,
            rowNumber: ticket.rowNumber,
            seatNumber: ticket.seatNumber,
            soldBool: ticket.soldBool
          }
        }
      }

      if (tickets_sample.length === 0) {
        for (const holder of ticket_holders) {
          const key = `${holder.playhouseSectionNumber}-${holder.playhouseRowNumber}-${holder.playhouseSeatNumber}`

          if (key in tickets) {

          } else {
            tickets[key] = {
              sectionNumber: holder.playhouseSectionNumber,
              rowNumber: holder.playhouseRowNumber,
              seatNumber: holder.playhouseSeatNumber,
              soldBool: true
            }
          }
        }
      }

      console.log(tickets)

      /*
      for (let i = 0; i < tickets_sample.length; i++) {
        if (tickets_sample[i].soldBool === true) {
          for (let j = 0; j < tickets_sample.length; j++) {
            if ((tickets_sample[i].seatNumber === tickets_sample[j].seatNumber) && (tickets_sample[i].rowNumber === tickets_sample[j].rowNumber) && (tickets_sample[i].sectionNumber === tickets_sample[j].sectionNumber)) {
              tickets_sample[j].soldBool = true;
            }
          }
        }
      }

      if (tickets_sample.length === 0) {
        tickets_sample = generateTempTickets(selectedVenue, seasonID)
      } */
    }
    return Object.values(tickets)
  }

  const {
    status,
    error
  } = useQuery(['tickets', uniqueID], fetchTickets, {onSuccess: data => setTickets(data)})

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <TicketViewer
      key={`${seasonID}-${2}-${uniqueID}`}
      venue={2}
      tickets={tickets}
      selectedSeats={selectedSeats}
      setSelectedSeats={setSelectedSeats}
      maxSeats={1}
    />
  )
}

const SeasonTicketSelector = ({}) => {

  const {state: newTicketHolderData} = useLocation();
  const navigate = useNavigate();

  const [concertHallSeat, setConcertHallSeat] = useState([])
  const [playhouseSeat, setPlayhouseSeat] = useState([])
  const [selectedVenue, setSelectedVenue] = useState(1)

  const onCheckoutClick = () => {
    navigate('/employee/home/seasons/seat-selector/finalize', {
      state: {
        newTicketHolderData: newTicketHolderData,
        playhouseSeat: playhouseSeat[0],
        concertHallSeat: concertHallSeat[0]
      }
    });
  }


  return (
    <EmployeeHeader>
      <Grid container style={{height: '100%'}}>

        <SeasonTicketSelectorSidebar
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          onCheckoutClick={onCheckoutClick}
          concertHallSeat={concertHallSeat}
          playhouseSeat={playhouseSeat}
        />

        <Grid item md={8}>
          {selectedVenue === 1 ? (
            <ConcertHallSeatSelector
              uniqueID={newTicketHolderData.uniqueID}
              seasonID={newTicketHolderData.season.seasonID}
              selectedSeats={concertHallSeat}
              setSelectedSeats={setConcertHallSeat}
            />
          ) : (
            <PlayhouseSeatSelector
              uniqueID={newTicketHolderData.uniqueID}
              seasonID={newTicketHolderData.season.seasonID}
              selectedSeats={playhouseSeat}
              setSelectedSeats={setPlayhouseSeat}
            />
          )}
        </Grid>
      </Grid>
    </EmployeeHeader>
  )
}

export default SeasonTicketSelector
