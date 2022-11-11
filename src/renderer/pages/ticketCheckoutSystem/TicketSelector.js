import CustomerHeader from "../../components/CustomerHeader";
import {Grid} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import supabase from "../../utils/Supabase";
import {useState} from "react";
import TicketSelectorSidebar from "./components/TicketSelectorSidebar";
import TicketViewer from "./components/TicketViewer";


const TicketSelector = ({}) => {

  const { state: event } = useLocation();

  const [selectedSeats, setSelectedSeats] = useState([])
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {
    const { data: tickets } = await supabase
      .from('Tickets')
      .select('*')
      .eq('eventID', event.eventID)

    return tickets
  }

  const {status, error} = useQuery(['tickets'], fetchTickets, {onSuccess: (data) => {
      setTickets(data)
    }})

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }


  const onSeatClick = (seat, selected) => {

    let tempSelectedSeats = [...selectedSeats];

    if (selected) {

      tempSelectedSeats = tempSelectedSeats.filter((element) => {
        if (element.ticketID !== seat.ticketID) {
          return element
        }
      })

    } else {
      tempSelectedSeats.push(seat)
    }

    setSelectedSeats(tempSelectedSeats)
  }


  return (
    <CustomerHeader>
      <Grid container style={{ height: '100%'}}>

        <TicketSelectorSidebar event={event} selectedSeats={selectedSeats}/>

        <Grid item md={8}>
          <TicketViewer venue={event.venueID} tickets={tickets} onSeatClick={onSeatClick}/>
        </Grid>
      </Grid>
    </CustomerHeader>
  )
}

export default TicketSelector;
