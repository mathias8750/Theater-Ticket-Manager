import {Box, Grid} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import CustomerEvent from "./components/CustomerEvent";
import {useLocation, useNavigate} from "react-router-dom";

const CustomerEvents = ({}) => {

  const location = useLocation()

  const navigate = useNavigate()

  const [selectedEvent, setSelectedEvent] = useState(null)

  const fetchEvents = async () => {
    let {data: events} = await supabase
      .from('Events')
      // gets all the info from the events table, combining them with org and venues
      .select('*, Organizations(organizationName), Venues(venueName)');

    // filters out the events before today
    events = events.filter((event) => {
      const today = new Date()
      const eventDate = new Date(event.eventDateTime)

      if (today < eventDate) {
        return event
      }
    })

    if (location.state) {
      setSelectedEvent(location.state)
    }

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
    navigate("/customer/events/checkout", {state: seats.result})
  }

  return (
    <CustomerHeader helpID={1}>
      <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar events={data} onEventClick={onEventClick}/>
          </Grid>


          <Grid item md={8} style={{paddingRight: '10px', height: '75%', display: 'flex'}}>
            {selectedEvent !== null ? (
              <CustomerEvent key={selectedEvent.eventID} event={selectedEvent}
                             onRecommendedSeatsClick={onRecommendedSeatsClick}/>
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
