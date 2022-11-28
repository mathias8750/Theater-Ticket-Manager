import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarEventCustomerList = ({ticket}) => {

  return (
    <>
        <Card>
          <CardHeader
              title={ticket.Customers.customerName}
              />
        </Card>
    </>
  )
}

export default SidebarEventCustomerList;