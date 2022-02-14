import { gql } from "@apollo/client";

export const ALL_PREDIO = gql`
  query MyQuery {
    allPredios(condition: {}) {
      nodes {
        nombre
        nodeId
        municipio
        id
        departamento
        avaluo
      }
    }
  }
`;

export const ADD_PREDIO = gql`
  mutation MyMutation(
    $idPredio: Int!
    $avaluoPredio: Int!
    $nombrePredio: String!
    $departPredio: String!
    $municipioPredio: String!
  ) {
    createPredio(
      input: {
        predio: {
          nombre: $nombrePredio
          departamento: $departPredio
          municipio: $municipioPredio
          avaluo: $avaluoPredio
          id: $idPredio
        }
      }
    ) {
      clientMutationId
    }
  }
`;

export const DELETE_PREDIO = gql`
  mutation MyMutation($id: Int!) {
    deletePredioById(input: { id: $id }) {
      clientMutationId
      deletedPredioId
    }
  }
`;

export const FIND_PREDIO = gql`
  query MyQuery($idPred: Int!) {
    predioById(id: $idPred) {
      id
      municipio
      departamento
      avaluo
      nombre
    }
  }
`;

export const EDIT_PREDIO = gql`
  mutation MyMutation(
    $id: Int!
    $avaluo: Int!
    $departamento: String!
    $municipio: String!
    $nombre: String!
  ) {
    updatePredioById(
      input: {
        predioPatch: {
          avaluo: $avaluo
          departamento: $departamento
          municipio: $municipio
          nombre: $nombre
        }
        id: $id
      }
    ) {
      clientMutationId
      predio {
        avaluo
        departamento
        id
        municipio
        nombre
      }
    }
  }
`;

export const ALL_TERRENO = gql`
  query MyQuery($predioid: Int!) {
    allTerrenos(condition: { predioId: $predioid }) {
      nodes {
        aguacerca
        areac
        construido
        id
        predioId
        regimen
        valor
      }
    }
  }
`;

export const ALL_CONSTRU = gql`
  query MyQuery($idconstru: Int!) {
    predioById(id: $idconstru) {
      construccionsByPredioId {
        nodes {
          areac
          dir
          id
          pisos
          predioId
          tipo
        }
      }
    }
  }
`;

export const ADD_CONSTRU = gql`
  mutation MyMutation(
    $idConstru: Int!
    $pisosConstru: Int!
    $areaConstru: Int!
    $dirConstru: String!
    $predioID: Int!
    $tipoConstru: String!
  ) {
    createConstruccion(
      input: {
        construccion: {
          areac: $areaConstru
          dir: $dirConstru
          predioId: $predioID
          pisos: $pisosConstru
          tipo: $tipoConstru
          id: $idConstru
        }
      }
    ) {
      clientMutationId
    }
  }
`;
