import {Grid} from "@mui/material";
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import supabase from "../../utils/Supabase";
import {useState} from "react";
import TicketSelectorSidebar from "./components/TicketSelectorSidebar";
import TicketViewer from "./components/TicketViewer";
import EmployeeHeader from "renderer/components/EmployeeHeader";
// List of imported libraries and components above


const EmployeeTicketSelector = ({}) => {

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

  return (
    <EmployeeHeader>
      <Grid container style={{ height: '100%'}}>

        <TicketSelectorSidebar event={event} selectedSeats={selectedSeats} />

        <Grid item md={8}>
          <TicketViewer
            venue={event.venueID}
            tickets={tickets}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            maxSeats={2000}
          />
        </Grid>
      </Grid>
    </EmployeeHeader>
  )
}

export default EmployeeTicketSelector;
