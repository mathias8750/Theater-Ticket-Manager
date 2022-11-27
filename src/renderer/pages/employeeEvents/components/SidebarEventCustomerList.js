import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarEventCustomerList = ({event, tickets}) => {

  return (
    <>
    {tickets.map((ticket) => {
        if (ticket.eventID == event.eventID) {
            <Card>
            <CardHeader
                title={ticket.customerID}
                subheader={ticket.customerName}
                />
            </Card>
        }
    })}
    </>
  )
}

export default SidebarEventCustomerList;