import NavBar from "./Components/Nav";
import Feed from "./Components/Feed";
import { Box, Grommet } from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const App = () => (
  <Grommet theme={theme} full>
    <Box fill background="light-3">
      <NavBar />
      <Feed />
    </Box>
  </Grommet>
);

export default App;
