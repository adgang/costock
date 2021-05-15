import "./App.css";
import "antd/dist/antd.css";
import About from "./pages/About";
import Donation from "./pages/Donation";
import Home from "./pages/Home";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
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
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/donation">
              <Donation />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </section>
        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
