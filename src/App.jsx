/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useReducer } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import UnlockedButton from "./components/UnlockedButton/UnlockedButton";
import BlockedButton from "./components/BlockedButton/BlockedButton";
import { getItem, setItem } from "./utils/localStorage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Inicializo el estado del array usersTable
const initialState = { usersTable: getItem("usernames") || [] };

// Funcion reducer para manejar el estado usersTable
function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        usersTable: [
          ...state.usersTable,
          { user: action.payload.user, color: action.payload.color },
        ],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function App() {
  const [isUnlocked, setIsUnlocked] = useState(
    getItem("isUnlocked") === "true" || false
  );
  const [isClicked, setIsClicked] = useState(
    getItem("isClicked") === "true" || false
  );
  const [countButton, setCountButton] = useState(getItem("countButton") || 60);

  const [currentUser, setCurrentUser] = useState(getItem("currentUser") || "");
  const [usernames, setUsernames] = useState(getItem("usernames") || []);
  const [running, setRunning] = useState(getItem("running") === "true" || null);

  const [nextClick, setNextClick] = useState(getItem("nextClick") || null);

  const [userColor, setUserColor] = useState(getItem("userColor") || null);

  const [greenUsers, setGreenUsers] = useState(getItem("greenUsers") || 0);
  const [yellowUsers, setYellowUsers] = useState(getItem("yellowUsers") || 0);
  const [redUsers, setRedUsers] = useState(getItem("redUsers") || 0);

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect para almacenar los datos del array usersTable
  useEffect(() => {
    setItem("usersTable", state.usersTable);
  }, [state.usersTable]);

  //funcion para desbloquear el botón
  const handleUnlockClick = () => {
    setIsUnlocked(true);
    setItem("isUnlocked", true);
  };

  //función donde traigo la lista de users
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const usernames = data.map((user) => user.username);
      setUsernames(usernames);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //Con este useEffect me traigo la lista y verifico si es que esta bloqueado y/o clickeado el botón, y si esta corriendo el countdown
  useEffect(() => {
    if (usernames.length === 0) {
      fetchUsers();
    }
    if (getItem("isUnlocked") === true) {
      setIsUnlocked(getItem("isUnlocked"));
    }
    if (getItem("isClicked") === true) {
      setIsClicked(getItem("isClicked"));
    }
    if (getItem("running") === true) {
      setRunning(getItem("running"));
    }
  }, []);

  //Funcion para el Countdown
  const startCountdown = () => {
    const storedCount = getItem("countButton");
    const initialCount = storedCount !== null ? parseInt(storedCount) : 60;
    setCountButton(initialCount);

    setRunning(true);
    setItem("running", running);

    let interval = setInterval(() => {
      setCountButton((prevCount) => {
        if (prevCount > 0) {
          setItem("countButton", prevCount - 1);
          return prevCount - 1;
        } else {
          setCurrentUser(null);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  };

  //Funcion que verifica si fue clickeado el boton y empiece o siga el countdown
  useEffect(() => {
    if (isClicked) {
      startCountdown();
    }
  }, [isClicked]);

  function getRandomNumber() {
    return setNextClick(Math.floor(Math.random() * 61));
  }

  function getRandomUser(usernames) {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
  }

  //Funcion para empezar con el countdown
  function handleClicked() {
    setIsClicked(true);
    setRunning(true);
    setItem("isClicked", true);
    setCurrentUser("Jonafunes");
    setItem("currentUser", "Jonafunes");
    setUserColor("green");
    setItem("userColor", "green");

    const addGreen = greenUsers + 1;
    setGreenUsers(addGreen);
    setItem("greenUsers", addGreen);

    dispatch({
      type: "add",
      payload: { user: "Jonafunes", color: "green" },
    });
    setItem("usersTable", state.usersTable);
    getRandomNumber();
    usernames.shift();
  }

  // Funcion donde se seleccion el prox usuario, se lo elimina de una lista y se le asigna color dependiendo en que momento "clickea"
  function getUser() {
    //Selecciona el proximo usuario, y se guarda la informacion
    const randomUsername = getRandomUser(usernames);
    setCurrentUser(randomUsername);
    setItem("currentUser", randomUsername);
    console.log("Random username:", randomUsername);
    //Se elimina el usuario que ya clickeo y se guarda la nueva lista
    const updatedUsernames = usernames.filter(
      (username) => username !== randomUsername
    );
    setUsernames(
      updatedUsernames.filter((username) => username !== "Jonafunes")
    );
    setItem("usernames", updatedUsernames);
    const currentCount = countButton;

    let color;
    // Lógica para asignar colores
    if (currentCount >= 40 && currentCount <= 60) {
      // Entre 40 y 60 segundos: Verde
      color = "green";
      const addGreen = greenUsers + 1;
      setGreenUsers(addGreen);
      setItem("greenUsers", addGreen);
    } else if (currentCount >= 20 && currentCount <= 39) {
      // Entre 20 y 39 segundos: Amarillo
      color = "yellow";
      const addYellow = yellowUsers + 1;
      setYellowUsers(addYellow);
      setItem("yellowUsers", addYellow);
    } else {
      // Otros segundos: Rojo
      color = "red";
      const addRed = redUsers + 1;
      setRedUsers(addRed);
      setItem("redUsers", addRed);
    }
    setUserColor(color);
    setItem("userColor", color);
    dispatch({
      type: "add",
      payload: { user: randomUsername, color: color },
    });
    setItem("usersTable", state.usersTable);
  }

  //Funcion unicamente para ver información en la consola
  function viewLogs() {
    console.log({
      "Usuario Actual": currentUser,
      "Color actual": userColor,
      "Proximo Numero": nextClick,
      "Usuarios para la tabla": state.usersTable,
    });
  }

  useEffect(() => {
    viewLogs();
    setItem("nextClick", nextClick);
    setItem("usernames", usernames);
    if (countButton === nextClick && running === true) {
      if (usernames.length > 1) {
        getUser();
        //se vuelve a setear el contador, se genera el numero al azar donde se clickeara y se guarda
        setCountButton(60);
        getRandomNumber();
        setItem("nextClick", nextClick);
      } else if (usernames.length > 0) {
        getUser();
        setCountButton(60);
        setNextClick(0);
        setItem("nextClick", nextClick);
      } else {
        setCountButton(0);
      }
    }
  });

  // Seteo el tipo de data de la tabla
  function createData(colours, qty) {
    return { colours, qty };
  }

  // Seteo los campos estáticos y los dinamicos
  const rows = [
    createData("Green", greenUsers),
    createData("Yellow", yellowUsers),
    createData("Red", redUsers),
  ];

  return (
    <Box>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>The Button</h1>
      <Box className="card">
        <Grid container spacing={2} sx={{ width: "inherit" }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            {isUnlocked ? (
              <UnlockedButton onClick={handleClicked} disabled={isClicked} />
            ) : (
              <BlockedButton
                onClick={handleUnlockClick}
                disabled={isUnlocked}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography sx={{ fontSize: "5rem" }}>{countButton}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="body1">Current user: {currentUser || ""}</Typography>
      {userColor && (
        <Typography
          variant="body1"
          style={{ backgroundColor: userColor, height: "20px" }}
        ></Typography>
      )}
      <TableContainer
        component={Paper}
        elevation={12}
        sx={{ backgroundColor: "#585758" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Colores</TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Cantidad de Usuarios
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#fff" }}>
                  {row.colours}
                </TableCell>
                <TableCell align="center" sx={{ color: "#fff" }}>
                  {row.qty}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
