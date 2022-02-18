import { useMutation } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ALL_TERRENO, ADD_TERRENO } from "../../../graphql/queries";
import { useDispatch } from "react-redux";
import {
  toogleConstruccion,
  toogleCreateTerreno,
} from "../../../redux/slices/stateSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddTerreno = () => {
  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);
  console.log("valoresEdit,", valoresEdit);
  //Dispatch
  const dispatch = useDispatch();

  //Generar funcion para mutacion de GraphQl
  const [addTerrenoMutate, { data, loading, error }] = useMutation(ADD_TERRENO);

  //Estados para cada uno de los campos
  const [idTerreno, setIdTerreno] = useState(0);
  const [consTerreno, setConsTerreno] = useState(true);
  const [areaTerreno, setAreaTerreno] = useState(true);
  const [aguaTerreno, setAguaTerreno] = useState(true);
  const [urbanidadTerreno, setUrbanidadTerreno] = useState("URBANO");
  const [valorTerreno, setValorTerreno] = useState(0);

  //onClick Event
  const onSubmit = (e) => {
    console.log("predioID, ", valoresEdit.idPredio);
    console.log("areac, ", areaTerreno);
    console.log("valor ", valorTerreno);
    console.log("aguacerca, ", aguaTerreno);
    console.log("regimen, ", urbanidadTerreno);
    console.log("construida ", consTerreno);
    console.log("id", idTerreno);
    //Ejecutar mutation para agregar construccion
    addTerrenoMutate({
      variables: {
        predioId: parseInt(valoresEdit.idPredio),
        areac: parseInt(areaTerreno),
        valor: parseInt(valorTerreno),
        aguacerca: aguaTerreno,
        regimen: urbanidadTerreno,
        construida: consTerreno,
        id: parseInt(idTerreno),
      },
      refetchQueries: [
        {
          query: ALL_TERRENO,
          variables: {
            id: parseInt(valoresEdit.idPredio),
          },
        },
      ],
    });

    if (!error) {
      window.alert("Construccíon agregada Correctamente");
    } else {
      window.alert("Error Agregando Construccion, intente de nuevo");
    }
    dispatch(toogleCreateTerreno());
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Agregar terreno al predio: {valoresEdit.idPredio} </b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>ID:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setIdTerreno(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Construido :</b>{" "}
        </label>
        <select
          onChange={(e) => {
            if (toString(e.target.value) == "true") {
              setConsTerreno(true);
            } else {
              setConsTerreno(false);
            }
          }}
        >
          <option value="true">SI</option>
          <option value="false">NO</option>
        </select>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Area Construida (m2):</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setAreaTerreno(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Agua Cerca:</b>{" "}
        </label>
        <select
          onChange={(e) => {
            if (toString(e.target.value) == "true") {
              setAguaTerreno(true);
            } else {
              setAguaTerreno(false);
            }
          }}
        >
          <option value="true">SI</option>
          <option value="false">NO</option>
        </select>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          <b>Urbanidad:</b>{" "}
        </label>
        <select
          onChange={(e) => {
            setUrbanidadTerreno(e.target.value);
          }}
        >
          <option value="URBANO">Urbano</option>
          <option value="RURAL">Rural</option>
        </select>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Valor(COP):</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setValorTerreno(e.target.value);
          }}
          tyoe="number"
        />
      </div>

      <div className={` ${styles.inputLine} justify-content-around mt-4`}>
        <div onClick={(e) => onSubmit(e)} className={`btn btn-success border `}>
          {loading ? <p>Cargando</p> : <p>Agregar</p>}
        </div>
        <div
          onClick={(e) => dispatch(toogleCreateTerreno())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default AddTerreno;
