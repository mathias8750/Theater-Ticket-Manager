import {Button, Card, CardHeader, Typography} from "@mui/material";

const TicketHolder = ({ticketHolder, onTicketHolderClick}) => {

    return (
        <>
        <Card>
        <CardHeader
          title={ticketHolder.Customers.customerName}
          subheader={ticketHolder.Customers.customerEmail}
          action={
            <Button
              onClick={() => onTicketHolderClick(ticketHolder)}
            >View</Button>
          }
        />
      </Card>
        </>
    )
}

export default TicketHolder;