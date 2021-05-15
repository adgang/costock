import {
  Button,
  Cascader,
  Input,
  InputNumber,
  Form,
  Select,
  TreeSelect,
  Typography,
} from "antd";
// import Form from "antd/lib/form/Form";
import { Switch } from "react-router";
import { useMediaQuery } from "react-responsive";
import districts from "../components/districts";
import { useState } from "react";
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Donation() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 600px)",
  });

  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState(0);
  const [sState, setSState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [pan, setPAN] = useState("");

  function onValuesChange(changedValues, allValues) {
    console.log(changedValues);
    console.log(allValues);
    return;
  }

  function addDonor() {
    console.log(name);
  }

  function onFinish(values) {
    console.log(values);
    console.log({
      name,
      addressLine1,
      addressLine2,
      city,
      district,
      sState,
      pincode,
      phone,
      email,
      paymentID,
      pan,
    });
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed: ", errorInfo);
  }

  return (
    <div>
      <Title>Donation</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout={isDesktopOrLaptop ? "horizontal" : "vertical"}
        size={"default"}
        initialValues={{}}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        {...layout}
      >
        <Form.Item label="Name">
          <Input
            value={name}
            onChange={(e) => {
              console.log(e);
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="PAN">
          <Input value={pan} onChange={(e) => setPAN(e.target.value)} />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="  " onChange={(e) => setAddressLine2(e.target.value)}>
          <Input />
        </Form.Item>
        <Form.Item label="City" onChange={(e) => setCity(e.target.value)}>
          <Input />
        </Form.Item>
        <Form.Item label="State">
          <Select
            options={Object.keys(districts).map((st) => {
              return { label: st, value: st };
            })}
            onChange={(val) => {
              console.log(val);
              setSState(val);
            }}
          ></Select>
        </Form.Item>
        <Form.Item
          label="District"
          onChange={(e) => setDistrict(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Pin Code"
          onChange={(e) => setPincode(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone" onChange={(e) => setPhone(e.target.value)}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" onChange={(e) => setEmail(e.target.value)}>
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="submit" onClick={addDonor}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Donation;
