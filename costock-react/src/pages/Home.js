import { Button, Tag, PageHeader, Space } from "antd";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div class="App-home">
      <Space>
        <Link to="/donation">
          <Button>I want to donate</Button>
        </Link>
        <Link to="/requests">
          <Button>I want to request a concentrator</Button>
        </Link>
      </Space>
    </div>
  );
}

export default Home;
