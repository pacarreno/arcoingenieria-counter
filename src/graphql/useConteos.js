import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import useConteoMutations from "./useConteoMutations";

const useConteos = () => {
    const { conteos, loading } = useAllConteos();
    const { addConteo, updateConteo } = useConteoMutations();
    return {
        loading,
        conteos,
        updateConteo,
        addConteo,
    };
};
export default useConteos;

function useAllConteos() {
    const { data, loading, error } = useQuery(
        gql`
      query {
        conteos {
          id
          nombre
          fecha
          interseccion
          movimiento
          sentido
        }
      }
    `
    );
    if (error) {
        throw new Error(`Failed to fetch conteos: ${error.message}`);
    }

    // If the query has finished, return the tasks from the result data
    // Otherwise, return an empty list
    const conteos = data?.conteos ?? [];
    return { conteos, loading };
}
