/*
    OrganizationContext.js

    This file creates a react context so the selected org
    can be accessed at any point in the program. To access:

    const {state} = useContext(OrganizationContext);
                    then
    state.selectedOrg provides the organization object

    NOTE: must use following imports:

    import {OrganizationContext} from "renderer/context/Context";
    import {useContext} from "react";
*/

import React, {createContext, useReducer} from 'react';

export const OrganizationContext = createContext({});
const orgReducer = (orgtSate, orgPair) => ({...orgState, ...orgPair});

const orgInitialState = {
    selectedOrg: {organizationID: 0, organizationName: "defaultname", organizationEmail: "defaultemail"}
}

export function OrganizationProvider(props) {
    const [state, update] = useReducer(orgReducer, orgInitialState)

    return (
        <OrganizationContext.Provider value={{state, update}}>
            {props.children}
        </OrganizationContext.Provider>
    )
}

export const EventContext = createContext({});
const reducer = (state, pair) => ({...state, ...pair});

const eventInitialState = {
    selectedEvent: {eventID: 0, organizationID: 0, venueID: 0, seasonID: 0, eventDateTime: 'NULL', eventName: 'NULL'},
    numTickets: 2
}

export function EventProvider(props) {
    const [state, update] = useReducer(reducer, eventInitialState)

    return (
        <EventContext.Provider value={{state, update}}>
            {props.children}
        </EventContext.Provider>
    )
}