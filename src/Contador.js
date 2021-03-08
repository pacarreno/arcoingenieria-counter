import React, { useState } from 'react';
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

    return (
        <div>
            <h2>{props.conteoInfo.nombre}</h2>
            <div className="wrapper" >
                {
                    keys.map(function (element, i) {
                        return (
                            <ContadorVehiculo
                                key={i}
                                tipo_vehiculo={element}
                                valor={props.conteoInfo.contadores[element]}
                                setValue={(tipo_vehiculo, valor) => props.setValue(tipo_vehiculo, valor)} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Contador;