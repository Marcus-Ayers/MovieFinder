import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Movie from "./Movie";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  );
}
export default App;
