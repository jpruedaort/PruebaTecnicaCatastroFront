import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import {
  ALL_TERRENO,
  EDIT_TERRENO,
  FIND_TERRENO,
} from "../../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PREDIO } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  toogleEditarConstruccion,
  toogleEditarTerreno,
} from "../../../redux/slices/stateSlice";
import { EDIT_CONSTRU } from "../../../graphql/queries";

const EditarTerreno = () => {
  //dispatch(Redux)
  const dispatch = useDispatch();

  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);

  //Estados de la Construccion
  const [aguaCerca, setAguaCerca] = useState(true);
  const [areacTerreno, setAreacTerreno] = useState(0);
  const [construidoTerreno, setConstruidoTerreno] = useState(true);
  const [regimenTerreno, setRegimenTerreno] = useState("URBANO");
  const [valorTerreno, setValorTerreno] = useState(0);

  //Query para editar (mutar)
  const [editTerrenoMutate, { dataEdit, loadingEdit, errorEdit }] =
    useMutation(EDIT_TERRENO);

  //Genera los resultados del query de busqueda de predio por ID

  const { data, error, loading } = useQuery(FIND_TERRENO, {
    variables: { id: parseInt(valoresEdit.idTerreno) },
  });

  useEffect(() => {
    if (data && data.terrenoById) {
      console.log("daaaaaaaa", data);
      setAguaCerca(data.terrenoById.aguacerca);
      setAreacTerreno(data.terrenoById.areac);
      setConstruidoTerreno(data.terrenoById.construido);
      setRegimenTerreno(data.terrenoById.regimen);
      setValorTerreno(data.terrenoById.valor);
    }
  }, [data]);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error...";
  }

  const submitEdit = () => {
    editTerrenoMutate({
      variables: {
        id: parseInt(valoresEdit.idTerreno),
        aguacerca: aguaCerca,
        areac: parseInt(areacTerreno),
        construido: construidoTerreno,
        regimen: regimenTerreno,
        valor: parseInt(valorTerreno),
      },
      refetchQueries: [
        {
          query: ALL_TERRENO,
          variables: { id: parseInt(valoresEdit.idPredio) },
        },
      ],
    });
    if (loading) {
      return "loading";
    }
    if (errorEdit) {
      window.alert("Error Actualizando Datos");
    } else {
      window.alert("Actualizacion de registro Exitosa");
    }
    if (loadingEdit) {
      return "Loading";
    }
    dispatch(toogleEditarTerreno());
  };

  console.log("datos de entrada", data.terrenoById);
  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Editar terreno numero : {valoresEdit.idTerreno} </b>
        </h3>
      </div>

      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Construido :</b>{" "}
        </label>
        <select
          defaultValue={data.terrenoById.construido}
          onChange={(e) => {
            if (toString(e.target.value) == "true") {
              setConstruidoTerreno(true);
            } else {
              setConstruidoTerreno(false);
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
          defaultValue={data.terrenoById.areac}
          onChange={(e) => {
            setAreacTerreno(e.target.value);
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
          defaultValue={data.terrenoById.aguacerca}
          onChange={(e) => {
            if (toString(e.target.value) == "true") {
              setAguaCerca(true);
            } else {
              setAguaCerca(false);
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
          defaultValue={data.terrenoById.regimen}
          onChange={(e) => {
            setRegimenTerreno(e.target.value);
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
          defaultValue={data.terrenoById.valor}
          onChange={(e) => {
            setValorTerreno(e.target.value);
          }}
          tyoe="number"
        />
      </div>

      <div className={` ${styles.inputLine} justify-content-around mt-4`}>
        <div
          onClick={(e) => submitEdit(e)}
          className={`btn btn-success border `}
        >
          Guardar Cambios
        </div>
        <div
          onClick={() => dispatch(toogleEditarTerreno())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default EditarTerreno;
