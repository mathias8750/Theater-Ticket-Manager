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

// Organization Context
export const OrganizationContext = createContext({});
const reducer = (state, pair) => ({...state, ...pair});
const initialState = {
    selectedOrg: {organizationID: 0, organizationName: "defaultname", organizationEmail: "defaultemail"}
}
export function OrganizationProvider(props){
    const [state, update] = useReducer(reducer, initialState)

    return (
        <OrganizationContext.Provider value={{state, update}}>
            {props.children}
        </OrganizationContext.Provider>
    )
}

// Employee account Context
export const UserContext = createContext({});
const userReducer = (state, pair) => ({...state, ...pair});
const userInitialState = {
    selectedUser: {username: "defaultusername", password: "defaultpassword"}
}
export function UserProvider(props){
    const [state, update] = useReducer(userReducer, userInitialState)

    return (
        <UserContext.Provider value={{state, update}}>
            {props.children}
        </UserContext.Provider>
    )
}
