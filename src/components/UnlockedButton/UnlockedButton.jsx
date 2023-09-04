import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledUnlockedButton = styled(Button)({
  width: "400px",
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
    <StyledUnlockedButton variant="contained" onClick={onClick} disabled={disabled}>
      Empezar cuenta regresiva
    </StyledUnlockedButton>
  );
};

export default UnlockedButton;