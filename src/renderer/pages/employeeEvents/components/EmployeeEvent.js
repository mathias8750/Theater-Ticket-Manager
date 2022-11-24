import React, { useState } from 'react';
import { Typography } from '@mui/material';

const EmployeeEvent = ({event}) => {

    return (
        <Typography>{event.eventName}</Typography>
    )
}

export default EmployeeEvent;