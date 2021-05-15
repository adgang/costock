import { Button } from "antd";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <p>Costock is </p>
      <Link to="/donation">
        <Button>I want to donate</Button>
      </Link>
      <Link to="/requests">
        <Button>I want to request a concentrator</Button>
      </Link>
    </>
  );
}

export default Home;
