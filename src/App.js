import './App.css';
import React, { useState } from 'react';
import LoginScreen from "./componentes/LoginScreen";
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import Contador from './Contador';
import NotFound from './NotFound';
import EditarConteo from './EditarConteo';
import ListaConteos from './ListaConteos';
import { Layout, Input, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export const APP_ID = "arcoingenieria-contador-eauzs";

const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};

function App() {

  const [conteos, setConteos] = useState([])

  // TODO cargar desde base de datos
  for (let i = 0; i < 23; i++) {
    conteos.push({
      id: i + 1,
      nombre: `Conteo ${i}`,
      fecha: moment().add(i, 'd').format("DD-MM-YYYY"),
      interseccion: `Intersección ${i}`,
      movimiento: `Movimiento ${i}`,
      sentido: `Sentido ${i}`,
      contadores: {
        autos_liviano: Math.floor(Math.random() * 10),
        taxi: Math.floor(Math.random() * 10) + 1,
        taxi_colectivo: Math.floor(Math.random() * 10),
        bus: Math.floor(Math.random() * 10),
        taxi_bus: Math.floor(Math.random() * 10),
        bus_interurbano: Math.floor(Math.random() * 10),
        camion_2_ejes: Math.floor(Math.random() * 10),
        trailer_y_semi: Math.floor(Math.random() * 10),
        camion_cisterna: Math.floor(Math.random() * 10),
        camion_grano: Math.floor(Math.random() * 10),
        motos: Math.floor(Math.random() * 10),
        bicicleta: Math.floor(Math.random() * 10)
      }
    });
  }
  const [conteoInfo, setConteoInfo] = useState({});
  const history = useHistory();
  const handleClick = () => { history.push('/nuevo'); }

  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <Layout className="layout">
            <Header className="App-header" style={{ zIndex: 1, width: '100%' }} >
              <Row style={{ alignItems: 'center' }} >
                <Col span={4}>
                  <h1><Link to="/" style={{ textDecoration: 'none', color: 'white' }} >ArcoIngenieria</Link></h1>
                </Col>
                <Col span={16}>
                  {
                    //<Search placeholder="Buscar conteo" enterButton size="large" style={{ width: '100%', paddingTop: '8px' }} />
                  }
                </Col>
                <Col span={4} >
                  <Button style={{ float: 'right' }} type="primary" icon={<PlusOutlined />} size='large' onClick={() => handleClick()} />
                </Col>
              </Row>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 70 }}>
              <Switch>
                <Route path="/editar/:id" render={(props) => {
                  const conteoPos = props.location.pathname.replace("/editar/", "");
                  const conteo = conteos.find(el => el.id == conteoPos);
                  return <EditarConteo conteo={conteo} />
                }} />
                <Route path="/nuevo">
                  <EditarConteo conteo={{}} />
                </Route>
                <Route path="/contador/:id" render={(props) => {
                  const conteoPos = props.location.pathname.replace("/contador/", "");
                  const conteo = conteos.find(el => el.id == conteoPos);
                  return <Contador
                    conteoInfo={conteo}
                    setValue={(tipo_vehiculo, valor) => {
                      // TODO guardar en base de datos 
                      conteo.contadores[tipo_vehiculo] = valor
                    }}
                  />
                }} />
                <Route path="/">
                  <ListaConteos conteos={conteos} />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ver Información Legal</Footer>
          </Layout >
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
