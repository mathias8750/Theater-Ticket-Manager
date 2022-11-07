import {Typography, Card, CardHeader, Button, Box} from "@mui/material";
import React, {useState} from 'react';
import { eventDateTimeSubheader } from "renderer/utils/DateTime";
import {useNavigate} from "react-router-dom";

const CustomerEvent = ({event}) => {

  const date = new Date(event.eventDateTime);

  let navigate = useNavigate();

  const onTicketSelectButton = () => {
    navigate("/customer/events/seat-viewer", {state: event})
  }

  return (
    <>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={eventDateTimeSubheader(event)}
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
