import { Descriptions } from "antd";
import { useLocation } from "react-router";

function OrderStatus(props) {
  const order = useLocation().order;
  console.log(useLocation())
  console.log("order:", order);
  const location = order.location;
  const destination = location.lat + "," + location.long;
  const officeLocation = {
    lat: "19.528389183694434",
    long: "72.91910525185355",
  };
  const origin = "" || officeLocation.lat + "," + officeLocation.long;
  return (
    <section>
      <Descriptions bordered title="Order Info" style={{ padding: "20px" }}>
        <Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{order.name}</Descriptions.Item>
        <Descriptions.Item label="Contact">{order.contact}</Descriptions.Item>
        <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
        <Descriptions.Item label="Location">
          {Object.values(location).join(", ")}
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
          "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBZwvFmJXMStXbIGGBQPe4XIjK2VqlIT2M&destination=" +
          destination +
          "&origin=" +
          origin
        }
        allowfullscreen
      ></iframe>
    </section>
  );
}

export default OrderStatus;
