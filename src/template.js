import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Chart from "./chart";

import AppBar from "@mui/material/AppBar";
//import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
//import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import FormHelperText from "@mui/material/FormHelperText";

import logo from "./logo_160.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  //   bgcolor: "background.paper",
  bgcolor: "#C0C0C0",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#80cbc4",
    },
  },
});

const theme1 = createTheme({
  palette: {
    primary: {
      main: "#648dae",
    },
    secondary: {
      main: "#FFC0CB",
    },
  },
});
const instance = axios.create({
  baseURL: "http://localhost:9999/nba_players",
});

const App = () => {
  const [team, setTeam] = useState("ALL");
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const handleSelect = (func) => (event) => {
    func(event.target.value);
  };

  const handleTextChange = (func) => (event) => {
    func(event.target.value.trim());
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getData = async () => {
    const res = await instance
      .get("?team=ALL")
      .then((response) => {
        // console.log(response.data.length);
        // mui dataGrid need unique ID for each element
        var data = response.data;
        data.forEach((item, i) => {
          item.id = i + 1;
        });
        setRows(response.data);
        // var r = JSON.stringify(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async () => {
    var url = `?team=${team}&name=${name}`;
    const res = await instance
      .get(url)
      .then((response) => {
        console.log(response.data.length);
        // mui dataGrid need unique ID for each element
        var data = response.data;
        data.forEach((item, i) => {
          item.id = i + 1;
        });
        setRows(response.data);
        // var r = JSON.stringify(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((err) => console.log(err));
  };
  const COLUMN_WIDTH = 150;
  const columns = [
    { field: "team_acronym", headerName: "Team", width: 100 },
    { field: "name", headerName: "Name", width: COLUMN_WIDTH },
    { field: "games_played", headerName: "Games", width: COLUMN_WIDTH },
    { field: "points_per_game", headerName: "Points", width: COLUMN_WIDTH },
    { field: "rebounds_per_game", headerName: "Rebounds", width: COLUMN_WIDTH },
    { field: "assists_per_game", headerName: "Assists", width: COLUMN_WIDTH },
    { field: "steals_per_game", headerName: "Steals", width: COLUMN_WIDTH },
    { field: "blocks_per_game", headerName: "Blocks", width: COLUMN_WIDTH },
    {
      field: "detail",
      headerName: "Detail",
      width: 100,
      description: "Click to see detail and this column is not sortable.",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate("/detail", {
            state: { data: rows.filter((u) => u.id === params.id) },
          });
          return;
        };
        return (
          <Button onClick={onClick} variant="outlined" size="large">
            detail
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt="This is logo" />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <AccountCircleIcon sx={{ fontSize: 50 }} />
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <ThemeProvider theme={theme1}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              style={{ color: "#00008b" }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Player List
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* <Container maxWidth="md"> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              justifyContent: "center",
            }}
          >
            <Box component="span" m={1}>
              <FormControl sx={{ m: 0, minWidth: 120 }}>
                {/* <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth> */}
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                  value={team}
                  label="Team"
                  onChange={handleSelect(setTeam)}
                  defaultValue={"ALL"}
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"alt"}>alt</MenuItem>
                  <MenuItem value={"bos"}>bos</MenuItem>
                  <MenuItem value={"bro"}>bro</MenuItem>
                  <MenuItem value={"cha"}>cha</MenuItem>
                  <MenuItem value={"chi"}>chi</MenuItem>
                  <MenuItem value={"cle"}>cle</MenuItem>
                  <MenuItem value={"dal"}>dal</MenuItem>
                  <MenuItem value={"den"}>den</MenuItem>
                  <MenuItem value={"det"}>det</MenuItem>
                  <MenuItem value={"gsw"}>gsw</MenuItem>
                  <MenuItem value={"hou"}>hou</MenuItem>
                  <MenuItem value={"ind"}>ind</MenuItem>
                  <MenuItem value={"lac"}>lac</MenuItem>
                  <MenuItem value={"lal"}>lal</MenuItem>
                  <MenuItem value={"mem"}>mem</MenuItem>
                  <MenuItem value={"mia"}>mia</MenuItem>
                  <MenuItem value={"mil"}>mil</MenuItem>
                  <MenuItem value={"min"}>min</MenuItem>
                  <MenuItem value={"nor"}>nor</MenuItem>
                  <MenuItem value={"nyk"}>nyk</MenuItem>
                  <MenuItem value={"okc"}>okc</MenuItem>
                  <MenuItem value={"orl"}>orl</MenuItem>
                  <MenuItem value={"phi"}>phi</MenuItem>
                  <MenuItem value={"pho"}>pho</MenuItem>
                  <MenuItem value={"por"}>por</MenuItem>
                  <MenuItem value={"sac"}>sac</MenuItem>
                  <MenuItem value={"sas"}>sas</MenuItem>
                  <MenuItem value={"tor"}>tor</MenuItem>
                  <MenuItem value={"uth"}>uth</MenuItem>
                  <MenuItem value={"was"}>was</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box component="span" m={1}>
              <TextField
                id="filled-basic"
                label="Name Search"
                m={1}
                variant="filled"
                value={name}
                onChange={handleTextChange(setName)}
              />
            </Box>

            <Box component="span" m={1}>
              <Button variant="outlined" size="large" onClick={handleSearch}>
                Search
              </Button>
            </Box>

            <Box component="span" m={1}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleOpen}
              >
                Show Charts
              </Button>
            </Box>
            <Box m={1}>
              <FormControl sx={{ m: 0, minWidth: 120 }}>
                <InputLabel>Page</InputLabel>
                <Select
                  value={page}
                  label="Page"
                  onChange={handleSelect(setPage)}
                  defaultValue={0}
                >
                  {[...Array(parseInt(rows.length / 15) + 1).keys()].map(
                    (u, i) => {
                      i += 1;
                      return (
                        <MenuItem key={i} value={u}>
                          {u + 1}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
                <FormHelperText>{`${1 + page * 15}-${
                  (page + 1) * 15 > rows.length ? rows.length : (page + 1) * 15
                } of ${rows.length}`}</FormHelperText>
              </FormControl>
            </Box>
            {/* </Container> */}
          </Box>

          <Box component="span" m={1}>
            <div style={{ height: 1000, width: "90%", margin: "0 auto" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                page={page}
                pageSize={15}
                rowsPerPageOptions={[15]}
                autoHeight={true}
                //   hideFooterSelectedRowCount={true}
                //   hideFooterPagination={true}
                hideFooter={true}
              />
            </div>
          </Box>
        </main>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Box sx={style}>
              <Typography variant="h6" align="center">
                Team member less equal 15
              </Typography>
              <Chart />
            </Box>
          </>
        </Modal>
      </ThemeProvider>
    </>
  );
};
export default App;
