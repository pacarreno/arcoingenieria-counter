import React, { useState } from 'react';
import ContadorVehiculo from './ContadorVehiculo'

function Contador(props){


    const [visible,setVisible] = useState(true)
    const [counters] = useState({
        autos_liviano : 0,
        taxi : 0,
        taxi_colectivo : 0,
        bus : 0,
        taxi_bus : 0,
        bus_interurbano : 0,
        camion_2_ejes : 0,
        trailer_y_semi : 0,
        camion_cisterna : 0,
        camion_grano : 0,
        motos : 0,
        bicicleta : 0
    });

    return(
        <div>
            <h2>{props.conteoInfo.nombre}</h2>
            <h3><a  onClick={() => setVisible(!visible) } >Cambiar estado</a></h3>
                <div className="wrapper" >
                    { visible &&
                    Object.keys(counters).map( function (element, i ) {
                            return (
                                <ContadorVehiculo key={i} tipo_vehiculo={element} valor={counters[element]}/>
                            )
                        })
                    }
                </div>
        </div>
    );
}

export default Contador;