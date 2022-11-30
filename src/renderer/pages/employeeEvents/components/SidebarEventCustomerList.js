import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Typography,
  Grid,
  TextField,
  Input
} from "@mui/material";
import {Download} from "@mui/icons-material";
import { CSVLink, CSVDownload } from "react-csv";
import { formatAMPM } from "renderer/utils/DateTime";
import CustomerListItem from "./CustomerListItem";
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const SidebarEventCustomerList = ({event, tickets, customers, onCustomerClick}) => {

  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchableCustomers, setSearchableCustomers] = useState(customers)

  useEffect(() => {
    setSearchableCustomers(customers)
  }, [customers])

  const searchCustomers = (inputCustomer) => {
    setSearchInput(inputCustomer.target.value)
    if (inputCustomer.target.value === '') {
      setSearchableCustomers(customers)
    } else {
      let tempCustomers = []

      customers.map((customer) => {
        if ((customer.customerName.toLowerCase()).includes(inputCustomer.target.value.toLowerCase())) {
          tempCustomers.push(customer)
        }
      })

      setSearchableCustomers(tempCustomers)

    }
  }

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
            <Grid container>
              <Grid item>
                {open ? (
                  <Paper style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <div style={{
                      margin: "auto 16px",
                    }}>
                      <Input
                        value={searchInput}
                        onChange={searchCustomers}
                        disableUnderline={true}
                        placeholder={'Search'}
                        autoFocus={true}
                      >
                      </Input>
                    </div>
                    <IconButton
                      onClick={(event) => {
                        event.target.value = ''
                        searchCustomers(event)
                        setOpen(false)
                      }}
                    >
                      <CancelIcon/>
                    </IconButton>
                  </Paper>
                ) : (
                  <IconButton
                    onClick={() => setOpen(true)}
                  >
                    <SearchIcon/>
                  </IconButton>

                )}
              </Grid>
              <Grid item>
                <CSVLink data={generateTicketAssignmentObjects()} filename={'ticketassignments_' + event.eventName + '.csv'}>
                  <IconButton>
                    <Download/>
                  </IconButton>
                </CSVLink>
              </Grid>
            </Grid>

          }
        />
        <Divider/>
        <CardContent style={{ height: '100%' }}>
          <div style={{ height: '100%', maxHeight: '80%', width: '100%', overflow: 'auto'}}>
            <div style={{ height: '100%', overflow: 'auto'}}>
              {searchableCustomers.map((ticket) => {
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
