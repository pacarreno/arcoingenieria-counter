import { List } from 'antd';
import React from 'react';
import ContadorVehiculo from './ContadorVehiculo'

function Contador(props) {

    const keys = [
        "autos_liviano",
        "bicicleta",
        "bus",
        "bus_interurbano",
        "camion_2_ejes",
        "camion_cisterna",
        "camion_grano",
        "motos",
        "taxi",
        "taxi_bus",
        "taxi_colectivo",
        "trailer_y_semi",
    ]
    //TODO mejorar diseño de botones
    return (
        <>
            <h1 style={{ textAlign: 'center' }} ><strong>Dirección del Conteo:</strong> {props.conteoInfo.nombre}</h1>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={keys}
                renderItem={element => (
                    <List.Item
                        key={element}
                    >
                        <ContadorVehiculo
                            tipo_vehiculo={element}
                            valor={props.conteoInfo.contadores[element]}
                            setValue={(tipo_vehiculo, valor) => props.setValue(tipo_vehiculo, valor)} />
                    </List.Item>
                )}
            />
        </>
    );
}

export default Contador;