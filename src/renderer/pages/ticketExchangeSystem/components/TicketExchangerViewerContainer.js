import supabase from "../../../utils/Supabase";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import TicketViewer from "../../ticketCheckoutSystem/components/TicketViewer";


const TicketExchangerViewerContainer = ({selectedEvent, setSelectedSeats, selectedSeats}) => {
  const [tickets, setTickets] = useState([])

  const fetchTickets = async () => {

    if (selectedEvent) {
      const { data: tickets } = await supabase
        .from('Tickets')
        .select('*')
        .eq('eventID', selectedEvent.eventID)

      return tickets
    }
  }

  const {status, error } = useQuery(['tickets'], fetchTickets, {onSuccess: (data) => {
      setTickets(data)
    }})

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span></span>
  }

  return (
    <>
      {selectedEvent ? (
        <TicketViewer
          key={selectedEvent.eventID}
          venue={selectedEvent.venueID}
          tickets={tickets}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          maxSeats={6}
        />
      ) : (
        <></>
      )}
    </>

  )
}

export default TicketExchangerViewerContainer;
