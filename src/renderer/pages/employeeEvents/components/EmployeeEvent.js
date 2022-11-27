import React, { useState } from 'react';
import { Typography, Button, Card, CardHeader} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerEvents from 'renderer/pages/customerEvents/CustomerEvents';
import supabase from 'renderer/utils/Supabase';
import {useQuery} from "@tanstack/react-query";
import SidebarEventCustomerList from './SidebarEventCustomerList';
import { eventDateTimeSubheader } from 'renderer/utils/DateTime';

const EmployeeEvent = ({event}) => {

    const navigate = useNavigate();
   
    const [eventCustomers, setEventCustomers] = useState([]);

    // exchange tickets here
    const onCustomerClick = (customer) => {
      console.log(customer.customerName);
    }

    const editPrices = () => {
        navigate("/employee/home/events/ticket-price-manager", {state: event});
    }

    const fetchTickets = async () => {
      let {data: tickets, error} = await supabase
        .from('Tickets')
        .select('*, Customers(customerName, customerEmail, customerPhone)')
        .eq('eventID', event.eventID);


      let tickets_sorted = [];
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].customerID != null) {
          tickets_sorted.push(tickets[i]);
        }
      }
      let customerIDList = [];
      let customerList = [];
      for (let i = 0; i < tickets_sorted.length; i++) {
        if (!customerIDList.includes(tickets_sorted[i].customerID)) {
          customerIDList.push(tickets_sorted[i].customerID);
          customerList.push({customerID: tickets_sorted[i].customerID,
                             customerName: tickets_sorted[i].Customers.customerName,
                             customerPhone: tickets_sorted[i].Customers.customerPhone,
                             customerEmail: tickets_sorted[i].Customers.customerEmail
                            });
        }
      }
      setEventCustomers(customerList);
      return tickets;
    }

    const {status, data, error} = useQuery(['tickets'], fetchTickets)

    if (status === 'loading') {
      return <span>Loading...</span>
    }

    if (status === 'error') {
      return <span>Error: {error.message}</span>
    }

    return (
      <div style={{height: '100%', width: '100%'}}>
      <Card>
        <CardHeader
          title={event.eventName}
          subheader={eventDateTimeSubheader(event)}
        />
      </Card>
      <div style={{height: '100%'}}>
      <div style={{display: 'flex', paddingTop: '2%'}}>
        <Typography>Customers:</Typography>
      </div>
          <div
            style={{
              display: 'flex',
              height: '50%',
              paddingTop: '2%',
              justifyContent: 'center',
          }}>
            <SidebarEventCustomerList customers={eventCustomers} onCustomerClick={onCustomerClick}/>
          </div>
        <div style={{display: 'flex', paddingTop: '2%', justifyContent: 'center'}}>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          size='small'
          onClick={editPrices}
        >
          Edit Ticket Prices
        </Button>
        </div>
        </div>
        </div>
    )
}

export default EmployeeEvent;