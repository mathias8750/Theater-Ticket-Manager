/*
    DateTime.js

    This file contains functions to process the date time format
    being used in the supabase.

*/

import React from 'react';

// Takes a date and returns a string with the time in AM/PM form
export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();    
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const strTime = `${hours}:${minutes} ${ampm}`;
  
    return strTime;
}

// Returns the event date/time/organization info to be printed as a card subheader
export const eventDateTimeSubheader = (date, event) => {
    return (event.Organizations.organizationName + " - " + (date.getMonth()+1).toString() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date));
}