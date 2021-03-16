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
    const handleClick = (conteo) => { try { history.push(`/editar/${conteo._id}`); } finally { } }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const handleDeleteConteo = (e, conteo) => {

        try {
            setLoading2(true)
            deleteConteo(conteo)
        } finally {
            setLoading2(false)
        }
        e.stopPropagation();
    }

    //TODO mejorar diseño de lista
    //TODO paginacion
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
                    <Button type="primary" loading={loading2} onClick={(e) => { handleDeleteConteo(e, item); }} >Eliminar</Button>
                </ List.Item>
            )}
        />
    );
}

export default ListaConteos;