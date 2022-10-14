import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import React, {Component} from "react";
import supabase from "./Supabase.js"
import organizationContext from "../context/organizationContext.js";

class OrganizationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [""],
            selectedValue: "",
        };
    }

    componentDidMount() {
        const getOrganizations = async () => {
            let {data: orgs, error} = await supabase.from("Organizations").select("*");
            this.setState({organizations: orgs});
        };
        getOrganizations();

    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value});
        return (
            <organizationContext.Provider value={e.target.value}></organizationContext.Provider>
        )
    }

    render() {

        return (
            <FormControl fullWidth>
                <InputLabel id="organization-select-label">Organization</InputLabel>
                <Select
                labelId="organization-select-label"
                id="organization-select"
                value={this.state.selectedValue}
                label="Organization"
                defaultValue={""}
                onChange={this.handleChange}
                >
                {this.state.organizations.map((org, index) => {
                    return (<MenuItem key={index} value={org}>{org?.organizationName}</MenuItem>)
                })}
                </Select>
            </FormControl>
        )
    }
}

export default OrganizationList;