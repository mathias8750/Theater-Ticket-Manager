/*
    TicketGenerator.js

    To generate set of tickets for an event,
    call the 'generateTickets(event)' function

    NOTE: Right now this still leaves the initial
          price for all the seats at $0.00, and
          it only works for events at the playhouse.

*/

import { PlayhouseLoges, PlayhouseSections } from "renderer/data/PlayhouseSeatMapJson";
import supabase from "renderer/utils/Supabase";
// add event, have event object, call generate events on that object
// Function to add array of tickets to the tickets table in supabase
const insertTickets = async (tickets) => {
    const {data, error} = await supabase
      .from('Tickets')
      .insert(tickets); 
} 

// Function to generate the initial tickets for an event and add them to the supabase
export const generateTickets = (event) => {

    // array of tickets to be added to the supabase
    const tickets = [];

    // create tickets for playhouse
    if (event.venueID === 2) {

        // create tickets for sections
        Object.entries(PlayhouseSections).map(section => {
            Object.entries(section[1]).map(row => {
                if(row[0] != 'data') {
                    Object.entries(row[1]).map(seat => {
                        // TODO: set default seat price here with seat[1].price
                        tickets.push({soldBool: false, priceValue: seat[1].price, eventID: event.eventID, seasonID: event.seasonID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: 'S' + section[0]});
                    })
                }
            })
        })

        // create tickets for loges
        Object.entries(PlayhouseLoges).map(section => {
            Object.entries(section[1]).map(row => {
                if(row[0] != 'data') {
                    Object.entries(row[1]).map(seat => {
                        // TODO: set default seat price here with seat[1].price
                        tickets.push({soldBool: false, priceValue: seat[1].price, eventID: event.eventID, seasonID: event.seasonID, seatNumber: seat[0], rowNumber: row[0], sectionNumber: 'L' + section[0]});
                    })
                }
            })
        })

    }

    // insert the new tickets into the supabase
    insertTickets(tickets);
}
