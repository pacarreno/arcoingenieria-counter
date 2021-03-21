import React, { useState } from 'react';
import { Button, InputNumber, List } from 'antd';
import { MinusOutlined, CarOutlined } from '@ant-design/icons';

function ContadorVehiculo({ tipo_vehiculo, valor, setValue, backGroundColor }) {

    const [counter, setCounter] = useState(valor)

    function add(e) {
        let newCounter = counter + 1
        setValue(tipo_vehiculo, newCounter)
        setCounter(newCounter)
        e.stopPropagation();
    }

    function substract(e) {
        let newCounter = counter - 1
        setValue(tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
        e.stopPropagation();
    }

    function onChange(e, value) {
        let newCounter = value
        setValue(tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
        e.stopPropagation();
    }

    return (
        <List.Item
            key={tipo_vehiculo}
            actions={[
                <InputNumber size="middle" style={{ width: 50 }} defaultValue={counter} value={counter} onChange={(e) => onChange(e)}  ></InputNumber>,
                <Button type="danger" icon={<MinusOutlined />} size="default" onClick={(e) => substract(e)} />
            ]}
            onClick={() => add()}
        >
            <List.Item.Meta
                avatar={
                    <Button style={{ color: '#ffffff', backgroundColor: backGroundColor }} icon={<CarOutlined size="large" />} size="large" onClick={(e) => add(e)} />
                }
            />
            <div><h2>{tipo_vehiculo}</h2></div>
        </List.Item>

    )

}

export default ContadorVehiculo;