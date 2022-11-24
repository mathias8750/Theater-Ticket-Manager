import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeEvent = ({event}) => {

    const navigate = useNavigate();

    const editPrices = () => {
        navigate("/employee/home/events/ticket-price-manager", {state: event});
    }

    return (
        <>
        <Typography>{event.eventName}</Typography>
        <div
        style={{
          display: 'flex',
          margin: 'auto',
        }}>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={editPrices}
        >
          Edit Ticket Prices
        </Button>
        </div>
        </>
    )
}

export default EmployeeEvent;