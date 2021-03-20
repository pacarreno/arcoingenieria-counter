import React, { useState } from 'react';
import { List, Popconfirm, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import useConteos from "../../graphql/useConteos";
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

function ConteoItem({ conteo }) {

    const [loading2, setLoading2] = useState(false)
    const { deleteConteo } = useConteos();
    const history = useHistory();


    const handleClick = (e, conteo) => {
        history.push(`/editar/${conteo._id}`);
    }

    const handleDeleteConteo = (e, conteo) => {
        try {
            setLoading2(true)
            deleteConteo(conteo)
        } finally {
            setLoading2(false)
        }
        e.stopPropagation();
    }

    return (
        <List.Item
            className="list-item"
            key={conteo._id}
            onClick={(e) => handleClick(e, conteo)}
            actions={
                [
                    <Popconfirm
                        placement="rightTop"
                        title="¿Seguro que quieres eliminar el conteo?"
                        onConfirm={(e) => handleDeleteConteo(e, conteo)}
                        onCancel={(e) => { e.stopPropagation() }}
                    >
                        <Button size="large" type="primary" icon={<DeleteOutlined />} loading={loading2} onClick={(e) => { e.stopPropagation() }} />
                    </Popconfirm>
                ]
            }
        >
            <List.Item.Meta
                title={`${conteo.nombre} -     intersección: ${conteo.interseccion} ${conteo.movimiento} ${conteo.sentido}`}
                description={
                    `Fecha conteo: ${moment(conteo.fecha, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD-MM-YYYY')} `
                }
            />

        </ List.Item >
    );

}

export default ConteoItem;