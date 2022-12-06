import {useLocation} from "react-router-dom";
import EmployeeHeader from "../../components/EmployeeHeader";
import {Grid} from "@mui/material";
import {useState} from "react";
import TicketExchangerSidebar from "./components/TicketExchangerSidebar";
import TicketExchangerViewerContainer from "./components/TicketExchangerViewerContainer";
import FinalizeExchangeDialog from "./components/FinalizeExchangeDialog";


const TicketExchanger = () => {

  const location = useLocation()

  const [selectedEvent, setSelectedEvent] = useState(null)

  const [selectedSeats, setSelectedSeats] = useState([])

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setSelectedEvent(null)
    setSelectedSeats([])
    setOpen(false)
  }

  return (
    <EmployeeHeader helpID={14}>
      <Grid container style={{height: '100%'}}>

        <TicketExchangerSidebar
          setSelectedEvent={setSelectedEvent}
          tickets={location.state.originalTickets}
          originalEvent={location.state.originalEvent}
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
        originalEvent={location.state.originalEvent}
        originalTickets={location.state.originalTickets}
        selectedEvent={selectedEvent}
        selectedTickets={selectedSeats}
        customer={location.state.customer}
      />
    </EmployeeHeader>
  )
}

export default TicketExchanger;
