import React, { useState } from 'react';
import { Button, InputNumber, List } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined, CarOutlined } from '@ant-design/icons';

function ContadorVehiculo({ tipo_vehiculo, valor, setValue, backGroundColor }) {

    const [counter, setCounter] = useState(valor)

    function add() {
        let newCounter = counter + 1
        setValue(tipo_vehiculo, newCounter)
        setCounter(newCounter)
    }

    function substract() {
        let newCounter = counter - 1
        setValue(tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
    }

    function onChange(value) {
        let newCounter = value
        setValue(tipo_vehiculo, newCounter)
        if (newCounter >= 0)
            setCounter(newCounter)
    }

    return (
        <List.Item
            key={tipo_vehiculo}
            actions={[
                <InputNumber size="large" defaultValue={counter} value={counter} onChange={onChange}  ></InputNumber>,
                <Button type="primary" icon={<PlusSquareOutlined />} size="large" onClick={() => add()} />,
                <Button type="second" icon={<MinusSquareOutlined />} size="default" onClick={() => substract()} />
            ]}
            onClick={() => add()}
            style={{ margin: '0 50px' }}
        >
            <List.Item.Meta
                avatar={
                    <Button style={{ color: '#ffffff', backgroundColor: backGroundColor }} icon={<CarOutlined size="large" />} size="large" onClick={() => add()} />
                }
            />
            <div><h2>{tipo_vehiculo}</h2></div>
        </List.Item>

    )

}

export default ContadorVehiculo;