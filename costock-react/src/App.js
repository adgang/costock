import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import About from "./pages/About";
import Donation from "./pages/Donation";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OpenAPIClientAxios from "openapi-client-axios";

import {
  NotFound,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ApiProvider } from "./components/ApiContext";
import ThankYou from "./pages/ThankYou";
import DonationError from "./pages/DonationError";
import Order from "./pages/Order";
import OrderStatus from "./pages/OrderStatus";
import RequestError from "./pages/RequestError";

const api = new OpenAPIClientAxios({
  definition: "/swagger.yaml",
  withServer: { url: "/api" },
});

function App() {
  async function getApiClient() {
    // const client = await api.init();
    await api.init();
    const client = await api.getClient();
    return client;
  }
  return (
    <ApiProvider value={api}>
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
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/thank-you">
                <ThankYou />
              </Route>
              <Route exact path="/donation-error">
                <DonationError />
              </Route>
              <Route exact path="/request">
                <Order />
              </Route>
              <Route exact path="/order-status">
                <OrderStatus />
              </Route>
              <Route exact path="/orders/:id" children={<OrderStatus />}>
              </Route>

              <Route exact path="/request-error">
                <RequestError />
              </Route>
            </Switch>
          </section>
          <Footer></Footer>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;
