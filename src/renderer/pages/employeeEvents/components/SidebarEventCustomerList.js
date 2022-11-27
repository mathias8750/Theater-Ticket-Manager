import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarEventCustomerList = ({ticket}) => {

  return (
    <>
        <Card>
          <CardHeader
              title={ticket.customerName}
              />
        </Card>
    </>
  )
}

export default SidebarEventCustomerList;