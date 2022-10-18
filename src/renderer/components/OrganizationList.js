import {FormControl, InputLabel, Select, MenuItem, Button} from "@mui/material";
import React, {Component, useContext, useState} from "react";
import {createHistory} from 'react-router'
import {OrganizationContext} from "../context/OrganizationContext.js";
import supabase from "../utils/Supabase";
import {useQuery} from "@tanstack/react-query";

const OrganizationList = ({}) => {

    // Use react context to keep track of selected org throughout the program
    const {state, update} = useContext(OrganizationContext);
    const [selectedOrg, setSelectedOrg] = useState(null)
    const [counter, setCounter] = useState(0);

    // Get organizations from the supabase
    const getOrganizations = async () => {
        const {data: organizations} = await supabase.from("Organizations").select("*");
        update({selectedOrg: {organizationID: 0, organizationName: "defaultname", organizationEmail: "defaultemail"}});
        return organizations;
    };
    const {status, data, error} = useQuery(['orgs'], getOrganizations);

    // Display loading screen while loading data from supabase
    if (status === 'loading') {
        return <span>Loading...</span>
    }
    
    // Display error msg in case of query error
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    // Update selected org context with the org selected from the menu
    const handleChange = (e) => {
        setSelectedOrg(e.target.value);
        update({selectedOrg: e.target.value});
    }

    const refreshList = () => {
        setCounter(counter + 1);
    }



    return (
        <FormControl fullWidth>
                <InputLabel id="organization-select-label">Organization</InputLabel>
                <Select
                labelId="organization-select-label"
                id="organization-select"
                value={selectedOrg}
                label="Organization"
                defaultValue={""}
                onChange={handleChange}
                >
                {data.map((org, index) => {
                    return (<MenuItem key={index} value={org}>{org?.organizationName}</MenuItem>)
                })}
                </Select>
                    <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    size='small'
                    onClick={refreshList}
                    >
                     Refresh List
                    </Button>
        </FormControl>
        
        
    )
}

export default OrganizationList;
