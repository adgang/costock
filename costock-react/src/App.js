import "./App.css";
import "antd/dist/antd.css";
import About from "./pages/About";
import Donation from "./pages/Donation";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";


import { NotFound, BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <section className="App-centered-panel">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/donation">
              <Donation />
            </Route>
            <Route exact path="/">
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
