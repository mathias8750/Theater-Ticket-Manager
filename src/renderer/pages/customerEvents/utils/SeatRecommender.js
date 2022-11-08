/*
    SeatRecommender.js

    This file contains functions for seat recommendations
    on the customer events screen.

*/


// Function to find numSeats consecutive seats in a row
const findConsecutiveSeats = (tickets, numSeats, venue) => {
    let arr = [];
    let validResult = false;
    if (venue === 2) {
      if (numSeats === 1) {
        for (let i = 0; i < tickets.length; i++) {
          if (tickets[i].soldBool === false) {
            validResult = true;
            arr.push(tickets[i]);
            break;
          }
        }
      } else {
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
    }
    return {resultValid: validResult, resultData: arr}; 
  }

// Function to recommend seats for a specific event
export const recommendSeats = (ticketList, ticketNum, eventLocation) => {

    let arr = [];

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
        let tickets_a = tickets.filter((ticket) => {return ticket.rowNumber === 'A'});
        let seats = findConsecutiveSeats(tickets_a, ticketNum, eventLocation);
        if (seats.resultValid) {
        } else {
            let tickets_b = tickets.filter((ticket) => {return ticket.rowNumber === 'B'});
            seats = findConsecutiveSeats(tickets_b, ticketNum, eventLocation);
            if (seats.resultValid) {
            } else {
            let tickets_c = tickets.filter((ticket => {return ticket.rowNumber === 'C'}));
            seats = findConsecutiveSeats(tickets_c, ticketNum, eventLocation);
            if (seats.resultValid) {
            } else {
                let tickets_d = tickets.filter((ticket => {return ticket.rowNumber === 'D'}));
                seats = findConsecutiveSeats(tickets_d, ticketNum, eventLocation);
                if (seats.resultValid) {
                } else {
                let tickets_e = tickets.filter((ticket => {return ticket.rowNumber === 'E'}));
                seats = findConsecutiveSeats(tickets_e, ticketNum, eventLocation);
                if (seats.resultValid) {
                } else {
                    let tickets_f = tickets.filter((ticket => {return ticket.rowNumber === 'F'}));
                    seats = findConsecutiveSeats(tickets_f, ticketNum, eventLocation);
                    if (seats.resultValid) {
                    } else {
                    let tickets_g = tickets.filter((ticket => {return ticket.rowNumber === 'G'}));
                    seats = findConsecutiveSeats(tickets_g, ticketNum, eventLocation);
                    if (seats.resultValid) {
                    }
                    }
                }
                }
            }
            }
        }
        switch (i) {
            case 0:
                arr.push({result: seats.resultData, section: 'S1'});
                break;
            case 1:
                arr.push({result: seats.resultData, section: 'S2'});
                break;
            case 2:
                arr.push({result: seats.resultData, section: 'S3'});
                break;
            case 3:
                arr.push({result: seats.resultData, section: 'S4'});
                break;
            default:
                break;
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
        let tickets_a = tickets.filter((ticket) => {return ticket.rowNumber === 'A'});
        let seats = findConsecutiveSeats(tickets_a, ticketNum, eventLocation);
        if (seats.resultValid) {
        } else {
            let tickets_b = tickets.filter((ticket) => {return ticket.rowNumber === 'B'});
            seats = findConsecutiveSeats(tickets_b, ticketNum, eventLocation);
            if (seats.resultValid) {
            } else {
            let tickets_c = tickets.filter((ticket => {return ticket.rowNumber === 'C'}));
            seats = findConsecutiveSeats(tickets_c, ticketNum, eventLocation);
            if (seats.resultValid) {
            } 
          }
        }
        switch (i) {
            case 0:
                arr.push({result: seats.resultData, section: 'L1'});
                break;
            case 1:
                arr.push({result: seats.resultData, section: 'L2'});
                break;
            case 2:
                arr.push({result: seats.resultData, section: 'L3'});
                break;
            case 3:
                arr.push({result: seats.resultData, section: 'L4'});
                break;
            default:
                break;
        }
      }
    }
    return arr;
}