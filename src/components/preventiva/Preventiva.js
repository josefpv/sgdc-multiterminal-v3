import React, { useState } from "react";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import NuevaPreventiva from "./NuevaPreventiva";
import EditaPreventiva from "./EditaPreventiva";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Preventiva = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
      <Grid2 container>
        <Grid2
          xs={12}
          md={12}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "#ffffff",
          }}
        >
          <Tabs
            value={currentPage}
            onChange={handleChangePage}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Nueva Preventiva" {...a11yProps(0)} />
            <Tab label="Preventivas" {...a11yProps(1)} />
          </Tabs>
        </Grid2>
        <Grid2 md={12} xs={12}>
          <TabPanel value={currentPage} index={0}>
            <NuevaPreventiva />
          </TabPanel>
          <TabPanel value={currentPage} index={1}>
            <EditaPreventiva />
          </TabPanel>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Preventiva;
