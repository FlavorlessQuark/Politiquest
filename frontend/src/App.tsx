import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { styled } from "styled-components";

import Home from "./Home";
import Navbar from "./components/Navbar";
import Meeting from "./Meeting";
import { UserProvider } from "./components/UserContext";
import Achievements from "./Achievements";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Container>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/meeting/:id" element={<Meeting />} />
          </Routes>
          <Navbar />
        </Container>
      </UserProvider>
    </Router>
  );
};

const Container = styled.div`
    height: 100vh;
    // width: 100vw;
`;

export default App;
