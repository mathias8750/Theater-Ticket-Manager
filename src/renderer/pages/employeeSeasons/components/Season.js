import {Typography, Card, CardHeader, Button, Box} from "@mui/material";
import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import { eventDateTimeSubheader } from "renderer/utils/DateTime";
import { seasonDateTimeSubheader } from "renderer/utils/DateTime";
import supabase from "renderer/utils/Supabase";
import TicketHolderList from "./TicketHolderList";
import AddTicketHolderDialog from "./AddTicketHolderDialog";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "renderer/components/SnackbarAlert";

const Season = ({season}) => {

  const [ticketHolderList, setTicketHolderList] = useState([]);
  const [addTicketHolderDialogOpen, setAddTicketHolderDialogOpen] = useState(false);
  const [ticketHolderInfoAlertOpen, setTicketHolderInfoAlertOpen] = useState(false);
  const newTicketHolderName = useRef('');
  const newTicketHolderEmail = useRef('');
  const newTicketHolderPhone = useRef('');
  const navigate = useNavigate();


  const onAddButton = () => {
    toggleAddTicketHolderDialog();
  }

  const onTicketHolderClick = (ticketHolder) => {
    console.log("Name: " + ticketHolder.Customers.customerName);
  }

  const onSelectSeatsClick = () => {
    if (newTicketHolderName.current.value.trim() === '' || newTicketHolderEmail.current.value.trim() === '' || newTicketHolderPhone.current.value.trim() === '') {
      toggleTicketHolderInfoAlert();
    } else {
      navigate("/employee/home/seasons/seat-selector", {state: {season: season, name: newTicketHolderName.current.value.trim(), email: newTicketHolderEmail.current.value.trim(), phone: newTicketHolderPhone.current.value.trim()}});
    }
  }

  const fetchTicketHolders = async() => {
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

  useEffect(() => {
    fetchTicketHolders();
  }, [season]);

  const {status, data, error} = useQuery(['ticketHolders'], fetchTicketHolders);

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  const toggleAddTicketHolderDialog = () => {
    setAddTicketHolderDialogOpen(!addTicketHolderDialogOpen);
  }

  const toggleTicketHolderInfoAlert = () => {
    setTicketHolderInfoAlertOpen(!ticketHolderInfoAlertOpen);
  }

  return (
    <>
      <div style={{height: '100%', width: '100%'}}>
      <Card>
        <CardHeader
          title={season.seasonName}
          subheader={seasonDateTimeSubheader(season)}
        />
      </Card>
        <div style={{height: '100%'}}>
          <div
            style={{
              display: 'flex',
              height: '50%',
              paddingTop: '2%',
              justifyContent: 'center',
          }}>
            <TicketHolderList ticketHolders={ticketHolderList} onTicketHolderClick={onTicketHolderClick} />
          </div>
          <div style={{display: 'flex', paddingTop: '2%', justifyContent: 'center'}}>
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
          nameRef={newTicketHolderName}
          emailRef={newTicketHolderEmail}
          phoneRef={newTicketHolderPhone}
          onSelectSeatsClick={onSelectSeatsClick}
        />
        <SnackbarAlert 
          alertOpen={ticketHolderInfoAlertOpen} 
          toggleAlert={toggleTicketHolderInfoAlert}
          alertSeverity={'error'}
          alertText={'All fields required'}
        />
      </div>
    </>
  )
}

export default Season;
