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
import { Switch, useHistory } from "react-router";
import { useMediaQuery } from "react-responsive";
import districts from "../components/districts";
import React, { useState, useContext } from "react";
import ApiContext from "../components/ApiContext";
const { v4: uuidv4 } = require("uuid");
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

  const api = useContext(ApiContext);
  const history = useHistory();

  const mockDetails = {
    name: "Alice Wonder",
    tax_id: "Blah",
    payment_id: "abc1234",
    address: {
      line_1: "#234 Windsor",
      line_2: "Hiranandani",
      area: "Powai",
      city: "Mumbai",
      district: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    email: "abc@example.com",
    phone: "+911234567890",
    amount: "1234.45",
  }

  const [name, setName] = useState(mockDetails?.name || "");
  const [addressLine1, setAddressLine1] = useState(mockDetails?.address.line_1 || "");
  const [addressLine2, setAddressLine2] = useState(mockDetails?.address.line_2 || "");
  const [area, setArea] = useState(mockDetails?.address.area || "");
  const [city, setCity] = useState(mockDetails?.address.city || "");
  const [district, setDistrict] = useState(mockDetails?.address.district || "");
  const [sState, setSState] = useState(mockDetails?.address.state || "");
  const [pincode, setPincode] = useState(mockDetails?.address.pincode || "");
  const [phone, setPhone] = useState(mockDetails?.phone || "");
  const [email, setEmail] = useState(mockDetails?.email || "");
  const [paymentID, setPaymentID] = useState(mockDetails?.payment_id || "");
  const [pan, setPAN] = useState(mockDetails?.tax_id || "");
  const [amount, setAmount] = useState(mockDetails?.amount || "");


  function onValuesChange(changedValues, allValues) {
    console.log(changedValues);
    console.log(allValues);
    return;
  }

  async function addDonor() {
    const apiClient = await api.getClient();

    console.log(name);
    console.log(apiClient);

    // const aresponse = await apiClient.addDonation(null, dummyDetails);

    const response = await apiClient.addDonation(null, {
      name: name,
      tax_id: pan,
      // TODO: Generate paymentID from payment gateway instead
      payment_id: paymentID || uuidv4(),
      address: {
        line_1: addressLine1,
        line_2: addressLine2,
        area,
        city,
        district,
        state: sState,
        pincode,
      },
      email: email,
      phone: phone,
      amount: amount,
    });

    console.log(response.status);
    console.log(response.data);

    if (response.status == 200) {
      console.log("Your donation id is:%s, payment ID is:%s ", response.data.id, response.data.payment_id)
      history.push('/thank-you')
    } else {
      console.log("We encoutnered an error")
      history.push('/donation-error')
    }
    // expect(response.status).to.equal(200)
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
    <div style={{ maxWidth: "600px" }}>
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
          <Input value={addressLine2} />
        </Form.Item>

        <Form.Item label="Area" onChange={(e) => setArea(e.target.value)}>
          <Input value={area} />
        </Form.Item>

        <Form.Item label="City" onChange={(e) => setCity(e.target.value)}>
          <Input value={city}/>
        </Form.Item>
        <Form.Item label="State">
          <Select
            value={sState}
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
          <Input value={district} />
        </Form.Item>

        <Form.Item
          label="Pin Code"
          onChange={(e) => setPincode(e.target.value)}
        >
          <Input value={pincode} />
        </Form.Item>

        <Form.Item label="Phone" onChange={(e) => setPhone(e.target.value)}>
          <Input value={phone} />
        </Form.Item>

        <Form.Item label="Email" onChange={(e) => setEmail(e.target.value)}>
          <Input value={email} />
        </Form.Item>

        <Form.Item label="Amount" onChange={(e) => setAmount(e.target.value)}>
          <Input value={amount} />
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
