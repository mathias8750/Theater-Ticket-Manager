/*
    DateTime.js

    This file contains functions to process the date time format
    being used in the supabase.

*/

import React from 'react';

export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();    
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const strTime = `${hours}:${minutes} ${ampm}`;
  
    return strTime;
};