import React, { useState } from 'react';
import {Button} from 'antd';
import {PlusSquareOutlined,MinusSquareOutlined} from '@ant-design/icons';

function ContadorVehiculo(props){

    const [counter,setCounter] = useState( props.valor )
    
    function add(){
        let newCounter = counter + 1
        setCounter( newCounter )
    }

    function substract(){
        let newCounter = counter - 1
        if( newCounter >= 0 )
            setCounter( newCounter )
    }

    return (
        <div key={props.tipo_vehiculo} className="card" >
            <div className="large-font" >{counter}</div>
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