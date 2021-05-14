import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'o2-rect.png'} className="App-logo" alt="logo" />
        <div class="App-title">
          <h1>O<sub>2</sub> Concentrator Stockpile</h1>
        </div>
      </header>
      <section>
      <Button type="primary">Button</Button>

      </section>
      <footer></footer>
    </div>
  );
}

export default App;
