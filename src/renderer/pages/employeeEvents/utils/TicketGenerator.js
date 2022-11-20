/*
    TicketGenerator.js

    To generate set of tickets for an event,
    call the 'generateTickets(event)' function

*/

import { useState } from "react";
import { PlayhouseLoges, PlayhouseSections } from "renderer/data/PlayhouseSeatMapJson";
import { ConcertHallStageLevelSection, ConcertHallBalconyLevelSection } from "renderer/data/ConcerthallSeatMapJson";
import supabase from "renderer/utils/Supabase";

// add event, have event object, call generate events on that object
// Event org object
let eventOrg = {};

// Season ticket holders array
let seasonTicketHolders = [];


// Function to add array of tickets to the tickets table in supabase
const insertTickets = async (tickets) => {
    const {data, error} = await supabase
      .from('Tickets')
      .insert(tickets); 
}

// Function to get an event's organization object data from supabase
const fetchOrg = async (event) => {
    const {data, error} = await supabase
      .from('Organizations')
      .select('*')
      .eq('organizationID', event.organizationID)

    if (!error) {
        eventOrg = data[0];
    }
}

// Function to fetch season ticket holder data from supabase
const fetchSeasonTicketHolders = async() => {
    const {data, error} = await supabase
      .from('SeasonTicketHolders')
      .select('*');

    if (!error) {
        seasonTicketHolders = data;
    }
}

// Function to generate the initial tickets for an event and add them to the supabase
export const generateTickets = (event) => {

    // array of tickets to be added to the supabase
    const tickets = [];
    let count = 0;

    // get the org related to the event, then get the season ticket holders, then create tickets
    fetchOrg(event).then(() => {
        fetchSeasonTicketHolders().then(() => {

        // create tickets for concert hall
        if (event.venueID === 1) {

            // calculate diff used in seat price calculation
            let diff = (eventOrg.organizationMaxPrice - eventOrg.organizationMinPrice) / 37;
            
            // create tickets for stage-level sections
            Object.entries(ConcertHallStageLevelSection).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {

                            // if seat belongs to season ticket holder, mark it sold
                            let sold = false;
                            for (const ticketHolder in seasonTicketHolders) {
                                if (ticketHolder.seasonID === event.seasonID) {
                                    if ((ticketHolder.concertHallSeatNumber === seat[0]) && (ticketHolder.concertHallRowNumber === row[0]) && (ticketHolder.concertHallSectionNumber === section[0])) {
                                        sold = true;
                                    }
                                }
                            }

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMaxPrice - (((row[0].charCodeAt(0)-'A'.charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: sold, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, venueID: event.venueID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })

            // create tickets for balcony-level sections
            Object.entries(ConcertHallBalconyLevelSection).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {

                            // if seat belongs to season ticket holder, mark it sold
                            let sold = false;
                            for (const ticketHolder in seasonTicketHolders) {
                                if (ticketHolder.seasonID === event.seasonID) {
                                    if ((ticketHolder.concertHallSeatNumber === seat[0]) && (ticketHolder.concertHallRowNumber === row[0]) && (ticketHolder.concertHallSectionNumber === section[0])) {
                                        sold = true;
                                    }
                                }
                            }

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMinPrice + ((('L'.charCodeAt(0) - row[0].charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: sold, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, venueID: event.venueID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })
        }

        // create tickets for playhouse
        if (event.venueID === 2) {

            // calculate diff used in seat price calculation
            let diff = (eventOrg.organizationMaxPrice - eventOrg.organizationMinPrice) / 9;

            // create tickets for sections
            Object.entries(PlayhouseSections).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {

                            // if seat belongs to season ticket holder, mark it sold
                            let sold = false;
                            for (const ticketHolder in seasonTicketHolders) {
                                if (ticketHolder.seasonID === event.seasonID) {
                                    if ((ticketHolder.playhouseSeatNumber === seat[0]) && (ticketHolder.playhouseRowNumber === row[0]) && (ticketHolder.playhouseSectionNumber === section[0])) {
                                        sold = true;
                                    }
                                }
                            }

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMaxPrice - (((row[0].charCodeAt(0)-'A'.charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: sold, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, venueID: event.venueID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })

            // create tickets for loges
            Object.entries(PlayhouseLoges).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {

                            // if seat belongs to season ticket holder, mark it sold
                            let sold = false;
                            for (const ticketHolder in seasonTicketHolders) {
                                if (ticketHolder.seasonID === event.seasonID) {
                                    if ((ticketHolder.playhouseSeatNumber === seat[0]) && (ticketHolder.playhouseRowNumber === row[0]) && (ticketHolder.playhouseSectionNumber === section[0])) {
                                        sold = true;
                                    }
                                }
                            }

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMinPrice + ((('C'.charCodeAt(0) - row[0].charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: sold, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, venueID: event.venueID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })   
        }

        // insert the new tickets into the supabase
        insertTickets(tickets);

    });
    });
}
