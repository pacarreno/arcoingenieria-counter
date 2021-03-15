import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input, DatePicker, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from "lodash";

import useConteos from "./graphql/useConteos";
import { useRealmApp } from "./RealmApp";

const { Option } = Select;

function EditarConteo(props) {

    const app = useRealmApp();
    const [loading, setLoading] = useState(false)
    const [conteo, setConteo] = useState(props.conteo)
    const [tipoCruce, setTipoCruce] = useState(conteo.interseccion)
    const { addConteo, updateConteo } = useConteos();

    function handleChangeNombre(e) { setConteo({ ...conteo, nombre: e.target.value }) }
    function handleChangeInterseccion(value) { setConteo({ ...conteo, interseccion: value }); setTipoCruce(value) }
    function handleChangeFecha(date, dateString) { if (!date) return; const newObject = { ...conteo, fecha: date.toISOString() }; setConteo(newObject); }
    function handleChangeMovimiento(e) { setConteo({ ...conteo, movimiento: e.target.value }) }
    function handleChangeSentido(e) { setConteo({ ...conteo, sentido: e.target.value }) }
    const history = useHistory();
    const handleClick = async () => {
        try {
            setLoading(true)
            if (!conteo._id) {

                const data = await addConteo(conteo, app.currentUser.id)
                history.push(`/contador/${data._id}`);
            } else {
                const newObject = _.cloneDeep(conteo);
                await updateConteo(conteo, newObject)
                history.push(`/contador/${conteo._id}`);
            }
            return;
        } catch (error) {
            console.log(error);
            return;
        } finally {
            setLoading(false)
        }
    }

    return (
        <> {console.log(conteo.fecha)}
            <Row>
                <Col span={4} offset={5} >
                    Dirección del conteo :
                </Col>
                <Col span={5} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.nombre} onInput={handleChangeNombre} placeholder="Nombre de conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Intersección :
                </Col>
                <Col span={5} >
                    {
                        //<Input style={{ width: "400px" }} size="middle" type="text" value={conteo.interseccion} onInput={handleChangeInterseccion} placeholder="Nombre de la intersección" /> <br /> <br />
                    }
                    <Select style={{ width: "100%" }} size="middle" onChange={handleChangeInterseccion} placeholder="Seleccione el tipo de intersección" defaultValue={conteo.interseccion} >
                        <Option value=""></Option>
                        <Option value="cruce-t1">cruce-t1</Option>
                        <Option value="cruce-t2">cruce-t2</Option>
                        <Option value="cruz">cruz</Option>
                        <Option value="curva1">curva1</Option>
                        <Option value="curva2">curva2</Option>
                        <Option value="rotonda">rotonda</Option>
                    </Select> <br /> <br />
                </Col>
                <Col span={4} offset={1} >
                    <img
                        alt={tipoCruce}
                        src={`/img/${tipoCruce != undefined ? tipoCruce : 'blank'}.jpg`}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Fecha :
                </Col>
                <Col span={5} >
                    <DatePicker
                        defaultValue={conteo.fecha ? moment(conteo.fecha, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : moment()}
                        style={{ width: "100%" }}
                        size="middle"
                        onChange={handleChangeFecha}
                        format="DD-MM-YYYY"
                        placeholder="Fecha Conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Movimiento :
                </Col>
                <Col span={5} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.movimiento} onInput={handleChangeMovimiento} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Sentido :
                </Col>
                <Col span={5} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.sentido} onInput={handleChangeSentido} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row >
                <Col span={4} offset={9}  >
                    <Button type="primary" loading={loading} onClick={() => handleClick()} >{!conteo._id ? "Iniciar nuevo Conteo" : "Ver Conteo"}</Button>
                </Col>
            </Row>
        </>
    );
}

export default EditarConteo;