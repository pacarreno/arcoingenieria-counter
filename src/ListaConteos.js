import React, { useState } from 'react';
import { List, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Loading from "./componentes/Loading";
import useConteos from "./graphql/useConteos";
import moment from 'moment';

function ListaConteos({ conteos, loading }) {

    const { deleteConteo } = useConteos();
    const [loading2, setLoading2] = useState(false)

    const history = useHistory();
    const handleClick = (conteo) => { try { setLoading2(true); history.push(`/editar/${conteo._id}`); } finally { setLoading2(false) } }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    // TODO cambiar al estado loading mientras se borrar
    const handleDeleteConteo = (e, conteo) => {
        e.stopPropagation();
        deleteConteo(conteo)
        return;
    }

    //TODO mejorar diseño de lista
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
                    key={item._id}
                    onClick={() => handleClick(item)}
                >
                    <List.Item.Meta
                        title={item.nombre}
                        description={`fecha ${item.fecha} ${item.interseccion} ${item.movimiento} ${item.sentido}`}
                    />
                    {item.nombre}
                    <Button type="primary" loading={loading2} onClick={(e) => { handleDeleteConteo(e, item); return false; }} >Eliminar</Button>
                </ List.Item>
            )}
        />
    );
}

export default ListaConteos;