import { Button, Card } from "antd";
import { Link } from "react-router-dom";

function RequestError() {
  return (
    <>
      <Card title="Error">
        We faced an unexpected error. Please mail us to place a request.
      </Card>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </>
  );
}

export default RequestError;
