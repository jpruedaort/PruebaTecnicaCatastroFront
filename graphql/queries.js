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
      nombre
      municipio
      id
      departamento
      avaluo
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

export const DELETE_CONSTRU = gql`
  mutation MyMutation($id: Int!) {
    deleteConstruccionById(input: { id: $id }) {
      clientMutationId
      deletedConstruccionId
    }
  }
`;

export const FIND_CONSTRU = gql`
  query MyQuery($id: Int!) {
    construccionById(id: $id) {
      areac
      dir
      id
      pisos
      tipo
    }
  }
`;

export const EDIT_CONSTRU = gql`
  mutation MyMutation(
    $idconstru: Int!
    $area: Int!
    $dir: String!
    $pisos: Int!
    $tipo: String!
  ) {
    updateConstruccionById(
      input: {
        construccionPatch: {
          areac: $area
          dir: $dir
          pisos: $pisos
          tipo: $tipo
        }
        id: $idconstru
      }
    ) {
      clientMutationId
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

export const ALL_TERRENO = gql`
  query MyQuery($id: Int!) {
    predioById(id: $id) {
      terrenosByPredioId {
        nodes {
          aguacerca
          areac
          construido
          id
          nodeId
          predioId
          regimen
          valor
        }
      }
    }
  }
`;

export const ADD_TERRENO = gql`
  mutation MyMutation(
    $id: Int!
    $areac: Int!
    $valor: Int!
    $aguacerca: Boolean!
    $regimen: TerrenoRegimen!
    $construida: Boolean!
    $predioId: Int!
  ) {
    createTerreno(
      input: {
        terreno: {
          id: $id
          areac: $areac
          valor: $valor
          aguacerca: $aguacerca
          regimen: $regimen
          construido: $construida
          predioId: $predioId
        }
      }
    ) {
      clientMutationId
    }
  }
`;

export const DELETE_TERRENO = gql`
  mutation MyMutation($id: Int!) {
    deleteTerrenoById(input: { id: $id }) {
      clientMutationId
      deletedTerrenoId
    }
  }
`;

export const FIND_TERRENO = gql`
  query MyQuery($id: Int!) {
    terrenoById(id: $id) {
      aguacerca
      areac
      construido
      id
      predioId
      regimen
      valor
    }
  }
`;

export const EDIT_TERRENO = gql`
  mutation MyMutation(
    $id: Int!
    $aguacerca: Boolean!
    $areac: Int!
    $construido: Boolean!
    $regimen: TerrenoRegimen!
    $valor: Int!
  ) {
    updateTerrenoById(
      input: {
        terrenoPatch: {
          aguacerca: $aguacerca
          areac: $areac
          construido: $construido
          regimen: $regimen
          valor: $valor
        }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`;
