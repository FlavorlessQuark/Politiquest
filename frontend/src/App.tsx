import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { styled } from "styled-components";

import Home from "./Home";
import Navbar from "./components/Navbar";
import Meeting from "./Meeting";
import { UserProvider } from "./components/UserContext";
import Achievements from "./Achievements";
import Reps from "./Reps";
import Leaderboard from "./Leadeboard";
import Profile from "./Profile";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Container>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/meeting/:id" element={<Meeting />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="/reps" element={<Reps />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
          <Navbar />
        </Container>
      </UserProvider>
    </Router>
  );
};

const Container = styled.div`
    height: calc(100vh - 60px);
    // width: 100vw;
`;

export default App;
