import {Button, Card, CardHeader, Typography} from "@mui/material";
// List of imported libraries and components above

const CustomerListItem = ({customer, onCustomerClick}) => {

  // Outputs the customer information including name, email, and an option to exchange bought tickets with other seats
    return (
        <>
        <Card>
        <CardHeader
          title={customer.customerName}
          subheader={customer.customerEmail}
          action={
            <Button
              onClick={() => onCustomerClick(customer)}
            >Exchange Tickets</Button>
          }
        />
      </Card>
        </>
    )
}

export default CustomerListItem;