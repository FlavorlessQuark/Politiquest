import {
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";

import Home from "./Home"
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <Router>
        <Routes>
            <Home path="/home" element={<Home/>}/>
        </Routes>
        <Navbar/>
    </Router>
  )
}

export default App
