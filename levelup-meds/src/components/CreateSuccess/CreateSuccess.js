import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateSuccess.module.scss";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateSuccess = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div className={styles.CreateSuccess}>
      <Box>
        <h1>Account was created successfully!</h1>
        <Button variant="contained" onClick={handleSubmit}>
          Back to Login
        </Button>
      </Box>
    </div>
  );
};

CreateSuccess.propTypes = {};

CreateSuccess.defaultProps = {};

export default CreateSuccess;
