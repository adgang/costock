import { Button, Card, Descriptions } from "antd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";

class OrderStatusComponent extends Component {
  constructor(props) {}

  // componentDidMount() {
  //   const id = setInterval(() => {

  //   }, 10000);
  //   setIntervalID(id);
  // }

  // componentWillUnmount() {
  //   clearInterval(intervalID);
  // }
}
function OrderStatus(props) {
  var order = useLocation().order;
  var [order, setOrder] = useState(null);
  console.log(useLocation());
  console.log("order:", order);

  function queryString(order) {
    const location = order.location;
    const destination = location.lat + "," + location.long;
    const origin = "" || officeLocation.lat + "," + officeLocation.long;
    return "destination=" + destination + "&origin=" + origin;
  }
  // Show distance from office location if device is not assigned yet
  const officeLocation = {
    lat: "19.528389183694434",
    long: "72.91910525185355",
  };

  // const [intervalID, setIntervalID] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("calling again");
    }, 10000);

    return function cleanup() {
      console.log("cleaning up timer");
      clearInterval(id);
    };
  });

  var ren;
  if (order) {
    ren = 
    <>
    <Descriptions bordered title="Order Info" style={{ padding: "20px" }}>
      <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
      <Descriptions.Item label="Name">{order.name}</Descriptions.Item>
      <Descriptions.Item label="Contact">{order.contact}</Descriptions.Item>
      <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
      <Descriptions.Item label="Location">
        {Object.values(order.location).join(", ")}
      </Descriptions.Item>
      <Descriptions.Item label="Address">
        {Object.values(order.address).join(", ")}
      </Descriptions.Item>
      <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
    </Descriptions>
  <iframe
    width="450"
    height="250"
    frameborder="0"
    style={{ border: 0 }}
    src={
      "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBZwvFmJXMStXbIGGBQPe4XIjK2VqlIT2M&" +
      queryString(order)
    }
    allowfullscreen
  ></iframe>
  </>
  } else {
    ren = <Card>Loading</Card>
  }
  return (


    <section>
      {ren}
      <section>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </section>
    </section>
  );
}

export default OrderStatus;
