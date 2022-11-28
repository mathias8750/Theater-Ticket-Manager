/*
    TemporaryTickets.js

    This function creates an array of temporary
    tickets to populate seat selector for season
    ticket holders, only if season does not yet
    have events.

*/

import {useState} from "react";
import {PlayhouseLoges, PlayhouseSections} from "renderer/data/PlayhouseSeatMapJson";
import {ConcertHallStageLevelSection, ConcertHallBalconyLevelSection} from "renderer/data/ConcerthallSeatMapJson";
import supabase from "renderer/utils/Supabase";

let seasonTicketHolders = [];

// Function to fetch season ticket holder data from supabase
const fetchSeasonTicketHolders = async (seasonID) => {
  const {data, error} = await supabase
    .from('SeasonTicketHolders')
    .select('*')
    .eq('seasonID', seasonID)

  if (!error) {
    seasonTicketHolders = data;
  }
}

// Function to generate temporary set of tickets that won't be added to supabase
export const generateTempTickets = (venueID, seasonID) => {

  const tickets = [];

  console.time('generate')

  fetchSeasonTicketHolders(seasonID).then(() => {
    // create tickets for concert hall
    if (venueID === 1) {

      // create tickets for stage-level sections
      Object.entries(ConcertHallStageLevelSection).map(section => {
        Object.entries(section[1]).map(row => {
          if (row[0] !== 'data') {
            Object.entries(row[1]).map(seat => {

              // if seat belongs to season ticket holder, mark it sold
              let sold = false;
              for (let i = 0; i < seasonTicketHolders.length; i++) {
                if ((seasonTicketHolders[i].concertHallSeatNumber.toString() === seat[0]) && (seasonTicketHolders[i].concertHallRowNumber === row[0]) && (seasonTicketHolders[i].concertHallSectionNumber === section[0])) {
                  sold = true;
                }

              }

              tickets.push({
                soldBool: sold,
                priceValue: 0.0,
                eventID: 0,
                seasonID: 0,
                venueID: venueID,
                seatNumber: seat[0],
                rowNumber: row[0],
                sectionNumber: section[0]
              });
            })
          }
        })
      })

      // create tickets for balcony-level sections
      Object.entries(ConcertHallBalconyLevelSection).map(section => {
        Object.entries(section[1]).map(row => {
          if (row[0] !== 'data') {
            Object.entries(row[1]).map(seat => {

              // if seat belongs to season ticket holder, mark it sold
              let sold = false;
              for (let i = 0; i < seasonTicketHolders.length; i++) {
                if (seasonTicketHolders[i].seasonID === seasonID) {
                  if ((seasonTicketHolders[i].concertHallSeatNumber.toString() === seat[0]) && (seasonTicketHolders[i].concertHallRowNumber === row[0]) && (seasonTicketHolders[i].concertHallSectionNumber === section[0])) {
                    sold = true;
                  }
                }
              }

              tickets.push({
                soldBool: sold,
                priceValue: 0.0,
                eventID: 0,
                seasonID: 0,
                venueID: venueID,
                seatNumber: seat[0],
                rowNumber: row[0],
                sectionNumber: section[0]
              });
            })
          }
        })
      })
    }

    // create tickets for playhouse
    if (venueID === 2) {

      // create tickets for sections
      Object.entries(PlayhouseSections).map(section => {
        Object.entries(section[1]).map(row => {
          if (row[0] !== 'data') {
            Object.entries(row[1]).map(seat => {

              // if seat belongs to season ticket holder, mark it sold
              let sold = false;
              for (let i = 0; i < seasonTicketHolders.length; i++) {
                if ((seasonTicketHolders[i].playhouseSeatNumber.toString() === seat[0]) && (seasonTicketHolders[i].playhouseRowNumber === row[0]) && (seasonTicketHolders[i].playhouseSectionNumber === section[0])) {
                  sold = true;
                }
              }

              tickets.push({
                soldBool: sold,
                priceValue: 0.0,
                eventID: 0,
                seasonID: 0,
                venueID: venueID,
                seatNumber: seat[0],
                rowNumber: row[0],
                sectionNumber: section[0]
              });
            })
          }
        })
      })

      // create tickets for loges
      Object.entries(PlayhouseLoges).map(section => {
        Object.entries(section[1]).map(row => {
          if (row[0] !== 'data') {
            Object.entries(row[1]).map(seat => {

              // if seat belongs to season ticket holder, mark it sold
              let sold = false;
              for (let i = 0; i < seasonTicketHolders.length; i++) {
                if ((seasonTicketHolders[i].playhouseSeatNumber.toString() === seat[0]) && (seasonTicketHolders[i].playhouseRowNumber === row[0]) && (seasonTicketHolders[i].playhouseSectionNumber === section[0])) {
                  sold = true;
                }
              }

              tickets.push({
                soldBool: sold,
                priceValue: 0.0,
                eventID: 0,
                seasonID: 0,
                venueID: venueID,
                seatNumber: seat[0],
                rowNumber: row[0],
                sectionNumber: section[0]
              });
            })
          }
        })
      })
    }
  })

  console.timeEnd('generate')


  return tickets;
}
