import { Space } from "antd";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <Space>
        <Link to="/">Home</Link>
        <Link to="/donation">Donation</Link>
        <Link to="/orders">Orders</Link>
        <a href="/swagger-ui/?url=/swagger.yaml#/donations/addDonation">APIs</a>
        <Link to="/about">About Us</Link>
      </Space>
    </footer>
  );
}

export default Footer;
