import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ButtonClear = styled(Button)({
    opacity: "0.3",
    marginTop: "20px"
  });

const ClearStorageButton = () => {
  const handleClearStorage = () => {
    // Limpia todo el localStorage
    localStorage.clear(); 
    // Recarga la página para reflejar el cambio
    window.location.reload(); 
  };

  return (
    <ButtonClear onClick={handleClearStorage}>Limpiar Almacenamiento Local</ButtonClear>
  );
};

export default ClearStorageButton;