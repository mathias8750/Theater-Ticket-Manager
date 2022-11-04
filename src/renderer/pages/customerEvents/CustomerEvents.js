import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import CustomerHeader from "../../components/CustomerHeader";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState, useContext} from "react";
import CustomerEvent from "./components/CustomerEvent";
import Playhouse from "../seatViewer/components/Playhouse";
import { EventContext } from "renderer/context/Context";


const CustomerEvents = ({}) => {

  const [selectedEvent, setSelectedEvent] = useState(null)
  const {state, update} = useContext(EventContext);

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('*, Organizations(organizationName), Venues(venueName)');

    if (state.selectedEvent) {
      setSelectedEvent(state.selectedEvent)
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

  return (
    <CustomerHeader>
      <Box style={{ flexGrow: 1, background: 'white', height: '100%'}}>
        <Grid container style={{padding: '10px', height: '100%'}}>
          <Grid item md={4} style={{paddingRight: '10px', height: '100%'}}>
            <ScrollableSidebar events={data} onEventClick={onEventClick}/>
          </Grid>


          <Grid item md={8} style={{paddingRight: '10px', height: '100%'}}>
            {selectedEvent !== null ? (
              <CustomerEvent event={selectedEvent}/>
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
