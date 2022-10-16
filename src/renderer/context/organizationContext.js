/*
    OrganizationContext.js

    This file creates a react context so the selected org
    can be accessed at any point in the program. To access:

    const {state} = useContext(OrganizationContext);
                    then
    state.selectedOrg provides the organization object

    NOTE: must use following imports:

    import {OrganizationContext} from "renderer/context/OrganizationContext";
    import {useContext} from "react";
*/

import React, {createContext, useReducer} from 'react';

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