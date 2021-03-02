import React, { useState } from 'react';
import ContadorVehiculo from './ContadorVehiculo'

function Contador(props) {

    return (
        <div>
            <h2>{props.conteoInfo.nombre}</h2>
            <div className="wrapper" >
                {
                    Object.keys(props.conteoInfo.contadores).map(function (element, i) {
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