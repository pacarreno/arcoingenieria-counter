import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

function EditarConteo(props) {

    const [conteo, setConteo] = useState(props.conteo)

    function handleChangeNombre(e) { setConteo({ ...conteo, nombre: e.target.value }) }
    function handleChangeInterseccion(e) { setConteo({ ...conteo, interseccion: e.target.value }) }
    function handleChangeFecha(e) { setConteo({ ...conteo, fecha: e.target.value }) }
    function handleChangeMovimiento(e) { setConteo({ ...conteo, movimiento: e.target.value }) }
    function handleChangeSentido(e) { setConteo({ ...conteo, sentido: e.target.value }) }
    const history = useHistory();
    const handleClick = () => {
        // TODO guardar en base de datos en caso que sea nuevo
        history.push(`/contador/${conteo._id}`);
    }

    return (
        <>
            <Row>
                <Col span={4} offset={5} >
                    Nombre del conteo :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={props.conteo.nombre} onInput={handleChangeNombre} placeholder="Nombre de conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Intersección :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={props.conteo.interseccion} onInput={handleChangeInterseccion} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Fecha :
                </Col>
                <Col span={4} >
                    <DatePicker defaultValue={moment()} style={{ width: "400px" }} size="middle" type="text" onInput={handleChangeFecha} value={props.conteo.fecha ? moment(props.conteo.fecha, "DD-MM-YYYY") : null} placeholder="Fecha Conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Movimiento :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={props.conteo.movimiento} onInput={handleChangeMovimiento} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col span={4} offset={5} >
                    Sentido :
                </Col>
                <Col span={4} >
                    <Input style={{ width: "400px" }} size="middle" type="text" value={props.conteo.sentido} onInput={handleChangeSentido} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row >
                <Col span={4} offset={9}  >
                    <Button type="primary" onClick={() => handleClick()} >{!props.conteo.id ? "Iniciar nuevo Conteo" : "Ver Conteo"}</Button>
                </Col>
            </Row>
        </>
    );
}

export default EditarConteo;