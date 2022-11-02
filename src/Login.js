/* eslint-disable prettier/prettier */
/**
=========================================================
* Cotton Technology - IT-OS - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// @mui material components

// Cotton Technology - IT-OS components

// @mui material components
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, Typography, CircularProgress } from "@mui/material/";

// Images
import Image from "login.png";

function Login() {
  return (
    <Box width="100vw" height="100%" minHeight="100vh">
      <Box
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "000000",
        }}
      >
        <Box px={1} width="100%" height="100vh" mx="auto">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              <Card>
                <Box m={4} p={4} textAlign="center" borderRadius="lg">
                  <Typography variant="h4" mb={5}>
                    Welcome !
                  </Typography>
                  <CircularProgress color="inherit" />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
