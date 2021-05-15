import { Button, Card, Space, Row, Col, Statistic, Text } from "antd";
import { DollarCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Home.css";
import Paragraph from "antd/lib/typography/Paragraph";
import Statistics from "../components/Statistics";

function Home() {
  return (
    <div className="App-home">
      <section>
        <Card bordered={false}>
          <Paragraph>
            Place a request for oxygen concentrator and have it delivered at
            home for free. Return when you don't need it.
          </Paragraph>
        </Card>
      </section>
      <section className="Home-buttons">
        <Space className="Home-donation-button">
          <Link to="/donation">
            <Button>I want to donate</Button>
          </Link>
        </Space>
        <Space className="Home-order-button">
          <Link to="/requests">
            <Button>I want to request a concentrator</Button>
          </Link>
        </Space>
      </section>

      <section>
        <Card bordered={false}>
          <Paragraph>
            We are a community maintained stockpile for oxygen concentrators.
            Our goal is to make oxygen concentrators available to everyone in
            need. We achieve this by placing orders to manufacturers to the full
            extent of their spare capacity, stockpiling them, delivering them to
            needy and calling them back. Donors can donate to our capital pool.
          </Paragraph>
        </Card>
      </section>
      <Statistics></Statistics>
    </div>
  );
}

export default Home;
