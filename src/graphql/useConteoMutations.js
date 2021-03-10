import { ObjectId } from "bson";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import omitDeep from 'omit-deep';

export default function useConteoMutations() {
  return {
    addConteo: useAddConteo(),
    updateConteo: useUpdateConteo(),
    deleteConteo: useDeleteConteo(),
  };
}

const AddConteoMutation = gql`
  mutation AddConteo($conteo: ConteoInsertInput!) {
    addedConteo: insertOneConteo(data: $conteo) {
      _id
      nombre
      fecha
      interseccion
      movimiento
      sentido
      usuario
      contadores {
        autos_liviano
        bicicleta
        bus
        bus_interurbano
        camion_2_ejes
        camion_cisterna
        camion_grano
        motos
        taxi
        taxi_bus
        taxi_colectivo
        trailer_y_semi
      }
    }
  }
`;

const UpdateConteoMutation = gql`
  mutation UpdateConteo($conteoId: ObjectId!, $updates: ConteoUpdateInput!) {
    updatedConteo: updateOneConteo(query: { _id: $conteoId }, set: $updates) {
      _id
      nombre
      fecha
      interseccion
      movimiento
      sentido
      usuario
      contadores {
        autos_liviano
        bicicleta
        bus
        bus_interurbano
        camion_2_ejes
        camion_cisterna
        camion_grano
        motos
        taxi
        taxi_bus
        taxi_colectivo
        trailer_y_semi
      }
    }
  }
`;

const DeleteConteoMutation = gql`
  mutation DeleteConteo($conteoId: ObjectId!) {
    deletedConteo: deleteOneConteo(query: { _id: $conteoId }) {
      _id
      nombre
      fecha
      interseccion
      movimiento
      sentido
      usuario
      contadores {
        autos_liviano
        bicicleta
        bus
        bus_interurbano
        camion_2_ejes
        camion_cisterna
        camion_grano
        motos
        taxi
        taxi_bus
        taxi_colectivo
        trailer_y_semi
      }
    }
  }
`;

const ConteoFieldsFragment = gql`
  fragment ConteoFields on Conteo {
    _id
    nombre
    fecha
    interseccion
    movimiento
    sentido
    usuario
    contadores {
      autos_liviano
      bicicleta
      bus
      bus_interurbano
      camion_2_ejes
      camion_cisterna
      camion_grano
      motos
      taxi
      taxi_bus
      taxi_colectivo
      trailer_y_semi
    }
  }
`;

function useAddConteo() {
  const [addConteoMutation] = useMutation(AddConteoMutation, {
    // Manually save added Conteos into the Apollo cache so that Conteo queries automatically update
    // For details, refer to https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    update: (cache, { data: { addedConteo } }) => {
      cache.modify({
        fields: {
          conteos: (existingConteos = []) => [
            ...existingConteos,
            cache.writeFragment({
              data: addedConteo,
              fragment: ConteoFieldsFragment,
            }),
          ],
        },
      });
    },
  });

  const addConteo = async (conteo, usuario) => {
    const newConteo = {
      usuario,
      contadores: {
        autos_liviano: 0,
        bicicleta: 0,
        bus: 0,
        bus_interurbano: 0,
        camion_2_ejes: 0,
        camion_cisterna: 0,
        camion_grano: 0,
        motos: 0,
        taxi: 0,
        taxi_bus: 0,
        taxi_colectivo: 0,
        trailer_y_semi: 0,
      },
      ...conteo,
    };
    const result = await addConteoMutation({
      variables: {
        conteo: newConteo,
      }
    });

    return result.data.addedConteo;
  };

  return addConteo;
}

function useUpdateConteo() {
  const [updateConteoMutation] = useMutation(UpdateConteoMutation);
  const updateConteo = async (conteo, updates) => {
    const cleanUpdates = omitDeep(updates, '__typename')
    const { updatedConteo } = await updateConteoMutation({
      variables: { conteoId: conteo._id, updates: cleanUpdates },
    });
    return updatedConteo;
  };
  return updateConteo;
}
// TODO quitar elemento del cache
function useDeleteConteo() {
  const [deleteConteoMutation] = useMutation(DeleteConteoMutation);
  const deleteConteo = async (conteo) => {
    const { deletedConteo } = await deleteConteoMutation({
      variables: { conteoId: conteo._id },
    });
    return deletedConteo;
  };
  return deleteConteo;
}
