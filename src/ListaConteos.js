import React, { useState } from 'react';
import { List, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import useConteos from "./graphql/useConteos";
import Loading from "./componentes/Loading";
import moment from 'moment';

function ListaConteos(props) {

    const history = useHistory();
    const handleClick = (conteo) => { history.push(`/editar/${conteo.id}`); }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const { conteos, addConteo, loading } = useConteos();
    /*
        if (!loading) {
            let i = 1;
            addConteo({
                id: i + 1,
                nombre: `Conteo ${i}`,
                fecha: moment().add(i, 'd').format("DD-MM-YYYY"),
                interseccion: `Intersección ${i}`,
                movimiento: `Movimiento ${i}`,
                sentido: `Sentido ${i}`,
                contadores: {
                    autos_liviano: Math.floor(Math.random() * 10),
                    taxi: Math.floor(Math.random() * 10) + 1,
                    taxi_colectivo: Math.floor(Math.random() * 10),
                    bus: Math.floor(Math.random() * 10),
                    taxi_bus: Math.floor(Math.random() * 10),
                    bus_interurbano: Math.floor(Math.random() * 10),
                    camion_2_ejes: Math.floor(Math.random() * 10),
                    trailer_y_semi: Math.floor(Math.random() * 10),
                    camion_cisterna: Math.floor(Math.random() * 10),
                    camion_grano: Math.floor(Math.random() * 10),
                    motos: Math.floor(Math.random() * 10),
                    bicicleta: Math.floor(Math.random() * 10)
                }
            })
        }
    */
    return loading ? (
        <Loading />
    ) : (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={conteos}
                renderItem={item => (
                    <List.Item
                        key={item.nombre}
                        onClick={() => handleClick(item)}
                    >
                        <List.Item.Meta
                            title={item.nombre}
                            description={`fecha ${item.fecha} ${item.interseccion} ${item.movimiento} ${item.sentido}`}
                        />
                        {item.nombre}
                    </List.Item>
                )}
            />
        );
}

export default ListaConteos;