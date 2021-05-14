import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={"o2-rect.png"} className="App-logo" alt="logo" />
        <div class="App-title">
          <h1>
            O<sub>2</sub> Concentrator Stockpile
          </h1>
        </div>
      </header>
      <section className="App-centered-panel">
        <Router>
          <Link to="/donation"><Button>I want to donate</Button></Link>
          <Link to="/requests"><Button>I want to request a concentrator</Button></Link>
        </Router>
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
