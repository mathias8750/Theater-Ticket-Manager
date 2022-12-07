import {Typography, Card, CardHeader, Button, Box, CardContent, Divider} from "@mui/material";
import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {eventDateTimeSubheader} from "renderer/utils/DateTime";
import {seasonDateTimeSubheader} from "renderer/utils/DateTime";
import supabase from "renderer/utils/Supabase";
import TicketHolderList from "./TicketHolderList";
import AddTicketHolderDialog from "./AddTicketHolderDialog";
import {useNavigate} from "react-router-dom";
import SnackbarAlert from "renderer/components/SnackbarAlert";
import {matchIsValidTel} from "mui-tel-input";
import EditTicketHolderDialog from "./EditTicketHolderDialog";
import uniqid from "uniqid";

// Component for season object to be displayed on right of employee seasons screen
const Season = ({season}) => {

  // Use States for ticket holder list, dialog opens, and customer info
  const [ticketHolderList, setTicketHolderList] = useState([]);
  const [addTicketHolderDialogOpen, setAddTicketHolderDialogOpen] = useState(false);
  const [editTicketHolderDialogOpen, setEditTicketHolderDialogOpen] = useState(false)
  const [ticketHolderInfoAlertOpen, setTicketHolderInfoAlertOpen] = useState(false);
  const [newTicketHolderName, setNewTicketHolderName] = useState('');
  const [newTicketHolderEmail, setNewTicketHolderEmail] = useState('');
  const [newTicketHolderPhone, setNewTicketHolderPhone] = useState('');
  const [updatedTicketHolderName, setUpdatedTicketHolderName] = useState('')
  const [updatedTicketHolderEmail, setUpdatedTicketHolderEmail] = useState('')
  const [updatedTicketHolderPhone, setUpdatedTicketHolderPhone] = useState('')
  const [updatedTicketHolderID, setUpdatedTicketHolderID] = useState('')

  // Use states for updating ticket holder info
  const [update, setUpdate] = useState(false)
  const [updatedTicketHolderSuccessInfoAlertOpen, setUpdatedTicketHolderSuccessInfoAlertOpen] = useState(false)
  const [updatedTicketHolderErrorInfoAlertOpen, setUpdatedTicketHolderErrorInfoAlertOpen] = useState(false)

  // Navigation var
  const navigate = useNavigate();

  // event handler for add ticket holder button
  const onAddButton = () => {
    toggleAddTicketHolderDialog();
  }

  // event handler for updating ticket holder info
  const onTicketHolderClick = (ticketHolder) => {
    setUpdatedTicketHolderEmail(ticketHolder.Customers.customerEmail)
    setUpdatedTicketHolderName(ticketHolder.Customers.customerName)
    setUpdatedTicketHolderPhone(ticketHolder.Customers.customerPhone)
    setUpdatedTicketHolderID(ticketHolder.customerID)
    setEditTicketHolderDialogOpen(true)
  }

  // event handler for clicking select seats button
  const onSelectSeatsClick = () => {
    if (newTicketHolderName === '' || newTicketHolderEmail === '' || !matchIsValidTel(newTicketHolderPhone)) {
      toggleTicketHolderInfoAlert();
    } else {
      navigate("/employee/home/seasons/seat-selector", {
        state: {
          season: season,
          name: newTicketHolderName,
          email: newTicketHolderEmail,
          phone: newTicketHolderPhone,
          uniqueID: uniqid()
        }
      });
    }
  }

  // function to update ticket holder data in supabase
  const onUpdateTicketHolderClick = async () => {
    if (updatedTicketHolderName === '' || updatedTicketHolderEmail === '' || !matchIsValidTel(updatedTicketHolderPhone)) {
      toggleTicketHolderInfoAlert();
    } else {

      toggleEditTicketHolderDialog()

      const {data, error} = await supabase
        .from('Customers')
        .update({
          customerName: updatedTicketHolderName,
          customerEmail: updatedTicketHolderEmail,
          customerPhone: updatedTicketHolderPhone
        })
        .eq("customerID", updatedTicketHolderID)

      if (!error) {
        toggleUpdatedTicketHolderSuccessInfoAlert()
      } else {
        toggleUpdatedTicketHolderErrorInfoAlert()
      }

    }
  }

  // function to fetch season ticket holders from supabase
  const fetchTicketHolders = async () => {
    const {data: holders, error} = await supabase
      .from('SeasonTicketHolders')
      .select('*, Customers(customerName, customerEmail, customerPhone)')
      .eq('seasonID', season.seasonID);

    if (error) {
      console.log(error.msg);
    } else {
      setTicketHolderList(holders);
    }

    return holders;
  }

  // update ticket holder list when data is updated
  useEffect(() => {
    fetchTicketHolders();
  }, [season, update]);

  const {status, data, error} = useQuery(['ticketHolders'], fetchTicketHolders);

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // toggle functions for dialogs and alerts
  const toggleAddTicketHolderDialog = () => {
    setAddTicketHolderDialogOpen(!addTicketHolderDialogOpen);
  }

  const toggleEditTicketHolderDialog = () => {
    setEditTicketHolderDialogOpen(!editTicketHolderDialogOpen);
  }

  const toggleTicketHolderInfoAlert = () => {
    setTicketHolderInfoAlertOpen(!ticketHolderInfoAlertOpen);
  }

  const toggleUpdatedTicketHolderSuccessInfoAlert = () => {
    setUpdatedTicketHolderSuccessInfoAlertOpen(!updatedTicketHolderSuccessInfoAlertOpen)
    setUpdate(!update)
  }

  const toggleUpdatedTicketHolderErrorInfoAlert = () => {
    setUpdatedTicketHolderErrorInfoAlertOpen(!updatedTicketHolderErrorInfoAlertOpen)
  }

  // return components to display to screen
  return (
      <div style={{height: '100%', width: '100%'}}>
        <Card>
          <CardHeader
            title={season.seasonName}
            subheader={seasonDateTimeSubheader(season)}
          />
        </Card>
        <div style={{height: '100%' }}>
          <div
            style={{
              display: 'flex',
              height: '100%',
              paddingTop: '2%',
              justifyContent: 'center',
            }}>
            <TicketHolderList ticketHolders={ticketHolderList} onTicketHolderClick={onTicketHolderClick}/>
          </div>
          <div style={{display: 'flex', paddingTop: '5px', justifyContent: 'center'}}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='small'
              onClick={onAddButton}
            >
              Add Season Ticket Holder
            </Button>
          </div>
        </div>

        <AddTicketHolderDialog
          open={addTicketHolderDialogOpen}
          onClose={toggleAddTicketHolderDialog}
          name={newTicketHolderName}
          setName={setNewTicketHolderName}
          email={newTicketHolderEmail}
          setEmail={setNewTicketHolderEmail}
          phone={newTicketHolderPhone}
          setPhone={setNewTicketHolderPhone}
          onSelectSeatsClick={onSelectSeatsClick}
        />

        <EditTicketHolderDialog
          open={editTicketHolderDialogOpen}
          onClose={toggleEditTicketHolderDialog}
          name={updatedTicketHolderName}
          setName={setUpdatedTicketHolderName}
          email={updatedTicketHolderEmail}
          setEmail={setUpdatedTicketHolderEmail}
          phone={updatedTicketHolderPhone}
          setPhone={setUpdatedTicketHolderPhone}
          onUpdateTicketHolderClick={onUpdateTicketHolderClick}
        />

        <SnackbarAlert
          alertOpen={ticketHolderInfoAlertOpen}
          toggleAlert={toggleTicketHolderInfoAlert}
          alertSeverity={'error'}
          alertText={'All fields required'}
        />

        <SnackbarAlert
          alertOpen={updatedTicketHolderSuccessInfoAlertOpen}
          toggleAlert={toggleUpdatedTicketHolderSuccessInfoAlert}
          alertSeverity={'success'}
          alertText={'Updated Ticket Holder'}
        />

        <SnackbarAlert
          alertOpen={updatedTicketHolderErrorInfoAlertOpen}
          toggleAlert={toggleUpdatedTicketHolderErrorInfoAlert}
          alertSeverity={'error'}
          alertText={'Failed to update Ticket Holder'}
        />
      </div>
  )
}

export default Season;
