import { Dialog, DialogTitle, TextField, Button, Alert } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "renderer/components/SnackbarAlert";
import supabase from "renderer/utils/Supabase";
// List of imported libraries and components above

// Dialog that allows the user to edit the tickets supabase table
// by changing the price attribute of a ticket in the table
const EditPricesDialog = ({open, onClose, selectedSeats}) => {

  // States used in the page, with their respective updater functions
    const newPriceRef = useRef('');
    const navigate = useNavigate();
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    // Updates the prices of the specified seat ticket in the tickets table in supabase
    const supabaseUpdatePrices = async (seat) => {
        const {data: tickets, error} = await supabase
          .from('Tickets')
          .update({'priceValue': parseFloat(newPriceRef.current.value)})
          .eq('ticketID', seat.ticketID);

          // console log error message if the process didnn't work
        if (error) {
            console.log('supabase error');
        }
    }

    // Caller function for supabaseUpdatePrices for each seat selected by the user
    const updatePrices = () => {
        if ((newPriceRef.current.value >= 0) && (newPriceRef.current.value != '')) {
            for (let i = 0; i < selectedSeats.length; i++) {
                supabaseUpdatePrices(selectedSeats[i]);
            }
            toggleSuccessAlert();
        } else {
            toggleErrorAlert();
        }
    }


    // Toggle functions for each alert message
    const toggleErrorAlert = () => {
        setErrorOpen(!errorOpen);
    }

    const toggleSuccessAlert = () => {
        setSuccessOpen(!successOpen);
    }

    const onSuccessClose = () => {
        toggleSuccessAlert();
        navigate('/employee/home/events');
    }

    // Output to the screen, including the dialog box itself, the text box for the new prices, and the change prices button
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{paddingLeft: '25%'}}>Edit Prices</DialogTitle>
            <div
              style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '5%',
            }}>
              <TextField
                id='newEventPriceTextField'
                label='New Price'
                type={'number'}
                inputRef={newPriceRef}
              />
            </div>
            <div
              style={{
              display: 'flex',
              justifyContent: 'center',
              paddingRight: '2%',
              paddingLeft: '2%',
              paddingBottom: '5%',
            }}>
              <Button
                variant='contained'
                type='submit'
                color='primary'
                size='small'
                onClick={updatePrices}
              >
                Change Prices
              </Button>
            </div>
            <SnackbarAlert
              alertOpen={errorOpen}
              toggleAlert={toggleErrorAlert}
              alertSeverity={'error'}
              alertText={'Invalid price value'}
            />
            <Dialog open={successOpen} onClose={onSuccessClose}>
              <Alert severity={'success'}>
                Prices Updated
              </Alert>
            </Dialog>
        </Dialog>
    )
}

export default EditPricesDialog;