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
      <Typography varient="h1" >Customer Home Page</Typography>

      <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
        
      <NavLink to={"/customer/events"}>
        <Button>
          See All Events
        </Button>
      </NavLink>
      <NavLink to={"/employee/login"}>
        <Button className="button">
          Employee Login
        </Button>
      </NavLink>

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

export default CustomerHome;
