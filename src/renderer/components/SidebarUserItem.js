import {Button, Card, CardHeader } from "@mui/material";

// User item for scrollable list on admin page
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
