import { Backdrop } from "@mui/material";
import React, {useState} from 'react';

const HelpBackdrop = ({currentScreen, open, setOpen}) => {

    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={e => {setOpen(!open)}}
        >
           {currentScreen} Help Overlay
        </Backdrop>
    );
}

export default HelpBackdrop;