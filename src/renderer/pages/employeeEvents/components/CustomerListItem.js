import {Button, Card, CardHeader, Typography} from "@mui/material";

const CustomerListItem = ({customer, onCustomerClick}) => {

    return (
        <>
        <Card>
        <CardHeader
          title={customer.Customers.customerName}
          subheader={customer.Customers.customerEmail}
          action={
            <Button
              onClick={() => onCustomerClick(customer)}
            >View</Button>
          }
        />
      </Card>
        </>
    )
}

export default CustomerListItem;