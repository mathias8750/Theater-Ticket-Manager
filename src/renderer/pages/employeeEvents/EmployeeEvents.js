import {Box, Card, CardContent, Grid, Typography, Button} from "@mui/material";
import ScrollableSidebar from "../../components/ScrollableSidebar";
import {Link as NavLink} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader"; 
import supabase from "../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

const EmployeeEvents = ({event}) => {

    return (
        <>
          <EmployeeHeader/>
          
          
        </>
      )
}

export default EmployeeEvents;