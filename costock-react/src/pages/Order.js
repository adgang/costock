import { Input, Form, Select, Button, Space, Divider, message } from "antd";
import Title from "antd/lib/typography/Title";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import districts from "../components/districts";
import ApiContext from "../components/ApiContext";
import { useHistory } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Order() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 600px)",
  });

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
    location: {
      // 19.128389183694434, 72.91910525185355
      lat: "19.128389183694434",
      long: "72.91910525185355",
    },
  };

  const api = useContext(ApiContext);
  const history = useHistory();

  const [name, setName] = useState(mockDetails?.name || "");
  const [addressLine1, setAddressLine1] = useState(
    mockDetails?.address.line_1 || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    mockDetails?.address.line_2 || ""
  );
  const [area, setArea] = useState(mockDetails?.address.area || "");
  const [city, setCity] = useState(mockDetails?.address.city || "");
  const [district, setDistrict] = useState(mockDetails?.address.district || "");
  const [sState, setSState] = useState(mockDetails?.address.state || "");
  const [pincode, setPincode] = useState(mockDetails?.address.pincode || "");
  const [phone, setPhone] = useState(mockDetails?.phone || "");
  const [email, setEmail] = useState(mockDetails?.email || "");
  const [location, setLocation] = useState(mockDetails?.location || "");
  const [disabled, setDisabled] = useState(false);

  function onValuesChange(changedValues, allValues) {
    console.log(changedValues);
    console.log(allValues);
    return;
  }

  function guessLocation() {
    // TODO: Use google map api to get loaction based on address

    return {
      lat: mockDetails.location.lat,
      long: mockDetails.location.long,
    };
  }

  async function onFinish(values) {
    const apiClient = await api.getClient();

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
    });
    console.log("adding a new request for a concentrator");

    const response = await apiClient.addOrder(null, {
      name: name,
      address: {
        line_1: addressLine1,
        line_2: addressLine2,
        area,
        city,
        district,
        state: sState,
        pincode,
      },
      contact: phone,
      location: {
        lat: location.lat || guessLocation().lat,
        long: location.long || guessLocation().long,
      },
    });

    console.log(response.status);
    console.log(response.data);

    if (response.status == 200) {
      console.log("Your request order id is:%s", response.data.id);
      history.push({
        pathname: "/orders/" + response.data.id,
        order: response.data,
      });
    } else {
      console.log("We encoutnered an error");
      history.push("/request-error");
    }
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed: ", errorInfo);
  }

  function addRequest() {}

  function updatePosition(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    console.log("enabling button");
    setDisabled(false);
  }

  function errorPosition(err) {
    message.info(
      "Geolocation failed. We will construct your location based on your address"
    );

    console.log("Error Code = " + err.code + " - " + err.message);
    setDisabled(false);
  }

  async function getLocation() {
    console.log("Getting location");
    // TODO: Do the disablign button dance
    // setDisabled(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition, errorPosition);
    } else {
      message.info(
        "Geolocation is not supported by this browser. We will construct your location based on your address"
      );
    }
  }

  return (
    <section style={{ maxWidth: "600px" }}>
      <Title level={2}>
        O<sub>2</sub> Concentrator Request
      </Title>
      <Divider></Divider>
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
          <Input value={city} />
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
        {/* 
        <Form.Item label="Email" onChange={(e) => setEmail(e.target.value)}>
          <Input value={email} />
        </Form.Item> */}

        <Form.Item label="Location">
          {/* <Input value={email} /> */}
          <Button onClick={getLocation}>Get Location</Button>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button htmlType="submit" onClick={addRequest} disabled={disabled}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Order;
