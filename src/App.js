import './App.css';
import React from 'react';
import { Route, Switch, useHistory, Link } from 'react-router-dom';
import Contador from './Contador';
import NotFound from './NotFound';
import EditarConteo from './EditarConteo';
import ListaConteos from './ListaConteos';
import { Layout, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useConteos from "./graphql/useConteos";
import _ from "lodash";

const { Header, Content, Footer } = Layout;
//const { Search } = Input;

function App() {

  const { conteos, loading, updateConteo } = useConteos();
  const history = useHistory();
  const handleClick = () => { history.push('/nuevo'); }

  return (
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
      <Content style={{ marginTop: 70 }}>
        <Switch>
          <Route path="/editar/:id" render={(props) => {
            const conteoId = props.location.pathname.replace("/editar/", "");
            const conteo = conteos.find(el => el._id === conteoId);
            if (!_.isObject(conteo))
              return <NotFound />
            return <EditarConteo conteo={conteo} />
          }} />
          <Route path="/nuevo">
            <EditarConteo conteo={{}} />
          </Route>
          <Route path="/contador/:id" render={(props) => {
            const conteoId = props.location.pathname.replace("/contador/", "");
            const conteoPos = conteos.findIndex(el => el._id === conteoId);
            const conteo = conteos[conteoPos];
            if (!_.isObject(conteo))
              return <NotFound />
            return <Contador
              conteoInfo={conteo}
              setValue={(tipo_vehiculo, valor) => {
                const newObject = _.cloneDeep(conteo);
                newObject["contadores"][tipo_vehiculo] = valor;
                updateConteo(conteo, newObject)
              }
              }
            />
          }} />
          <Route path="/">
            <ListaConteos conteos={conteos} loading={loading} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ver Información Legal</Footer>
    </Layout >
  );
}

export default App;
