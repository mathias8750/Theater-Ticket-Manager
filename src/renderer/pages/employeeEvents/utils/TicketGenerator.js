/*
    TicketGenerator.js

    To generate set of tickets for an event,
    call the 'generateTickets(event)' function

    NOTE: Right now this only works for the playhouse,
          and it doesn't mark season ticket holders'
          seats as sold

*/

import { useState } from "react";
import { PlayhouseLoges, PlayhouseSections } from "renderer/data/PlayhouseSeatMapJson";
import supabase from "renderer/utils/Supabase";

// Event org object
let eventOrg = {};

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

// Function to generate the initial tickets for an event and add them to the supabase
export const generateTickets = (event) => {

    // array of tickets to be added to the supabase
    const tickets = [];

    // get the org related to the event, then create tickets
    fetchOrg(event).then(() => {

        // create tickets for playhouse
        if (event.venueID === 2) {

            // calculate diff used in seat price calculation
            let diff = (eventOrg.organizationMaxPrice - eventOrg.organizationMinPrice) / 9;

            // create tickets for sections
            Object.entries(PlayhouseSections).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {
                            // TODO: if seat belongs to season ticket holder, mark it sold

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMaxPrice - (((row[0].charCodeAt(0)-'A'.charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: false, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })

            // create tickets for loges
            Object.entries(PlayhouseLoges).map(section => {
                Object.entries(section[1]).map(row => {
                    if(row[0] != 'data') {
                        Object.entries(row[1]).map(seat => {
                            // TODO: if seat belongs to season ticket holder, mark it sold

                            // calculate default ticket price then push ticket to tickets array
                            let price = parseFloat((eventOrg.organizationMinPrice + ((('C'.charCodeAt(0) - row[0].charCodeAt(0))) * diff)).toFixed(2));
                            tickets.push({soldBool: false, priceValue: price, eventID: event.eventID, seasonID: event.seasonID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: section[0]});
                        })
                    }
                })
            })   
        }

        // TODO: create tickets for concert hall
        if (event.venueID === 1) {
            
        }

        // insert the new tickets into the supabase
        insertTickets(tickets);
    });
    // calculate ticket prices based on org's min and max default prices
    /*
    fetchOrg(event).then(() => {
        if (event.venueID === 2) {
            let diff = (eventOrg.organizationMaxPrice - eventOrg.organizationMinPrice) / 9;
            for (const ticket of tickets) {
                if (ticket.sectionNumber === 'S1' || ticket.sectionNumber === 'S2' || ticket.sectionNumber === 'S3' || ticket.sectionNumber === 'S4') {
                    for (let row = 'A'.charCodeAt(0); row <= 'G'.charCodeAt(0); row++) {
                        if (ticket.rowNumber.charCodeAt(0) === row) {
                            ticket.priceValue = parseFloat((eventOrg.organizationMaxPrice - (((row-'A'.charCodeAt(0))) * diff)).toFixed(2));
                        }
                    }
                }
                if (ticket.sectionNumber === 'L1' || ticket.sectionNumber === 'L2' || ticket.sectionNumber === 'L3' || ticket.sectionNumber === 'L4') {
                    for (let row = 'A'.charCodeAt(0); row <= 'C'.charCodeAt(0); row++) {
                        if (ticket.rowNumber.charCodeAt(0) === row) {
                            ticket.priceValue = parseFloat((eventOrg.organizationMaxPrice - (((row-'A'.charCodeAt(0))+7) * diff)).toFixed(2));
                        }
                    }
                }
            }
        }
        if (event.venueID === 1) {
            // TODO: calculate ticket prices for events at concert hall
        }

        // insert the new tickets into the supabase
        insertTickets(tickets);
    });
    */
}
