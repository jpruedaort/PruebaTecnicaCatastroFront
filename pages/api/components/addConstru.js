import { useMutation } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ADD_CONSTRU } from "../../../graphql/queries";
import { ALL_CONSTRU } from "../../../graphql/queries";
import { useDispatch } from "react-redux";
import { toogleConstruccion } from "../../../redux/slices/stateSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddConstru = () => {
  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);

  console.log("Valores de edit", valoresEdit);
  //Dispatch
  const dispatch = useDispatch();

  //Generar funcion para mutacion de GraphQl
  const [addConstruMutate, { data, loading, error }] = useMutation(ADD_CONSTRU);

  //Estados para cada uno de los campos
  const [idConstru, setIdConstru] = useState(0);
  const [pisosConstru, setPisosConstru] = useState(0);
  const [areaConstru, setAreaConstru] = useState(0);
  const [dirConstru, setDirConstru] = useState("");
  const [tipoConstru, setTipoConstru] = useState("INDUSTRIAL");

  //onClick Event
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("idConstru", idConstru);
    console.log("pisos", pisosConstru);
    console.log("areaconstru", areaConstru);
    console.log("direcion", dirConstru);
    console.log("tipo", tipoConstru);
    console.log("idPredio", valoresEdit.idPredio);

    //Ejecutar mutatuon para agregar construccion
    addConstruMutate({
      variables: {
        idConstru: parseInt(idConstru),
        pisosConstru: parseInt(pisosConstru),
        areaConstru: parseInt(areaConstru),
        dirConstru: dirConstru,
        predioID: parseInt(valoresEdit.idPredio),
        tipoConstru: tipoConstru,
      },
      refetchQueries: [{ query: ALL_CONSTRU }],
    });

    if (!error) {
      window.alert(error);
    } else {
      window.alert("Error Agregando Construccion, intente de nuevo");
    }
    dispatch(toogleConstruccion());
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Agregar Construccion al predio {valoresEdit.idPredio} </b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Id :</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setIdConstru(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Area(m2):</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setAreaConstru(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Dirección:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setDirConstru(e.target.value);
          }}
          type="text"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          <b>Pisos:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setPisosConstru(e.target.value);
          }}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Tipo:</b>{" "}
        </label>
        <select
          onChange={(e) => {
            setTipoConstru(e.target.value);
          }}
          name="tipo"
        >
          <option value="INDUSTRIAL">Industrial</option>
          <option value="COMERCIAL">Comercial</option>
          <option value="RESIDENCIAL">Residencial</option>
        </select>
      </div>

      <div className={` ${styles.inputLine} justify-content-around mt-4`}>
        <div onClick={(e) => onSubmit(e)} className={`btn btn-success border `}>
          {loading ? <p>Cargando</p> : <p>Agregar</p>}
        </div>
        <div
          onClick={(e) => dispatch(toogleConstruccion())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default AddConstru;
