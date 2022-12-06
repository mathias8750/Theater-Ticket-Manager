import { Backdrop } from "@mui/material";
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import {Typography} from "@mui/material";

/*
Help messages legend
 0 - Customer Home
 1 - Customer Events
 2 - Employee Login
 3 - Organization Select
 4 - Employee Homepage
 5 - Employee Events
 6 - Employee Seasons
 7 - Employee Organizations
 8 - Ticket Selector
 9 - Ticket Checkout
10 - Admin Screen
11 - Ticket Price Editor
12 - Season Ticket Selector
13 - Season Ticket Finalization
14 - Ticket Exchanger
*/
// Array of messages, one for each page in the program
const messages = [
    // Customer home (helpID = 0)
    <p>List of closest upcoming events 
    <hr></hr>Click "view" to see event in events page
    <hr></hr>Click "see all events" to view the events page
    <hr></hr>Use the "home" and "events" buttons on the top-left for navigation
    <hr></hr>Use the "employee login" button on the top-right to access management features</p>, 

    // Customer events (helpID = 1)
    <p>Searchable list of all events displayed on left
    <hr></hr>Click "view" to see event information, recommended seats, and ticket purchase information
    <hr></hr>The number of consecutive seats to recommend can be selected in the dropbox
    <hr></hr>Click "purchase seats" in the recommended seats list to purchase the set of seats
    <hr></hr>Click "select tickets from chart" to pick seats from the seating chart</p>, 

    // Employee login (helpID = 2)
    <p>Login in via employee credentials to access management features
    <hr></hr>Login via admin credentials to access administrator features
    <hr></hr>Click "home" button on the top-left to return to customer home</p>,

    // Organization select (helpID = 3)
    <p>Select an Organization to manage from the list
    <hr></hr>Click "create new organization" to display entry fields to create new org
    <hr></hr>Click "home" button on the top-left to return to customer home
    <hr></hr>Click "logout" button on the top-right to return to employee login</p>,

    // Employee home (helpID = 4)
    <p>Click "Create/Manage Events" to navigate to event management screen
    <hr></hr>Click "Create/Manage Seasons" to navigate to season management screen
    <hr></hr>Click "Organization Settings" to navigate to organization settings screen
    <hr></hr>Click "logout" button on the top-right to return to employee login</p>,

    // Employee events (helpID = 5)
    <p>Searchable list of events within the organization displayed on left
    <hr></hr>Click "add event" to create a new event within the organization
    <hr></hr>Click "view" to see event and related customer information
    <hr></hr>Click the download icon above the customer list to download ticket assignment information
    <hr></hr>Click "exchange tickets" on a customer record to exchange the customer's tickets
    <hr></hr>Click "edit ticket prices" to edit the event's ticket prices, seat by seat
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,
    
    // Employee seasons (helpID = 6)
    <p>Searchable list of seasons within the organization displayed on the left
    <hr></hr>Click "create season" to create a new season within the organization
    <hr></hr>Click "view" to see season information and season ticket holders
    <hr></hr>Click the download icon above the ticket holder list to download season ticket holder information
    <hr></hr>Click "edit" on a ticket holder record to update season ticket holder information
    <hr></hr>Click "add season ticket holder" to begin the process for adding a season ticket holders
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,

    // Employee organizations (helpID = 7)
    <p>Organization specific settings displayed here
    <hr></hr>Change any or all of the fields displayed, then click "update settings" to update org settings
    <hr></hr>Click "delete organization" to delete the entire organization, including all related events, seasons, and ticket holders
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,

    // Ticket selector (helpID = 8)
    <p>Venue's seating chart displayed, with sold seats greyed out
    <hr></hr>Click on up to 6 availabe seats to select them
    <hr></hr>Selected seats will be displayed on left
    <hr></hr>Click "checkout" to proceed to checkout screen with selected seats
    <hr></hr>Use the "home" or "events" buttons on the top-left to leave this screen</p>,

    // Ticket checkout (helpID = 9)
    <p>Ticket checkout finalization
    <hr></hr>Enter name, valid email, valid phone number, then click "next"
    <hr></hr>Select payment type and fill out card information if necessary, then click "next"
    <hr></hr>Review order then click "place order" to purchase tickets
    <hr></hr>Use the "home" or "events" buttons on the top-left to leave this screen</p>,

    // Admin screen (helpID = 10)
    <p>Employee accounts listed
    <hr></hr>Click "delete user" to delete user account
    <hr></hr>Click "add employee account" to create new account
    <hr></hr>Use the "home" button on the top-left to return to customer home
    <hr></hr>Use the "logout" button on the top-right to return to employee login</p>,

    // Ticket price editor (helpID = 11)
    <p>Select seats whose price is to be changed from chart
    <hr></hr>Click "edit prices" to display price edit dialog
    <hr></hr>Enter new price into the field presented
    <hr></hr>Click "change prices" to update prices to newly entered price
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,

    // Season ticket selector (helpID = 12)
    <p>Use dropdown menu at top-left to switch between venues
    <hr></hr>Select an available seat from both venues
    <hr></hr>Click "finalize" button to continue to season ticket finalization
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,

    // Season ticket finalization (helpID = 13)
    <p>Review season ticket information
    <hr></hr>Select payment type from dropdown menu
    <hr></hr>Click "finalize" button to complete season ticket purchase
    <hr></hr>Click "cancel" button to cancel season ticket purchase and return to seasons screen
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,

    // Ticket exchanger (helpID = 14)
    <p>Currently purchased tickets listed at top-left
    <hr></hr>Select event to swap to from dropdown menu on left
    <hr></hr>Select new tickets to swap for from seating chart
    <hr></hr>Click "exchange" button to view final exchange information
    <hr></hr>Click "confirm" to exchange old tickets for new tickets
    <hr></hr>Click the "homepage" button on the top-left to return to employee home</p>,
];

// Help overlay used on each page
const HelpBackdrop = ({open, setOpen, helpID}) => {

    // location and message id
    const location = useLocation();
    const [messageID, setMessageID] = useState(2);

    // set selected message from the array
    var message = messages[helpID];
    
    // return components to display
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={e => {setOpen(!open)}}
        >
            <Typography variant="h6" align="center" style={{padding: '10px'}}>
                {message}
            </Typography>
        </Backdrop>
    );
}

export default HelpBackdrop;
