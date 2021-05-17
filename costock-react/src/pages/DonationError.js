import { Button, Card } from "antd";
import { Link } from "react-router-dom";

function DonationError() {
  return (
    <>
      <Card title="Error">
        <p>We faced an unknown error. Please comeback to donate later.</p>
      </Card>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </>
  );
}

export default DonationError;
