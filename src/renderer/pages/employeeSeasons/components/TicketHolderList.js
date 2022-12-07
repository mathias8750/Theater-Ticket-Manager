// Import libraries
import TicketHolder from "./TicketHolder";
import {Typography, Grid, Card, CardHeader, CardContent, Divider, IconButton, Input} from "@mui/material";
import {Download} from "@mui/icons-material";
import {CSVLink, CSVDownload} from "react-csv";
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

// Ticket holder list
const TicketHolderList = ({ticketHolders, onTicketHolderClick}) => {

  // Define constants
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchableTicketHolders, setSearchableTicketHolders] = useState(ticketHolders)

  useEffect(() => {
    setSearchableTicketHolders(ticketHolders)
  }, [ticketHolders])

  // Search for ticket holder
  const searchTicketHolders = (inputTicketHolder) => {
    setSearchInput(inputTicketHolder.target.value)
    if (inputTicketHolder.target.value === '') {
      setSearchableTicketHolders(ticketHolders)
    } else {
      let tempTicketHolders = []

      ticketHolders.map((ticketHolder) => {
        if ((ticketHolder.Customers.customerName.toLowerCase()).includes(inputTicketHolder.target.value.toLowerCase())) {
          tempTicketHolders.push(ticketHolder)
        }
      })

      setSearchableTicketHolders(tempTicketHolders)

    }
  }

  // Create ticket holder objects for display
  const generateTicketHolderObjects = () => {
    const ticketHolderObjects = []

    // Ticket holder information
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

  // Ticket holder list contents
  return (
    <Card style={{width: '100% '}}>
      <CardHeader
        title={'Season Ticket Holders'}
        titleTypographyProps={{variant: 'h6'}}
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
                      onChange={searchTicketHolders}
                      disableUnderline={true}
                      placeholder={'Search'}
                      autoFocus={true}
                    >
                    </Input>
                  </div>
                  <IconButton
                    onClick={(event) => {
                      event.target.value = ''
                      searchTicketHolders(event)
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
              <CSVLink data={generateTicketHolderObjects()} filename={'ticketholders.csv'}>
                <IconButton>
                  <Download/>
                </IconButton>
              </CSVLink>
            </Grid>
          </Grid>

        }
      />
      <Divider/>
      <CardContent style={{height: '100%'}}>
        <div style={{height: '100%', maxHeight: '80%', width: '100%', overflow: 'auto'}}>
          <div style={{height: '100%', overflow: 'auto'}}>
            {searchableTicketHolders.map((ticketHolder) => {
              return (
                <TicketHolder ticketHolder={ticketHolder} onTicketHolderClick={onTicketHolderClick}/>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketHolderList;
