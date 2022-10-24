import {Box, Card, CardContent, Grid, Typography, Button} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

const EmployeeEvents = ({event}) => {


  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    const { data: events } = await supabase
      .from('Events')
      .select('eventName, eventDateTime, eventID, Organizations(organizationName)');

    return events;
  }

  const {status, data, error} = useQuery(['events'], fetchEvents);
  
    return (
        <>
          <EmployeeHeader/>
          
          
        </>
      )
}

export default EmployeeEvents;