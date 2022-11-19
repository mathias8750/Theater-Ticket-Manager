import {Typography, Card, CardHeader, Button, Box} from "@mui/material";
import React, {useState} from 'react';
import { eventDateTimeSubheader } from "renderer/utils/DateTime";
import { seasonDateTimeSubheader } from "renderer/utils/DateTime";

const Season = ({season}) => {

  //const date = new Date(event.eventDateTime);

  const onAddButton = () => {
    console.log('add season ticket holder');
  }

  return (
    <>
      <Card>
        <CardHeader
          title={season.seasonName}
          subheader={seasonDateTimeSubheader(season)}
        />
      </Card>
        <Box style={{display: 'flex'}}>
          <div style={{paddingTop: '50%', paddingBottom: '10%', paddingLeft: '45%'}}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='small'
              onClick={onAddButton}
            >
              Add Season Ticket Holder
            </Button>
          </div>
        </Box>
    </>
  )
}

export default Season;
