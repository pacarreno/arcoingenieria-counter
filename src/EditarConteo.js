import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from "lodash";

import useConteos from "./graphql/useConteos";
import { useRealmApp } from "./RealmApp";

function EditarConteo(props) {

    const app = useRealmApp();
    const [loading, setLoading] = useState(false)
    const [conteo, setConteo] = useState(props.conteo)
    const { addConteo, updateConteo } = useConteos();

    function handleChangeNombre(e) { setConteo({ ...conteo, nombre: e.target.value }) }
    function handleChangeInterseccion(e) { setConteo({ ...conteo, interseccion: e.target.value }) }
    function handleChangeFecha(date, dateString) { if (!date) return; const newObject = { ...conteo, fecha: date.toISOString() }; setConteo(newObject); }
    function handleChangeMovimiento(e) { setConteo({ ...conteo, movimiento: e.target.value }) }
    function handleChangeSentido(e) { setConteo({ ...conteo, sentido: e.target.value }) }
    const history = useHistory();
    const handleClick = async () => {
        if (!conteo._id) {
            try {
                setLoading(true)
                const data = await addConteo(conteo, app.currentUser.id)
                history.push(`/contador/${data._id}`);
                return;
            } catch (error) {
                console.log(error);
                return;
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const newObject = _.cloneDeep(conteo);
                await updateConteo(conteo, newObject)
                history.push(`/contador/${conteo._id}`);
                return;
            } catch (error) {
                console.log(error);
                return;
            } finally {
                setLoading(false)
            }
        }
    }

    // TODO dejar los tipos de intersecciones seleccionables
    return (
        <> {console.log(conteo.fecha)}
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
                    <DatePicker
                        defaultValue={conteo.fecha ? moment(conteo.fecha, 'YYYY-MM-DDTHH:mm:ss.SSSZ') : null}
                        style={{ width: "400px" }}
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
                    <Button type="primary" loading={loading} onClick={() => handleClick()} >{!conteo._id ? "Iniciar nuevo Conteo" : "Ver Conteo"}</Button>
                </Col>
            </Row>
        </>
    );
}

export default EditarConteo;