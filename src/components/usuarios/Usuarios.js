import React, { useEffect, useState } from "react";
//redux
import { connect } from "react-redux";
import { getAccessPage } from "./../../redux/actions";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import UsuariosLista from "./UsuariosLista";
import Usuario from "./Usuario";
import SolicitudesPendientes from "./SolicitudesPendientes";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { fetchPenddingUsers } from "./../../redux/actions/usuarios";

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

const Cargas = ({ penddingUsers, getAccessPage, fetchPenddingUsers }) => {
  useEffect(() => {
    getAccessPage();
    fetchPenddingUsers();
    document.title = "SGDC - Usuarios";
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
                        <Tab label="Usuarios" {...a11yProps(0)} />
                        <Tab label="Nuevo Usuario" {...a11yProps(1)} />
                        <Tab
                          icon={
                            penddingUsers && penddingUsers.length ? (
                              <NotificationsActiveIcon
                                sx={{ fontSize: 20 }}
                                color="secondary"
                              />
                            ) : null
                          }
                          iconPosition="end"
                          label="Solicitudes Pendientes"
                          {...a11yProps(2)}
                        />
                      </Tabs>
                    </Grid2>
                    <Grid2 md={12}>
                      <TabPanel value={currentPage} index={0}>
                        <UsuariosLista />
                      </TabPanel>
                      <TabPanel value={currentPage} index={1}>
                        <Usuario origen="nuevo" />
                      </TabPanel>
                      <TabPanel value={currentPage} index={2}>
                        <SolicitudesPendientes />
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
    penddingUsers: state.usuarios.penddingUsers,
  };
};

export default connect(mapStateToProps, { getAccessPage, fetchPenddingUsers })(
  Cargas
);
