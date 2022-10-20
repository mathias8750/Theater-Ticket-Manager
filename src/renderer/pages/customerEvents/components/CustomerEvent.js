import {Typography, Card, CardHeader, Button, Box} from "@mui/material";
import React, {useState} from 'react';
import { formatAMPM } from "renderer/utils/DateTime";

const CustomerEvent = ({event}) => {

  const date = new Date(event.eventDateTime);

  const onTicketSelectButton = () => {

  }

  return (
    <>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={event.Organizations.organizationName + " - " + (date.getMonth()+1).toString() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}
        />
      </Card>
        <Box style={{display: 'flex'}}>
          <div style={{paddingTop: '57%', paddingBottom: '10%', paddingLeft: '45%'}}>
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
