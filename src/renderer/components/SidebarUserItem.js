import {Button, Card, CardHeader } from "@mui/material";

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
