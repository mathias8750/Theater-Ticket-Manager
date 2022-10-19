import { Backdrop } from "@mui/material";
import React, {useState} from 'react';

const HelpBackdrop = ({currentScreen, open, setOpen}) => {

    //const [open, setOpen] = useState(false);

    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
        onClick={e => {setOpen(!open)}}
        >
            Help Overlay
        </Backdrop>
    );
}

export default HelpBackdrop;