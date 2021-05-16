import { FileExcelFilled } from "@ant-design/icons";
import { Button, Card, Space } from "antd";

import { Link, useLocation } from "react-router-dom";

function ThankYou(props) {
  console.log(props);
  const location = useLocation();
  return (
    <section
      className="Thank-you"
      style={{ display: "flex", "flex-direction": "column" }}
    >
      <Card
        title="Thank You"
        actions={[
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>,
        ]}
      >
        <p>We appreciate your donation of Rs {location.amount}</p>
        <p>Your confirmation id is: {location.donationID}</p>
        <p>Payment id is: {location.paymentID}</p>
      </Card>
    </section>
  );
}

export default ThankYou;
