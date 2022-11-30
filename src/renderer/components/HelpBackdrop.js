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
*/
const messages = [
    <p>View a list of upcoming events <hr></hr> Select "view" to see more information</p>, 
    <p>View all events sorted by date <hr></hr> Select "view" to see seating and purchase information <hr></hr> Seats can be selected by ID or from the seating chart</p> , 
    <p>Login in via employee credentials to access management features</p> , 
    <p>Select an Organization to manage <hr></hr> or, create a new Organization</p>, 
    <p>Click "Create/Manage Events" to handle event management.<hr></hr>Click "Create/Manage Org Seasons" to handle seasons management.<hr></hr>Click "Organization Settings" to change organization details.</p>, 
    <p>Click "View" from any of the events provided to see information on venues chosen, ticket prices, and customers.<hr></hr>Click "Create Event" to create a new event to be hosted by the organization.</p> , 
    <p>Manage or create Seasons <hr></hr>Add Season Ticket Holders</p>, 
    <p>Update Organization settings <hr></hr> Delete the selected Organization</p>
];

//var messageID = 1;


/*
const setMessage = ({ID}) => {
    messageID = ID
}
*/
//{location.pathname}

const HelpBackdrop = ({open, setOpen, helpID}) => {

    const location = useLocation();
    const [messageID, setMessageID] = useState(2);

    

    var message = messages[helpID];
    //const message = "Employee Home Page"

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
