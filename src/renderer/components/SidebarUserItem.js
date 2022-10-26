import {Button, Card, CardHeader, Typography} from "@mui/material";
import { formatAMPM } from "renderer/utils/DateTime";


const SidebarUserItem = ({user, onUserClick}) => {

  return (
    <>
      <Card>
        <CardHeader
          title={user.username}
          action={
            <Button
              onClick={() => onUserClick(user)}
            >Delete User</Button>
          }
        />
      </Card>
    </>
  )
}

export default SidebarUserItem;
