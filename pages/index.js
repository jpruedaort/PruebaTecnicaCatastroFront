import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "./api/components/ClientOnly";
import PredioList from "./api/components/predioList";
import AddPredio from "./api/components/addPredio";
import AddPropietario from "./api/components/addPropietario";
import EditarPredio from "./api/components/editarPredio";
import { useDispatch, useSelector } from "react-redux";
import {
  tooglePredio,
  toogleCreatePropietario,
} from "../redux/slices/stateSlice";
import Construccion from "../pages/api/components/construcciones";
import Terrenos from "./api/components/terrenos";

export default function Home() {
  //Dispatch
  const dispatch = useDispatch();

  // Invocar estado de creacion de predio, util para la ventana de predio
  const predState = useSelector((state) => state.stateELE.createPredio);
  const editState = useSelector((state) => state.stateELE.editarTerreno);
  const propState = useSelector((state) => state.stateELE.createPropietario);
  const constState = useSelector((state) => state.stateELE.viewConstruccion);
  const terrState = useSelector((state) => state.stateELE.viewTerreno);

  //Onclick event donde aparece la ventana de Agregar predio
  const newReport = (e) => {
    dispatch(tooglePredio());
  };

  const newPropietario = (e) => {
    dispatch(toogleCreatePropietario());
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
            Agregar Predio
          </div>
        </div>
        <div
          className={` ${styles.trayelementblob2} btn d-flex align-item-center justify-content-center bg-white text-dark`}
        >
          <div
            onClick={(e) => newPropietario(e)}
            className="d-flex justify-content-center"
          >
            Agregar Propietario
          </div>
        </div>
        <ClientOnly>
          <PredioList />
        </ClientOnly>
        {terrState && <Terrenos />}
        {constState && <Construccion />}
        {predState && <AddPredio />}
        {editState && <EditarPredio />}
        {propState && <AddPropietario />}
      </div>
    </div>
  );
}
