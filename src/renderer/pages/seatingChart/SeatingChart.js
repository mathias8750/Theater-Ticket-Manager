import { Typography } from "@mui/material";
import CustomerHeader from "renderer/components/CustomerHeader";
import { EventContext } from "renderer/context/Context";
import React, { useContext, useState } from "react";
import {useQuery} from "@tanstack/react-query";
import supabase from "renderer/utils/Supabase";

const SeatingChart = ({}) => {

    const {state, update} = useContext(EventContext);
    const [selectedEvent, updateSelectedEvent] = useState({});

    // Query the supabase for foreign key attributes
    const referenceForeinKeys = async () => {
        const {data: events, error} = await supabase
            .from('Events')
            .select('*, Organizations(organizationName), Venues(venueName)')
            .eq('eventID', state.selectedEvent.eventID)

        updateSelectedEvent(events[0]);
        return events;
    }

    const {status, data, error} = useQuery(['events'], referenceForeinKeys)

    if (status === 'loading') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    return (
        <>
        <CustomerHeader>
          <Typography>Seating Chart: {selectedEvent.eventName + ', ' + selectedEvent.Organizations?.organizationName + ', ' + selectedEvent.Venues?.venueName}</Typography>
        </CustomerHeader>
        </>
    )
}

export default SeatingChart;