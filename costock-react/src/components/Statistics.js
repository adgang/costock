import { Button, Card, Space, Row, Col, Statistic, Text } from "antd";
import { DollarCircleFilled } from "@ant-design/icons";

function Statistics() {
  return (
    <section className="App-statistics">
      <Card title="Donations">
        <Statistic value={1128} prefix={"Rs."} suffix={" collected"} />
        <Statistic value={1128} prefix={"Rs."} suffix={" deployed"} />
      </Card>
      <Card title="Concentrators">
        <Statistic value={93} suffix="concentrators" />
        <Statistic value={93} suffix="people served" />
      </Card>
    </section>
  );
}

export default Statistics;
