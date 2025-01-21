import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import useStore from "lib/stores";
import { useBootstrap } from "lib/hooks";
import { OrganizationSearch, StaffSearch } from "components/Home";

const App = () => {
  useBootstrap();

  const {
    selectedOrganization,
    selectedStaff,
    setSelectedOrganization,
    setSelectedStaff,
  } = useStore();

  return (
    <Paper
      sx={{
        padding: 3,
        margin: 3,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ marginBottom: 4 }}>
        Node React AWS
      </Typography>

      <Stack spacing={4}>
        <OrganizationSearch
          disableClearable
          orgId={selectedOrganization?.id}
          onSelect={(organization) =>
            organization && setSelectedOrganization(organization)
          }
        />
        <StaffSearch
          disableClearable
          staffId={selectedStaff?.id}
          onSelect={(staff) => staff && setSelectedStaff(staff)}
        />
      </Stack>
    </Paper>
  );
};

export default App;
