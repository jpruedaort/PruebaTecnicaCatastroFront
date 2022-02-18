import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ALL_PREDIO, DELETE_PREDIO } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { toogleEditar } from "../../../redux/slices/stateSlice";
import { changeVal } from "../../../redux/slices/predioValSlice";
import { toogleViewConstruccion } from "../../../redux/slices/stateSlice";
import { toogleViewTerreno } from "../../../redux/slices/stateSlice";

const PredioList = () => {
  //Dispatch Redux
  const dispatch = useDispatch();

  //Generar la lista de predios (Graphql)
  const { data, loading, error } = useQuery(ALL_PREDIO);

  //Generar funcion para mutacion de GraphQl Borrar Registro de Predio ( ON DELETE CASCADE)
  const [deletePredioMutate, { dataDel, loadingDel, errorDel }] =
    useMutation(DELETE_PREDIO);

  //onClick Event para borrar Predio
  const deletePredioReg = (e) => {
    deletePredioMutate({
      variables: {
        id: parseInt(e.target.id),
      },
      refetchQueries: [{ query: ALL_PREDIO }],
    });
    if (!dataDel) {
      window.alert("Predio Eliminado Exitosamente");
    } else {
      window.alert("Error Elimando Predio");
    }
  };

  //onClick event para abrir ventana Editar
  const openEditWin = (e) => {
    dispatch(changeVal(e.target.id));
    dispatch(toogleEditar());
  };

  //onClick abrir ventana de construccion
  const openConstruccion = (e) => {
    console.log("idselect:", e.target.id);
    dispatch(changeVal(e.target.id));
    dispatch(toogleViewConstruccion());
  };

  //onClick Abrir ventana de terreno
  const openTerreno = (e) => {
    dispatch(changeVal(e.target.id));
    dispatch(toogleViewTerreno());
  };

  if (loading) {
    return <h1>Cargando Ventana de Terreno</h1>;
  }

  if (error) {
    return <h1>Error Cargando Ventana de Terreno</h1>;
  }

  return (
    <div>
      {data.allPredios.nodes.map((predio) => (
        <div key={predio.id} className={` ${styles.trayelement}`}>
          <div className="row">
            <div className="col-4 d-flex flex-column justify-content-around ">
              <div>
                <b>Nombre:</b> <div>{predio.nombre}</div>
              </div>
              <div>
                <b>Avaluo:</b> <div>{predio.avaluo} COP </div>
              </div>
            </div>
            <div className={`col-4  d-flex flex-column justify-content-around`}>
              <div>
                <b>Departamento:</b> <div>{predio.departamento}</div>
              </div>
              <div>
                <b>Municipio:</b> <div>{predio.municipio}</div>
              </div>
              <div>
                <b>Numero Catastro:</b> <div> {predio.id}</div>
              </div>
            </div>
            <div className={`col-4  d-flex flex-column justify-content-around`}>
              <div className={`btn ${styles.featurebutton}`}>Propietarios</div>
              <div
                id={predio.id}
                onClick={(e) => openTerreno(e)}
                className={`btn ${styles.featurebutton}`}
              >
                Terrenos
              </div>
              <div
                id={predio.id}
                onClick={(e) => openConstruccion(e)}
                className={`btn ${styles.featurebutton}`}
              >
                Construcciones
              </div>
              <div
                id={predio.id}
                onClick={(e) => openEditWin(e)}
                className={`btn ${styles.featurebutton}`}
              >
                Editar
              </div>
              <div
                id={predio.id}
                onClick={(e) => deletePredioReg(e)}
                className={`btn ${styles.featurebutton}`}
              >
                Eliminar
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredioList;
