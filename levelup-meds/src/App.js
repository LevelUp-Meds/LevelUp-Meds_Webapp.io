import Login from "./components/Login/Login";
import style from "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <Link to="/">Login</Link>
    </div>
  );
}

export default App;
