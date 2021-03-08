import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useConteoMutations from "./useConteoMutations";

const useConteos = () => {
  const { conteos, loading } = useAllConteos();
  const { addConteo, updateConteo, deleteConteo } = useConteoMutations();
  return {
    loading,
    conteos,
    updateConteo,
    addConteo,
    deleteConteo,
  };
};
export default useConteos;

function useAllConteos() {
  const { data, loading, error } = useQuery(
    gql`
      query GetAllConteos {
        conteos {
          _id
          nombre
          fecha
          interseccion
          movimiento
          sentido
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
    `,
  );
  if (error) {
    throw new Error(`Failed to fetch conteos: ${error.message}`);
  }

  // If the query has finished, return the conteos from the result data
  // Otherwise, return an empty list
  const conteos = data?.conteos ?? [];
  return { conteos, loading };
}
