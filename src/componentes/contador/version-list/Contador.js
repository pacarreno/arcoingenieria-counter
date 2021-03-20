import { List } from 'antd';
import React, { useState } from 'react';
import ContadorVehiculo from './ContadorVehiculo'
import randomColor from "randomcolor";

function Contador(props) {

    const [colors] = useState({
        "autos_liviano": randomColor(),
        "bicicleta": randomColor(),
        "bus": randomColor(),
        "bus_interurbano": randomColor(),
        "camion_2_ejes": randomColor(),
        "camion_cisterna": randomColor(),
        "camion_grano": randomColor(),
        "motos": randomColor(),
        "taxi": randomColor(),
        "taxi_bus": randomColor(),
        "taxi_colectivo": randomColor(),
        "trailer_y_semi": randomColor(),
    }
    );

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
    //genera una lista de colores por cada Key

    //TODO mejorar diseño de botones
    return (
        <>
            <h1 style={{ textAlign: 'center' }} ><strong>Dirección del Conteo:</strong> {props.conteoInfo.nombre}</h1>
            <List
                itemLayout='horizontal'
                dataSource={keys}
                renderItem={element => (
                    <ContadorVehiculo
                        tipo_vehiculo={element}
                        valor={props.conteoInfo.contadores[element]}
                        setValue={(tipo_vehiculo, valor) => props.setValue(tipo_vehiculo, valor)}
                        backGroundColor={colors[element]} />
                )}
            />
        </>
    );
}

export default Contador;