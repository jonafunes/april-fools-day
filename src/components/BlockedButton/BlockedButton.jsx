import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import LockIcon from "@mui/icons-material/Lock";

const ButtonBlocked = styled(Button)({
  maxWidth: "400px",
  minWidth: "100px",
  height: "100px",
  backgroundColor: "#585758",
  "&:hover": {
    backgroundColor: "#585758",
    boxShadow: "none",
    opacity: "0.3",
  },
});

// eslint-disable-next-line react/prop-types
const BlockedButton = ({ onClick, disabled }) => {
  return (
    <ButtonBlocked fullWidth variant="contained" onClick={onClick} disabled={disabled}>
      <LockIcon sx={{ fontSize: "4rem" }}></LockIcon>
    </ButtonBlocked>
  );
};

export default BlockedButton;
