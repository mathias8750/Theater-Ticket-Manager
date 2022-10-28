import {Box, Card, CardContent, Grid, Typography, Button} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from 'react';


const EmployeeEvents = ({event}) => {

  const [removedEvent, setremovedEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const organizationidRef = useRef('');
  const eventidRef = useRef('');
  const venueidRef = useRef('');
  const seasonidRef = useRef('');
  const eventdatetimeRef = useRef('');
  const eventnameRef = useRef('');


  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('eventName, eventDateTime, eventID, Organizations(organizationName)');

    return events;
  }

  const {status, data, error} = useQuery(['events'], fetchEvents);
  
  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const onEventClick = (event) => {
    setSelectedEvent(event)
  }

  const addEvent = async () => {
    if(eventidRef.current.value.trim() != '' && organizationidRef.current.value.trim() != '' && eventidRef.current.value.trim() != '' && organizationidRef.current.value.trim() != '') {
        const {data: Events, error} = await supabase
        .from('Events')
        .insert([{ eventID: eventidRef.current.value.trim(), organizationID: organizationidRef.current.value.trim(), venueID: venueidRef.current.value.trim(), eventDateTime: eventdatetimeRef.current.value.trim(), eventName: eventnameRef.current.value.trim()}]);

        if (error) {
            toggleFailureAlert();
        } else {
            toggleSuccessAlert();
        }
    }
    eventidRef.current.value = '';
    organizationidRef.current.value = '';
    venueidRef.current.value = '';
    seasonidRef.current.value = '';
    eventdatetimeRef.current.value = '';
    
  }
  const removeEvent = async(event) => {
    const {deleteEvent, error} = await supabase
        .from("Events")
        .delete()
        .eq('', event.eventID);
  }

  return (
   <>
     <EmployeeHeader/>
          
          
        </>
      )
  
}

export default EmployeeEvents;