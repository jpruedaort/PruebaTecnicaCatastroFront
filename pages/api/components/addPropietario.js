import { useMutation } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ADD_PROP } from "../../../graphql/queries";
import { useDispatch } from "react-redux";
import { toogleCreatePropietario } from "../../../redux/slices/stateSlice";
import { useState } from "react";

const AddPropietario = () => {
  //Dispatch
  const dispatch = useDispatch();

  //Generar funcion para mutacion de GraphQl
  const [addPropietarioMutate, { data, loading, error }] =
    useMutation(ADD_PROP);

  //Estados para cada uno de los campos
  const [tipo, setTipo] = useState("NATURAL");
  const [idProp, setIdProp] = useState(0);
  const [nombreProp, setNombreProp] = useState("");
  const [apellidoProp, setApellidoProp] = useState("");
  const [numDocProp, setNumDocProp] = useState(0);
  const [razSocProp, setRazSocProp] = useState("");
  const [nitProp, setNitProp] = useState(0);
  const [dirProp, setDirProp] = useState("");
  const [correoProp, setCorreoProp] = useState("");
  const [telefonoProp, setTelefonoProp] = useState(0);

  //onClick Event
  const onSubmit = (e) => {
    e.preventDefault();
    addPropietarioMutate({
      variables: {
        apellido: apellidoProp,
        correo: correoProp,
        direccion: dirProp,
        id: parseInt(idProp),
        nit: parseInt(nitProp),
        nombre: nombreProp,
        numdoc: parseInt(numDocProp),
        razonsoc: razSocProp,
        telefono: parseFloat(telefonoProp),
        tipo: tipo,
      },
    });
    dispatch(dispatch(toogleCreatePropietario()));
    if (!error) {
      window.alert("Predio Agregado Exitosamente");
    } else {
      window.alert("Error Agregando Predio, intente de nuevo");
    }
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Agregar Propietario</b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Tipo:</b>{" "}
        </label>
        <select onChange={(e) => setTipo(e.target.value)}>
          <option value="NATURAL">Natural</option>
          <option value="JURIDICA">Juridica</option>
        </select>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Id:</b>{" "}
        </label>
        <input
          onChange={(e) => {
            setIdProp(e.target.value);
          }}
          type="text"
        />
      </div>

      {tipo == "NATURAL" ? (
        <div className="d-flex flex-column w-100">
          <div className={` ${styles.inputLine} `}>
            <label>
              {" "}
              <b>Nombres:</b>{" "}
            </label>
            <input
              onChange={(e) => {
                setNombreProp(e.target.value);
              }}
              type="text"
            />
          </div>
          <div className={` ${styles.inputLine} `}>
            <label>
              {" "}
              <b>Apellidos:</b>{" "}
            </label>
            <input
              onChange={(e) => {
                setApellidoProp(e.target.value);
              }}
              type="text"
            />
          </div>
          <div className={` ${styles.inputLine} `}>
            <label>
              {" "}
              <b>Numero de Documento:</b>{" "}
            </label>
            <input
              onChange={(e) => {
                setNumDocProp(e.target.value);
              }}
              type="number"
            />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column w-100">
          <div className={` ${styles.inputLine} `}>
            <label>
              {" "}
              <b>Razón social:</b>{" "}
            </label>
            <input
              onChange={(e) => {
                setRazSocProp(e.target.value);
              }}
              type="text"
            />
          </div>
          <div className={` ${styles.inputLine} `}>
            <label>
              {" "}
              <b>NIT:</b>{" "}
            </label>
            <input
              onChange={(e) => {
                setNitProp(e.target.value);
              }}
              type="text"
            />
          </div>
        </div>
      )}
      <div className="d-flex flex-column w-100">
        <div className={` ${styles.inputLine} `}>
          <label>
            {" "}
            <b>Dirección:</b>{" "}
          </label>
          <input
            onChange={(e) => {
              setDirProp(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className={` ${styles.inputLine} `}>
          <label>
            {" "}
            <b>Correo:</b>{" "}
          </label>
          <input
            onChange={(e) => {
              setCorreoProp(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className={` ${styles.inputLine} `}>
          <label>
            {" "}
            <b>Telefono:</b>{" "}
          </label>
          <input
            onChange={(e) => {
              setTelefonoProp(e.target.value);
            }}
            type="text"
          />
        </div>
      </div>

      <div className={` ${styles.inputLine} justify-content-around mt-4`}>
        <div onClick={(e) => onSubmit(e)} className={`btn btn-success border `}>
          {loading ? <p>Cargando</p> : <p>Agregar</p>}
        </div>
        <div
          onClick={(e) => dispatch(toogleCreatePropietario())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default AddPropietario;
