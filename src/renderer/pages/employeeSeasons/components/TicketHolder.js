import {Button, Card, CardHeader, Typography} from "@mui/material";

const TicketHolder = ({ticketHolder, onTicketHolderClick}) => {

  /*
  let seats_str = 'Seat(s): ';
  for (let i = 0; i < seats.result.length; i++) {
    seats_str = seats_str + seats.result[i].seatNumber + ', ';
  }
  seats_str = seats_str.substring(0, seats_str.length - 2)
  const subtitle = <ul><li>{'Row: ' + seats.result[0]?.rowNumber}</li><li>{seats_str}</li></ul>
  */

  return (
    <>
      <Card>
        <CardHeader
          title={ticketHolder.Customers.customerName}
          subheader={ticketHolder.Customers.customerEmail}
          action={
            <Button
              onClick={() => onTicketHolderClick(ticketHolder)}
            >Edit</Button>
          }
        />
      </Card>
    </>
  )
}

export default TicketHolder;
