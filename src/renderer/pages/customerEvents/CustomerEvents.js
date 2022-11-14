import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState, useContext} from "react";
import CustomerEvent from "./components/CustomerEvent";
import {useLocation, useNavigate} from "react-router-dom";

const CustomerEvents = ({}) => {

  const location = useLocation()

  const navigate = useNavigate()

  const [selectedEvent, setSelectedEvent] = useState(location.state)

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');

    setSelectedEvent(location.state)

    return events;
  }

  const {status, data, error} = useQuery(['events'], fetchEvents)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onEventClick = (event) => {
    setSelectedEvent(event)
  }

  // seats.section gives section,
  // seats.result[] array gives rowNumber and seatNumber for each seat (row will be same for each seat)
  const onRecommendedSeatsClick = (seats) => {
    console.log("Clicked on Seat"
                + "\nSection: "
                + seats.section
                + "\nRow: "
                + seats.result[0].rowNumber
                + "\nSeat(s): "
                );
    for (const seat of seats.result) {
      console.log(seat.seatNumber);
    }

    navigate("/customer/events/checkout", {state: seats.result})
  }

  return (
    <CustomerHeader>
      <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar events={data} onEventClick={onEventClick}/>
          </Grid>


          <Grid item md={8} style={{paddingRight: '10px', height: '75%', display: 'flex'}}>
            {selectedEvent !== null ? (
              <CustomerEvent key={selectedEvent.eventID} event={selectedEvent} onRecommendedSeatsClick={onRecommendedSeatsClick}/>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </CustomerHeader>
  )
}

export default CustomerEvents;
