import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";

const PageHeader = ({ children, title }) => {
  return (
    <Container maxWidth={false} disableGutters sx={{ padding: 0, margin: 0 }}>
      <Box className="box-initial">
        <Box style={{ padding: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: 2, marginLeft: 2 }}>
              <Typography variant="h4" component="h4">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              >
                <Box>{children}</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default PageHeader;
