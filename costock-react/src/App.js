import "./App.css";
import "antd/dist/antd.css";
import About from "./pages/About";
import Donation from "./pages/Donation";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
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
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
