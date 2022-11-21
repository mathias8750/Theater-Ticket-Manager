import {useLocation} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";
import {Grid} from "@mui/material";
import TicketViewer from "../ticketCheckoutSystem/components/TicketViewer";
import {useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {OrganizationContext} from "../../context/Context";
import supabase from "../../utils/Supabase";
import TicketExchangerSidebar from "./components/TicketExchangerSidebar";
import TicketExchangerViewerContainer from "./components/TicketExchangerViewerContainer";
import FinalizeExchangeDialog from "./components/FinalizeExchangeDialog";


const TicketExchanger = () => {

  const location = useLocation()

  const [selectedEvent, setSelectedEvent] = useState(null)

  const customer = {
    customerID: 18,
    customerName: "Matt Goodwin",
    customerPhone: 2566162432,
    customerEmail: 'matt@example.com'
  }

  const originalEvent = {
    eventID: 81,
    organizationID: 155,
    venueID: 1,
    seasonID: null,
    eventDateTime: "Wed Jan 11 2023 14:30:00 GMT-0600 (Central Standard Time)",
    eventName: "Batman Begins"
  }

  const originalTickets = [
    {
      ticketID: 31765,
      soldBool: true,
      priceValue: 30,
      eventID: 81,
      seasonID: null,
      seatNumber: 1,
      rowNumber: "A",
      sectionNumber: "S1",
      seasonTicketHolderID: null,
      venueID: null,
      customerID: null,
    },
    {
      ticketID: 31766,
      soldBool: true,
      priceValue: 30,
      eventID: 81,
      seasonID: null,
      seatNumber: 2,
      rowNumber: "A",
      sectionNumber: "S1",
      seasonTicketHolderID: null,
      venueID: null,
      customerID: null,
    },
  ]

  const [selectedSeats, setSelectedSeats] = useState([])

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setSelectedEvent(null)
    setSelectedSeats([])
    setOpen(false)
  }

  return (
    <EmployeeHeader>
      <Grid container style={{height: '100%'}}>

        <TicketExchangerSidebar
          setSelectedEvent={setSelectedEvent}
          tickets={originalTickets}
          originalEvent={originalEvent}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          selectedEvent={selectedEvent}
          setOpen={setOpen}
        />

        <Grid item md={8}>
          <TicketExchangerViewerContainer
            key={selectedEvent ? selectedEvent.eventID : 0}
            selectedEvent={selectedEvent}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
          />
        </Grid>
      </Grid>

      <FinalizeExchangeDialog
        open={open}
        handleClose={handleClose}
        originalEvent={originalEvent}
        originalTickets={originalTickets}
        selectedEvent={selectedEvent}
        selectedTickets={selectedSeats}
        customer={customer}
      />
    </EmployeeHeader>
  )
}

export default TicketExchanger;
