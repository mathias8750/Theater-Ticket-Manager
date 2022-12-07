import {Button, Card, CardHeader, Typography} from "@mui/material";

// Organization items contained in the org list on the org select screen
const OrganizationListItem = ({org, onOrgClick}) => {

  return (
    <>
      <Card>
        <CardHeader
          title={org.organizationName}
          action={
            <Button
              onClick={() => onOrgClick(org)}
            >Select</Button>
          }
        />
      </Card>
    </>
  )
}

export default OrganizationListItem;
