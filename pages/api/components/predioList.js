import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ALL_PREDIO, DELETE_PREDIO } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const PredioList = () => {
  //Traer la lisa de predios
  const { data, loading, error } = useQuery(ALL_PREDIO);

  //Generar funcion para mutacion de GraphQl Borrar Registro de Predio ( ON DELETE CASCADE)

  const [deletePredioMutate, { dataDel, loadingDel, errorDel }] =
    useMutation(DELETE_PREDIO);

  //onClick Event
  const deletePredioReg = (e) => {
    console.log(e.target.id);
    deletePredioMutate({
      variables: {
        id: parseInt(e.target.id),
      },
    });
    window.location.reload(false);
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      {data.allPredios.nodes.map((predio) => (
        <div key={predio.idPredio} className={` ${styles.trayelement}`}>
          <div className="row">
            <div className="col-4 d-flex flex-column justify-content-around ">
              <div>
                <b>Nombre:</b> <div>{predio.nombrePredio}</div>
              </div>
              <div>
                <b>Avaluo:</b> <div>{predio.avaluoPredio} COP </div>
              </div>
            </div>
            <div className={`col-4  d-flex flex-column justify-content-around`}>
              <div>
                <b>Departamento:</b> <div>{predio.departPredio}</div>
              </div>
              <div>
                <b>Municipio:</b> <div>{predio.municipioPredio}</div>
              </div>
              <div>
                <b>Numero Catastro:</b> <div> {predio.idPredio}</div>
              </div>
            </div>
            <div className={`col-4  d-flex flex-column justify-content-around`}>
              <div className={`btn ${styles.featurebutton}`}>Propietarios</div>
              <div className={`btn ${styles.featurebutton}`}>Terrenos</div>
              <div className={`btn ${styles.featurebutton}`}>
                Construcciones
              </div>
              <div className={`btn ${styles.featurebutton}`}>Editar</div>
              <div
                id={predio.idPredio}
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
