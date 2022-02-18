import { useMutation, useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeValConstru } from "../../../redux/slices/construccionValSlice";
import { ALL_TERRENO, DELETE_TERRENO } from "../../../graphql/queries";
import {
  toogleCreateTerreno,
  toogleViewTerreno,
  toogleEditarTerreno,
} from "../../../redux/slices/stateSlice";
import AddTerreno from "./addTerreno";
import EditarTerreno from "./editarTerreno";
import { changeTerrenoVal } from "../../../redux/slices/predioValSlice";

const Terreno = () => {
  //dispatch
  const dispatch = useDispatch();

  //onClick para abrir ventana de terrenos
  const addTerreno = () => {
    dispatch(toogleCreateTerreno());
  };

  const editarTerreno = (e) => {
    console.log("e.target.id", e.target.id);
    dispatch(changeTerrenoVal(e.target.id));
    dispatch(toogleEditarTerreno());
  };

  //Traer estado para ventana de crear terreno
  const createTerrenoState = useSelector(
    (state) => state.stateELE.createTerreno
  );

  //traer estado para ventana de edicion de terreno
  const editTerrenoState = useSelector((state) => state.stateELE.editTerrState);

  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);

  //Genera los resultados del query de busqueda de terreno por ID

  const valorInt = parseInt(valoresEdit.idPredio);
  const [eliminarTerrenoMutation, { dataElim, errorElim, loadingElim }] =
    useMutation(DELETE_TERRENO);

  const eliminarTerreno = (e) => {
    eliminarTerrenoMutation({
      variables: { id: parseInt(e.target.id) },
      refetchQueries: [
        {
          query: ALL_TERRENO,
          variables: { id: parseInt(valoresEdit.idPredio) },
        },
      ],
    });

    if (loadingElim) {
      return "Cargando";
    }

    if (errorElim) {
      window.alert("Error Eliminando Construccion");
    } else {
      window.alert("Registro Eliminado Exitosamente");
    }
  };

  // Fetch todos las construcciones asociadas al ID_PREDIO

  const { data, error, loading } = useQuery(ALL_TERRENO, {
    variables: { id: valorInt },
  });
  if (loading) {
    return "loading...";
  }
  if (error) {
    console.log("Error en la solicitud: ", error);
  }

  const wholedata = data.predioById.terrenosByPredioId.nodes;
  console.log("Whole Data length . ", Object.keys(wholedata).length);
  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Terreno en el predio numero : {valoresEdit.idPredio} </b>
        </h3>
      </div>
      <div className={`${styles.construRow} w-100 d-flex `}>
        {wholedata.map((terrenoItem) => (
          <div key={terrenoItem.id} className={`${styles.construCard} `}>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Id:</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{terrenoItem.id}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Construido:</b>
              </h5>
              {terrenoItem.construido ? (
                <h5 className={`w-40 ${styles.lineText}`}> SI </h5>
              ) : (
                <h5 className={`w-40 ${styles.lineText}`}> NO </h5>
              )}
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Area Construida :</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{terrenoItem.areac}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Agua cerca:</b>
              </h5>
              {terrenoItem.aguacerca ? (
                <h5 className={`w-40 ${styles.lineText}`}> SI </h5>
              ) : (
                <h5 className={`w-40 ${styles.lineText}`}> NO </h5>
              )}
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Urbanidad: </b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>
                {terrenoItem.regimen}
              </h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Valor (COP): </b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{terrenoItem.valor}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <div
                id={terrenoItem.id}
                onClick={(e) => editarTerreno(e)}
                className={`btn ${styles.lineBtn} btn-success`}
              >
                Editar
              </div>
              <div
                id={terrenoItem.id}
                onClick={(e) => eliminarTerreno(e)}
                className={`btn ${styles.lineBtn} btn-danger`}
              >
                Eliminar
              </div>
            </div>
          </div>
        ))}
        {Object.keys(wholedata).length == 0 && (
          <div
            onClick={(e) => addTerreno(e)}
            className={`${styles.construCard}  `}
          >
            <div
              className={`w-100 h-100  d-flex justify-content-center align-items-center`}
            >
              <h4>+ </h4>

              <h4> Agregar Terreno </h4>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => dispatch(toogleViewTerreno())}
        className={`btn bg-danger mt-3`}
      >
        Cancelar
      </div>
      {editTerrenoState && <EditarTerreno />}

      {createTerrenoState && <AddTerreno />}
    </div>
  );
};

export default Terreno;
