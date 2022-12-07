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
export const eventDateTimeSubheader = (event) => {
    const date = new Date(event.eventDateTime);
    return (<ul><li>{event.Organizations.organizationName}</li><li>{event.Venues.venueName}</li><li>{date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + formatAMPM(date)}</li></ul>);
}

export const seasonDateTimeSubheader = (season) => {
  const startDate = new Date(season.startDate);
  const endDate = new Date(season.endDate);

  return ((startDate.getMonth()+1) + '/' + startDate.getDate() + '/' + startDate.getFullYear() + '  ' + formatAMPM(startDate) + ' to ' + (endDate.getMonth()+1) + '/' + endDate.getDate() + '/' + endDate.getFullYear() + '  ' + formatAMPM(endDate));
}

// Compares the datetime of two event objects; used as argument for array.sort() function
export const compareDateTime = (a,b) => {
    let aDateTime = new Date(a.eventDateTime);
    let bDateTime = new Date(b.eventDateTime);

    if (aDateTime > bDateTime) {
      return 1;
    } else {
      return -1;
    }
  }

export const compareDateTimeSeason = (a,b) => {
  let aDateTime = new Date(a.startDate);
  let bDateTime = new Date(b.startDate);

  if (aDateTime > bDateTime) {
    return 1;
  } else {
    return -1;
  }
}
