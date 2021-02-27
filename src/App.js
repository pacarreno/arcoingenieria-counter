import React, { useState } from 'react';
import moment from 'moment';
import Contador from './Contador';
import { Row, Col ,Button,Input,DatePicker} from 'antd';
import './App.css';

function App() {

  const [conteoInfo,setConteoInfo] = useState({});
  const [started,setStarted] = useState(false);

  function handleChangeNombre(e) { setConteoInfo({...conteoInfo,nombre : e.target.value })  }
  function handleChangeInterseccion(e) {  setConteoInfo({...conteoInfo,interseccion : e.target.value }) }
  function handleChangeFecha(e) { setConteoInfo({...conteoInfo,fecha : e.target.value })  }
  function handleChangeMovimiento(e) {  setConteoInfo({...conteoInfo,movimiento : e.target.value }) }
  function handleChangeSentido(e) {  setConteoInfo({...conteoInfo,sentido : e.target.value }) }

  function handleClick(event) { setStarted(!started)  }
  function handleKeyDown(event) {if (event.key === 'Enter') { setStarted(!started) } }

  return (
    <div className="App">
      <header className="App-header">
          {
            started && <a href="#" onClick={handleClick} >atras</a>
          }
        <h1>ArcoIngenieria</h1>
        </header>
        <main>
          <div>
            { started ?
              <Contador conteoInfo={conteoInfo} />
              :
              <>
              <Row>
                <Col span={4} offset={5} >
                  Nombre del conteo : 
                </Col>
                <Col span={4} >
                  <Input style={{width:"400px"}} size="middle" type="text" value={conteoInfo.nombre} onInput={handleChangeNombre} onKeyDown={handleKeyDown}  placeholder="Nombre de conteo" /> <br /> <br />
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={5} >
                  Intersección : 
                </Col>
                <Col span={4} >
                <Input style={{width:"400px"}} size="middle" type="text" value={conteoInfo.interseccion} onInput={handleChangeInterseccion}  onKeyDown={handleKeyDown}  placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={5} >
                  Fecha : 
                </Col>
                <Col span={4} >
                <DatePicker  defaultValue={moment()}  style={{width:"400px"}} size="middle" type="text" value={conteoInfo.fecha} onInput={handleChangeFecha}  onKeyDown={handleKeyDown}  placeholder="Fecha Conteo" /> <br /> <br />                 
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={5} >
                  Movimiento :
                </Col>
                <Col span={4} >
                <Input style={{width:"400px"}} size="middle" type="text" value={conteoInfo.movimiento} onInput={handleChangeMovimiento}  onKeyDown={handleKeyDown}  placeholder="Nombre de la intersección" /> <br /> <br />               
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={5} >
                Sentido : 
                </Col>
                <Col span={4} >
                <Input style={{width:"400px"}} size="middle" type="text" value={conteoInfo.sentido} onInput={handleChangeSentido}  onKeyDown={handleKeyDown}  placeholder="Nombre de la intersección" /> <br /> <br />              
                </Col>
              </Row>
              <Button type="primary" onClick={handleClick}  >Iniciar nuevo Conteo</Button>
              </>
            }
          </div>
        </main>
    </div>
  );
}

export default App;
