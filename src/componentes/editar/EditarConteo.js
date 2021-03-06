import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Button, Input, DatePicker, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from "lodash";

import useConteos from "../../graphql/useConteos";
import { useRealmApp } from "../../RealmApp";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 6, offset: 4 }} >
                    Dirección del conteo :
                </Col>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 10 }} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.nombre} onInput={handleChangeNombre} placeholder="Nombre de conteo" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 6, offset: 4 }} >
                    Intersección :
                </Col>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 10 }} >
                    <Select style={{ width: "100%" }} size="middle" onChange={handleChangeInterseccion} placeholder="Seleccione el tipo de intersección" defaultValue={conteo.interseccion} >
                        <Option value=""></Option>
                        <Option value="cruce-t1">cruce-t1</Option>
                        <Option value="cruce-t2">cruce-t2</Option>
                        <Option value="cruz">cruz</Option>
                        <Option value="curva1">curva1</Option>
                        <Option value="curva2">curva2</Option>
                        <Option value="rotonda">rotonda</Option>
                    </Select> <br /> <br />
                    <img
                        alt={tipoCruce}
                        src={`/img/${tipoCruce !== undefined ? tipoCruce : 'blank'}.jpg`}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 6, offset: 4 }} >
                    Fecha :
                </Col>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 10 }} >
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
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 6, offset: 4 }} >
                    Movimiento :
                </Col>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 10 }} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.movimiento} onInput={handleChangeMovimiento} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 6, offset: 4 }} >
                    Sentido :
                </Col>
                <Col xs={{ span: 14, offset: 2 }} md={{ span: 10 }} >
                    <Input style={{ width: "100%" }} size="middle" type="text" value={conteo.sentido} onInput={handleChangeSentido} placeholder="Nombre de la intersección" /> <br /> <br />
                </Col>
            </Row>
            <Row >
                <Col span={4} offset={9}  >
                    <Button type="primary" loading={loading} onClick={() => handleClick()} >{!conteo._id ? "Iniciar nuevo Conteo" : "Ver Conteo"}</Button>
                </Col>
                {
                    conteo._id &&
                    <Button variant="warning" onClick={(e) => exportToCSV(Object.entries(conteo.contadores), "ejemplo")}>Export</Button>
                }
            </Row>
        </>
    );
}

export default EditarConteo;