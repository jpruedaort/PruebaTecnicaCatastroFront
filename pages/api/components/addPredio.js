import { useMutation } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ADD_PREDIO } from "../../../graphql/queries";
import { useDispatch } from "react-redux";
import { tooglePredio } from "../../../redux/slices/stateSlice";
import { useState } from "react";

const AddPredio = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Generar funcion para mutacion de GraphQl
  const [addPredioMutate, { data, loading, error }] = useMutation(ADD_PREDIO);

  //Estados para cada uno de los campos
  const [idPredio, setIdPredio] = useState(0);
  const [avaluoPredio, setAvaluoPredio] = useState(0);
  const [nombrePredio, setNombrePredio] = useState("");
  const [departPredio, setDepartPredio] = useState("");
  const [municipioPredio, setMunicipioPredio] = useState("");

  //onClick Event
  const onSubmit = (e) => {
    e.preventDefault();
    addPredioMutate({
      variables: {
        idPredio: parseInt(idPredio),
        avaluoPredio: parseInt(avaluoPredio),
        nombrePredio: nombrePredio,
        departPredio: departPredio,
        municipioPredio: municipioPredio,
      },
    });
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Agregar Predio</b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Numero Catastral:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setIdPredio(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Nombre Predio:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setNombrePredio(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Avaluo (COP):</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setAvaluoPredio(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          <b>Departamento:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setDepartPredio(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Municipio:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setMunicipioPredio(e.target.value);
          }}
          type="text"
        />
      </div>

      <div className={` ${styles.inputLine} justify-content-around mt-4`}>
        <div onClick={(e) => onSubmit(e)} className={`btn btn-success border `}>
          {loading ? <p>Cargando</p> : <p>Agregar</p>}
        </div>
        <div
          onClick={(e) => dispatch(tooglePredio())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default AddPredio;
