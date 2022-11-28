import TicketHolder from "./TicketHolder";
import {Typography, Grid, Card, CardHeader, CardContent, Divider, IconButton} from "@mui/material";
import {Download} from "@mui/icons-material";
import { CSVLink, CSVDownload } from "react-csv";
import {useState} from "react";


const TicketHolderList = ({ticketHolders, onTicketHolderClick}) => {

  const generateTicketHolderObjects = () => {
    const ticketHolderObjects = []

    ticketHolders.map((ticketHolder) => {
      let temp = {
        "Customer Email": ticketHolder.Customers.customerEmail,
        "Customer Name": ticketHolder.Customers.customerName,
        "Customer Phone": ticketHolder.Customers.customerPhone,
        "Concert Hall Row": ticketHolder.concertHallRowNumber,
        "Concert Hall Seat": ticketHolder.concertHallSeatNumber,
        "Concert Hall Section": ticketHolder.concertHallSectionNumber,
        "Customer ID": ticketHolder.customerID,
        "Playhouse Row": ticketHolder.playhouseRowNumber,
        "Playhouse Seat": ticketHolder.playhouseSeatNumber,
        "Playhouse Section": ticketHolder.playhouseSectionNumber,
        "Season ID": ticketHolder.seasonID,
        "Season Ticket Holder ID": ticketHolder.seasonTicketHolderID,
      }

      ticketHolderObjects.push(temp)
    })

    return ticketHolderObjects
  }

  return (
    <>
      <Card style={{ width: '100% '}}>
        <CardHeader
          title={'Season Ticket Holders'}
          titleTypographyProps={{ variant: 'h6'}}
          action={
            <CSVLink data={generateTicketHolderObjects()} filename={'ticketholders.csv'}>
              <IconButton>
                <Download/>
              </IconButton>
            </CSVLink>
          }
        />
        <Divider/>
        <CardContent>
          <div style={{height: '100%', maxHeight: '500px', width: '100%', overflow: 'auto'}}>
            <div style={{height: '100%', overflow: 'auto'}}>
              {ticketHolders.map((ticketHolder) => {
                return (
                  <TicketHolder ticketHolder={ticketHolder} onTicketHolderClick={onTicketHolderClick}/>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TicketHolderList;
