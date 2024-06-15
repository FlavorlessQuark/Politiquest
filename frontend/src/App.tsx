import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
