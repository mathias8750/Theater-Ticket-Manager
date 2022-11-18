/*
    SeatRecommender.js

    This file contains functions for seat recommendations
    on the customer events screen.

*/


// Function to find numSeats consecutive unsold seats in a row
const findConsecutiveSeats = (tickets, numSeats) => {
    let arr = [];
    let validResult = false;
      if (numSeats === 1) {                       // find 1 seat
        for (let i = 0; i < tickets.length; i++) {
          if (tickets[i].soldBool === false) {
            validResult = true;
            arr.push(tickets[i]);
            break;
          }
        }
      } else {                                    // find numSeats consecutive seats
        if (tickets.length >= numSeats) {
          let tickets_sorted = tickets.sort((a,b) => (a.seatNumber > b.seatNumber) ? 1 : -1);
          let consecutiveSeats = [];
          for (let i = 0; i < tickets_sorted.length; i++) {
            if (tickets_sorted[i].soldBool === false) {
              consecutiveSeats.push(tickets_sorted[i]);
              if (consecutiveSeats.length === numSeats) {
                validResult = true;
                arr = consecutiveSeats;
                break;
              }
            } else {
            consecutiveSeats = [];
          }
        }
      }
    }
    
    // return bool for if seats were found, array of seats data
    return {resultValid: validResult, resultData: arr}; 
  }

// Function to recommend seats for a specific event
export const recommendSeats = (ticketList, ticketNum, eventLocation) => {

    let arr = [];
    let seats = {};

    // TODO: recommend seats for concert hall
    if (eventLocation === 1) {

      // Recommend one set of seats from each section
      for (let i = 0; i < 2; i++) {
        let tickets = ticketList.filter(obj => {
            switch (i) {
                case 0:
                    return obj.sectionNumber === 'S1';
                case 1:
                    return obj.sectionNumber === 'S2';
                default:
                  break;
            }
        });

        // Get consecutive seats in row if they exist
        for (let row = 'A'.charCodeAt(0); row <= 'Z'.charCodeAt(0); row++) {
          let tickets_sample = tickets.filter(ticket => {return ticket.rowNumber === String.fromCharCode(row)})
          seats = findConsecutiveSeats(tickets_sample, ticketNum);

          // consecutive seats exist; add them to the array and stop looking in this section
          if (seats.resultValid) {
            arr.push({result: seats.resultData, section: tickets_sample[0].sectionNumber});
            break;
          }
        }
      }

      // Recommend one set of seats from each balcony section
      for (let i = 0; i < 5; i++) {
        let tickets = ticketList.filter(obj => {
            switch (i) {
                case 0:
                    return obj.sectionNumber === 'B1';
                case 1:
                    return obj.sectionNumber === 'B2';
                case 2:
                    return obj.sectionNumber === 'B3';
                case 3:
                    return obj.sectionNumber === 'B4';
                case 4:
                    return obj.sectionNumber === 'B5';
                default:
                    break;
            }
        });

        // Get consecutive seats in row if they exist
        for (let row = 'A'.charCodeAt(0); row <= 'L'.charCodeAt(0); row++) {
          let tickets_sample = tickets.filter(ticket => {return ticket.rowNumber === String.fromCharCode(row)});
          seats = findConsecutiveSeats(tickets_sample, ticketNum);

          // consecutive seats exist; add them to the array and stop looking in this section
          if (seats.resultValid) {
            arr.push({result: seats.resultData, section: tickets_sample[0].sectionNumber});
            break;
          }
        }
      }
    }

    // Recommend seats for Playhouse
    if (eventLocation === 2) {

      // Recommend one set of seats from each section
      for (let i = 0; i < 4; i++) {
        let tickets = ticketList.filter(obj => {
            switch (i) {
                case 0:
                    return obj.sectionNumber === 'S1';
                case 1:
                    return obj.sectionNumber === 'S2';
                case 2:
                    return obj.sectionNumber === 'S3';
                case 3:
                    return obj.sectionNumber === 'S4';
                default:
                    break;
            }
        });

        // Get consecutive seats in row if they exist
        for (let row = 'A'.charCodeAt(0); row <= 'G'.charCodeAt(0); row++) {
          let tickets_sample = tickets.filter(ticket => {return ticket.rowNumber === String.fromCharCode(row)})
          seats = findConsecutiveSeats(tickets_sample, ticketNum);

          // consecutive seats exist; add them to the array and stop looking in this section
          if (seats.resultValid) {
            arr.push({result: seats.resultData, section: tickets_sample[0].sectionNumber});
            break;
          }
        }
      }

      // Recommend one set of seats from each loge
      for (let i = 0; i < 4; i++) {
        let tickets = ticketList.filter(obj => {
            switch (i) {
                case 0:
                    return obj.sectionNumber === 'L1';
                case 1:
                    return obj.sectionNumber === 'L2';
                case 2:
                    return obj.sectionNumber === 'L3';
                case 3:
                    return obj.sectionNumber === 'L4';
                default:
                    break;
            }
        });

        // Get consecutive seats in row if they exist
        for (let row = 'A'.charCodeAt(0); row <= 'C'.charCodeAt(0); row++) {
          let tickets_sample = tickets.filter(ticket => {return ticket.rowNumber === String.fromCharCode(row)})
          seats = findConsecutiveSeats(tickets_sample, ticketNum);

          // consecutive seats exist; add them to the array and stop looking in this loge
          if (seats.resultValid) {
            arr.push({result: seats.resultData, section: tickets_sample[0].sectionNumber});
            break;
          }
        }
      }
    }
    
    return arr;
}