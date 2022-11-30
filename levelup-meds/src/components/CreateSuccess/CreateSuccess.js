import React from "react";
import styles from "./CreateSuccess.module.scss";
import {
  Typography,
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sizing } from "@mui/system";

export default function CreateSuccess() {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoHomepage = () => {
    navigate("/");
  };

  return (
    <div className={styles.CreateSuccess}>
      <Card sx={{ boxShadow: 15, margin: 2, maxWidth: 650, maxHeight: 650 }}>
        <CardContent>
          <List sx={{ justifyContent: "center" }}>
            <ListItem disablePadding>
              <Box sx={{ mx: "auto" }}>
                <Typography variant="h4">Account Created!</Typography>
              </Box>
            </ListItem>
            <Divider sx={{ m: 1 }} />
            <ListItem disablePadding>
              <Box sx={{ p: 1, m: "auto", justifyContent: "center" }}>
                <Button
                  sx={{ width: 250, padding: 1, m: 1 }}
                  variant="contained"
                  onClick={gotoLogin}
                >
                  Go To Login
                </Button>
                <Button
                  sx={{ width: 250, padding: 1, m: 1 }}
                  variant="contained"
                  onClick={gotoHomepage}
                >
                  Go To Homepage
                </Button>
              </Box>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

CreateSuccess.propTypes = {};

CreateSuccess.defaultProps = {};
