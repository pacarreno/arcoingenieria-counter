import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

function ContadorVehiculo(props) {

    const [counter, setCounter] = useState(props.valor)

    function add() {
        let newCounter = counter + 1
        props.setValue(props.tipo_vehiculo, newCounter)
        setCounter(newCounter)
    }

    function substract() {
        let newCounter = counter - 1
        props.setValue(props.tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
    }

    function onChange(value) {
        let newCounter = value
        props.setValue(props.tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
    }

    return (
        <div key={props.tipo_vehiculo} className="card" >
            <InputNumber size="large" defaultValue={counter} value={counter} onChange={onChange}  ></InputNumber><br />
            <Button type="primary" icon={<PlusSquareOutlined />} size="large" onClick={() => add()} />
            <Button type="second" icon={<MinusSquareOutlined />} size="default" onClick={() => substract()} />
            <div>{props.tipo_vehiculo}</div>
            <img
                alt={props.tipo_vehiculo}
                src={`/img/${props.tipo_vehiculo}.jpg`}
                onClick={() => add()}
            />
        </div>
    )

}

export default ContadorVehiculo;