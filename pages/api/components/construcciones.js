import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ALL_CONSTRU, ALL_TERRENO } from "../../../graphql/queries";
import {
  toogleConstruccion,
  toogleViewConstruccion,
} from "../../../redux/slices/stateSlice";
import AddConstru from "./addConstru";

const Construccion = () => {
  //dispatch
  const dispatch = useDispatch();

  const addConstru = () => {
    dispatch(toogleConstruccion());
  };

  //
  const addConstruState = useSelector(
    (state) => state.stateELE.createConstruccion
  );

  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);

  //Genera los resultados del query de busqueda de predio por ID

  const valorInt = parseInt(valoresEdit.idPredio);
  const { data, error, loading } = useQuery(ALL_CONSTRU, {
    variables: { idconstru: valorInt },
  });
  if (loading) {
    return "loading...";
  }
  if (error) {
    console.log("Error en la solicitud");
  }

  //On Click event para agregar construccion

  console.log("DATTATAA:, ", data.predioById.construccionsByPredioId.nodes);
  const wholedata = data.predioById.construccionsByPredioId.nodes;

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Construcciones en el Predio numero : {valoresEdit.idPredio} </b>
        </h3>
      </div>
      <div className={`${styles.construRow} w-100 d-flex `}>
        {wholedata.map((construItem) => (
          <div key={construItem.id} className={`${styles.construCard} `}>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Id:</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{construItem.id}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Area(m2):</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{construItem.areac}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Dirección:</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{construItem.dir}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Pisos:</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{construItem.pisos}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <h5 className={`w-40 ${styles.lineText}`}>
                <b>Tipo:</b>
              </h5>
              <h5 className={`w-40 ${styles.lineText}`}>{construItem.tipo}</h5>
            </div>
            <div className={` ${styles.lineDisplay} d-flex`}>
              <div className={`btn ${styles.lineBtn} btn-success`}>Editar</div>
              <div className={`btn ${styles.lineBtn} btn-danger`}>Eliminar</div>
            </div>
          </div>
        ))}
        <div
          onClick={(e) => addConstru(e)}
          className={`${styles.construCard}  `}
        >
          <div
            className={`w-100 h-100  d-flex justify-content-center align-items-center`}
          >
            <h4>+ </h4>
            <h4> Agregar Construccion</h4>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(toogleViewConstruccion())}
        className={`btn bg-danger`}
      >
        Cancelar
      </div>
      {addConstruState && <AddConstru />}
    </div>
  );
};

export default Construccion;
