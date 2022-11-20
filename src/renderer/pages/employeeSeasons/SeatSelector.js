import {Grid} from "@mui/material";
import {Navigate, useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import supabase from "../../utils/Supabase";
import {useState, useRef} from "react";
import SeatSelectorSidebar from "./components/SeatSelectorSidebar";
import SeatViewer from "./components/SeatViewer";
import EmployeeHeader from "renderer/components/EmployeeHeader";
import { useNavigate } from "react-router-dom";


const SeatSelector = ({}) => {

  const { state: newTicketHolderData } = useLocation();
 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const concertHallSeat = useRef({});
  const playhouseSeat = useRef({});
  const tickets = useRef([]);
  const [venue, setVenue] = useState(1);
  const supabaseVenue = useRef(1);
  const navigate = useNavigate();

  const onSelectClick = () => {
    if (venue === 1) {
        concertHallSeat.current = selectedSeats[0];
        supabaseVenue.current = 2;
        fetchTickets().then(() => {setVenue(2); setSelectedSeats([])});
    } else {
        playhouseSeat.current = selectedSeats[0];
        navigate('/employee/home/seasons/seat-selector/finalize', {state: {newTicketHolderData: newTicketHolderData, playhouseSeat: playhouseSeat, concertHallSeat: concertHallSeat}});
    }
  }

  const fetchTickets = async () => {
    const { data: tickets_sample, error } = await supabase
      .from('Tickets')
      .select('*')
      .eq('seasonID', newTicketHolderData.season.seasonID)
      .eq('venueID', supabaseVenue.current)

    if (!error) {
        tickets.current = tickets_sample;
        console.log(tickets.current);
    }

    return tickets_sample;
  }

  const {status, error} = useQuery(['tickets'], fetchTickets)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <EmployeeHeader>
      <Grid container style={{ height: '100%'}}>

        <SeatSelectorSidebar season={newTicketHolderData.season} selectedSeats={selectedSeats} onSelectClick={onSelectClick}/>

        <Grid item md={8}>
          <SeatViewer
            venue={venue}
            tickets={tickets.current}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            maxSeats={1}
          />
        </Grid>
      </Grid>
    </EmployeeHeader>
  )
}

export default SeatSelector;
