import { Backdrop } from "@mui/material";
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

const HelpBackdrop = ({open, setOpen}) => {

    const location = useLocation();

    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={e => {setOpen(!open)}}
        >
           {location.pathname} Help Overlay
        </Backdrop>
    );
}

export default HelpBackdrop;
