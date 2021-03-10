import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

import useConteos from "./graphql/useConteos";
import { useRealmApp } from "./RealmApp";

function EditarConteo(props) {

    const app = useRealmApp();
    const [conteo, setConteo] = useState(props.conteo)
    const { addConteo } = useConteos();

    function handleChangeNombre(e) { setConteo({ ...conteo, nombre: e.target.value }) }
    function handleChangeInterseccion(e) { setConteo({ ...conteo, interseccion: e.target.value }) }
    function handleChangeFecha(e) { setConteo({ ...conteo, fecha: e.target.value }) }
    function handleChangeMovimiento(e) { setConteo({ ...conteo, movimiento: e.target.value }) }
    function handleChangeSentido(e) { setConteo({ ...conteo, sentido: e.target.value }) }
    const history = useHistory();
    const handleClick = async () => {
        if (!conteo._id) {
            try {
                const data = await addConteo(conteo, app.currentUser.id)
                history.push(`/contador/${data._id}`);
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        }
        history.push(`/contador/${conteo._id}`);
    }

    return (
        <>
            <Row>
                <Col span={4} offset={5} >
                    Nombre del conteo :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={conteo.nombre} onInput={handleChangeNombre} placeholder="Nombre de conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Intersección :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={conteo.interseccion} onInput={handleChangeInterseccion} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Fecha :
                </Col>
                <Col span={4} >
                    <DatePicker defaultValue={moment()} style={{ width: "400px" }} size="middle" type="text" onInput={handleChangeFecha} value={conteo.fecha ? moment(conteo.fecha, "DD-MM-YYYY") : null} placeholder="Fecha Conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Movimiento :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={conteo.movimiento} onInput={handleChangeMovimiento} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Sentido :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={conteo.sentido} onInput={handleChangeSentido} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row >
                <Col span={4} offset={9}  >
                    <Button type="primary" onClick={() => handleClick()} >{!conteo._id ? "Iniciar nuevo Conteo" : "Ver Conteo"}</Button>
                </Col>
            </Row>
        </>
    );
}

export default EditarConteo;