import {Button, Card, CardHeader, Typography} from "@mui/material";
// List of imported libraries and components above

const CustomerListItem = ({customer, onCustomerClick}) => {

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