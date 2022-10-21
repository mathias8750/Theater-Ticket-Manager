import {Typography, Card, CardHeader, Button, Box} from "@mui/material";
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { eventDateTimeSubheader } from "renderer/utils/DateTime";
import { EventContext } from "renderer/context/Context";


const CustomerEvent = ({event}) => {

  const date = new Date(event.eventDateTime);
  const {state, update} = useContext(EventContext);
  const navigate = useNavigate();

  const onTicketSelectButton = () => {
    update({selectedEvent: {eventID: event.eventID, organizationID: event.organizationID, venueID: event.venueID, seasonID: event.seasonID, eventDateTime: event.eventDateTime, eventName: event.eventName}, numTicekts: 5});
    navigate('/customer/events/chart');
  }

  return (
    <>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={eventDateTimeSubheader(date, event)}
        />
      </Card>
        <Box style={{display: 'flex'}}>
          <div style={{paddingTop: '50%', paddingBottom: '10%', paddingLeft: '45%'}}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='small'
              onClick={onTicketSelectButton}
            >
              Select Tickets
            </Button>
          </div>
        </Box>
    </>
  )
}

export default CustomerEvent;
