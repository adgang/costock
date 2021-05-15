import { Link } from "react-router-dom";
import {Typography} from "antd";
import "./Header.css"
const { Text, Title } = Typography;
function Header() {
  return (
    <>
      <header className="App-header">
        <Link to="/"><img src={"o2-rect.png"} className="App-logo" alt="logo" /></Link>
        <div class="App-title">
          <Title keyboard>Costock</Title>
          <Text keyboard level={5}>
          A Community O<sub>2</sub> Concentrator Stockpile
          </Text>
        </div>
      </header>
    </>
  );
}

export default Header;
