import React, { useEffect, useState } from "react";
import BusesEstacionResumen from "./BusesEstacionResumen";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "./../../redux/actions";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CargasMarquesinas from "./CargasMarquesinas";
import MovilizadorMarquesinas from "./MovilizadorMarquesinas";

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

const Movilizador = ({ getAccessPage, auth }) => {
  useEffect(() => {
    getAccessPage();
    document.title = "SGDC - Bomberos";
  }, []);

  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
      <Box className="box-initial">
        <Box style={{ padding: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              >
                <Box>
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
                        <Tab
                          label={`Marquesinas - ${
                            auth.userData && auth.userData.terminal.nombre
                          }`}
                          {...a11yProps(0)}
                        />
                        <Tab label="Detalle General" {...a11yProps(1)} />
                      </Tabs>
                    </Grid2>
                    <Grid2 md={12} xs={12}>
                      <TabPanel value={currentPage} index={0}>
                        <MovilizadorMarquesinas />
                      </TabPanel>
                      <TabPanel value={currentPage} index={1}>
                        <BusesEstacionResumen />
                      </TabPanel>
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getAccessPage })(Movilizador);
