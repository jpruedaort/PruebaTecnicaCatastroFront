import { gql } from "@apollo/client";

export const ALL_PREDIO = gql`
  query MyQuery {
    allPredios {
      nodes {
        avaluoPredio
        departPredio
        idPredio
        municipioPredio
        nombrePredio
      }
    }
  }
`;

export const ADD_PREDIO = gql`
  mutation MyMutation(
    $idPredio: Int!
    $avaluoPredio: Float!
    $nombrePredio: String!
    $departPredio: String!
    $municipioPredio: String!
  ) {
    createPredio(
      input: {
        predio: {
          nombrePredio: $nombrePredio
          departPredio: $departPredio
          municipioPredio: $municipioPredio
          avaluoPredio: $avaluoPredio
          idPredio: $idPredio
        }
      }
    ) {
      clientMutationId
    }
  }
`;

export const DELETE_PREDIO = gql`
  mutation MyMutation($id: Int!) {
    deletePredioByIdPredio(input: { idPredio: $id }) {
      predio {
        departPredio
        idPredio
        municipioPredio
        nodeId
        nombrePredio
      }
    }
  }
`;
