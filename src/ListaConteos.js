import React from 'react';
import { List } from 'antd';
import Loading from "./componentes/Loading";
import ConteoItem from "./ConteoItem";

function ListaConteos({ conteos, loading }) {

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
                <ConteoItem conteo={item} />
            )}
        />
    );
}

export default ListaConteos;