import {Button, Typography, Box, Grid} from "@mui/material";
import {Link as NavLink} from 'react-router-dom';
import CustomerHeader from "../../components/CustomerHeader";
import TextField from '@mui/material/TextField';
import ScrollableSidebar from "../../components/ScrollableSidebar";
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import CustomerEvent from "../customerEvents/components/CustomerEvent";



import "./style.css";
import { autoUpdater } from "electron";



const CustomerHome = ({}) => {

  const [selectedEvent, setSelectedEvent] = useState(null)

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('eventName, eventDateTime, eventID, Organizations(organizationName)');

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
      <Typography variant="h6" >Customer Home</Typography>

      <Box style={{ flexGrow: 1, background: 'white', height: '90%'}}>
        <Grid  style={{padding: '10px', height: '100%', margin: 'auto', width: '80%'}}>
          <Grid item md={4} style={{paddingRight: '0px', height: '100%'}}>
            <ScrollableSidebar events={data} onEventClick={onEventClick}/>
          </Grid>
        </Grid>
      </Box>

      <Box style={{margin: 'auto', width: '20%'}}>
        <NavLink to={"/customer/events"}>
          <Button>
            See All Events
          </Button>
        </NavLink>
      </Box>
      
    </CustomerHeader>
    
  )
}

export default CustomerHome;
