import {Button, Card, CardHeader, CardContent, Divider, IconButton, Typography, Grid} from "@mui/material";
import {Download} from "@mui/icons-material";
import { CSVLink, CSVDownload } from "react-csv";
import { formatAMPM } from "renderer/utils/DateTime";
import CustomerListItem from "./CustomerListItem";


const SidebarEventCustomerList = ({event, tickets, customers, onCustomerClick}) => {

  const generateTicketAssignmentObjects = () => {
    const ticketAssignmentObjects = []

    customers.map((customer) => {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].customerID === customer.customerID) {
          let temp = {
             "Ticket ID": tickets[i].ticketID,
             "Ticket Price": tickets[i].priceValue,
             "Section": tickets[i].sectionNumber,
             "Row": tickets[i].rowNumber,
             "Seat": tickets[i].seatNumber,
             "Customer Email": customer.customerEmail,
             "Customer Name": customer.customerName,
             "Customer Phone": customer.customerPhone,
             "Customer ID": customer.customerID,
             "Event Name": event.eventName,
             "Event ID": event.eventID,
             "Venue ID": event.venueID,
          }
    
          ticketAssignmentObjects.push(temp)
        }
      }
    })

    return ticketAssignmentObjects;
  }

  return (
    <Card style={{ width: '100% '}}>
      <CardHeader
          title={'Customers'}
          titleTypographyProps={{ variant: 'h6'}}
          action={
            <CSVLink data={generateTicketAssignmentObjects()} filename={'ticketassignments_' + event.eventName + '.csv'}>
              <IconButton>
                <Download/>
              </IconButton>
            </CSVLink>
          }
        />
        <Divider/>
        <CardContent>
          <div style={{ height: '100%', maxHeight: '800px', width: '100%', overflow: 'hidden'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {customers.map((ticket) => {
                return (
                  <CustomerListItem customer={ticket} onCustomerClick={onCustomerClick} />
                )
              })}
            </div>
          </div>
        </CardContent>
    </Card>     
  )
}

export default SidebarEventCustomerList;