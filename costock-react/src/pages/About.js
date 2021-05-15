import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";

function About() {
  return (
    <div>
      <Title level="2">About Us</Title>
      <Paragraph>
        <p>
          This has been attempted as part of Redislabs hackathon using redis
          modules.
        </p>
      </Paragraph>
    </div>
  );
}

export default About;
