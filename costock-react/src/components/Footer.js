import { Space } from "antd";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <Link to="/">Home</Link>
      <Link to="/donation">Donate</Link>
      <Link to="/request">Request Concentrator</Link>
      <Link to="/orders">Manage</Link>

      <Link href="/swagger-ui/?url=/swagger.yaml#/donations/addDonation">APIs</Link>
      <Link to="/about">About Us</Link>
    </footer>
  );
}

export default Footer;
