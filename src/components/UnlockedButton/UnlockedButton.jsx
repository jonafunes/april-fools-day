import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledUnlockedButton = styled(Button)({
  maxWidth: "400px",
  minWidth: "100px",
  height: "100px",
  backgroundColor: "#585758",
  '&:hover': {
    boxShadow: 'none',
  },
  "&:active": {
    backgroundColor: "#585758",
  },
  "&:focus": {
    backgroundColor: "#585758",
  },
  "&:disabled": {
    backgroundColor: "#585758",
    color: "#fafafa"
  },
});

// eslint-disable-next-line react/prop-types
const UnlockedButton = ({ onClick, disabled}) => {
  return (
    <StyledUnlockedButton fullWidth variant="contained" onClick={onClick} disabled={disabled}>
      Empezar cuenta regresiva
    </StyledUnlockedButton>
  );
};

export default UnlockedButton;