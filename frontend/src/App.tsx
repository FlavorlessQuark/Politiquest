import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Navbar />
    </Router>
  );
};

export default App;
