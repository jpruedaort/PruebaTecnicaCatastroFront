import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "./api/components/ClientOnly";
import PredioList from "./api/components/predioList";
import AddPredio from "./api/components/addPredio";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tooglePredio } from "../redux/slices/stateSlice";

export default function Home() {
  // Estados para controlar cuando se despliegan las diferentes ventanas.
  const [addPredioWin, setAddPredioWin] = useState(false);

  //Dispatch
  const dispatch = useDispatch();

  // Invocar estado de creacion de predio, util para la ventana de predio
  const predState = useSelector((state) => state.stateELE.createPredio);
  const propState = useSelector((state) => state.stateELE.createPropietario);

  //Onclick event donde aparece la ventana de Agregar predio
  const newReport = (e) => {
    dispatch(tooglePredio());
    console.log("Estado de Predio", predState);
    console.log("Estado de Propietario", propState);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catastro</title>
        <meta name="Descripción" content="Registo de catastro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.title}>
        <h1>Registro de Catastro</h1>
      </div>
      <div className={` ${styles.tray} `}>
        <div
          className={` ${styles.trayelementblob} btn d-flex align-item-center justify-content-center bg-white text-dark`}
        >
          <div
            onClick={(e) => newReport(e)}
            className="d-flex justify-content-center"
          >
            Agregar Registro
          </div>
        </div>
        <ClientOnly>
          <PredioList />
        </ClientOnly>
        {predState && <AddPredio />}
      </div>
    </div>
  );
}
