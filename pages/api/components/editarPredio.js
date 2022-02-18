import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { FIND_PREDIO } from "../../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PREDIO } from "../../../graphql/queries";
import { toogleEditar } from "../../../redux/slices/stateSlice";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_PREDIO } from "../../../graphql/queries";

const EditarPredio = () => {
  //dispatch(Redux)
  const dispatch = useDispatch();

  //Invocar ID del predio Seleccionado
  const valoresEdit = useSelector((state) => state.predioVal);

  //Estados del predio
  const [avaluoPredio, setAvaluoPredio] = useState(0);
  const [nombrePredio, setNombrePredio] = useState("");
  const [departPredio, setDepartPredio] = useState("");
  const [municipioPredio, setMunicipioPredio] = useState("");

  //Query para editar (mutar)
  const [editPredioMutate, { dataEdit, loadingEdit, errorEdit }] =
    useMutation(EDIT_PREDIO);

  //Genera los resultados del query de busqueda de predio por ID
  const valorInt = parseInt(valoresEdit.idPredio);
  const { data, error, loading } = useQuery(FIND_PREDIO, {
    variables: { idPred: valorInt },
  });

  useEffect(() => {
    if (data && data.predioById) {
      setAvaluoPredio(data.predioById.avaluo);
      setNombrePredio(data.predioById.nombre);
      setDepartPredio(data.predioById.departamento);
      setMunicipioPredio(data.predioById.municipio);
    }
  }, [data]);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error...";
  }

  const submitEdit = () => {
    editPredioMutate({
      variables: {
        id: parseInt(valorInt),
        avaluo: parseInt(avaluoPredio),
        nombre: nombrePredio,
        departamento: departPredio,
        municipio: municipioPredio,
      },
      refetchQueries: [{ query: ALL_PREDIO }],
    });
    if (errorEdit) {
      window.alert("Error Actualizando Datos");
    } else {
      window.alert("Actualizacion de registro Exitosa");
    }
    if (loadingEdit) {
      return "Loading";
    }
    dispatch(toogleEditar());
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Editar Predio numero : {valoresEdit.idPredio} </b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Nombre Predio: {valoresEdit.nombre} </b>{" "}
        </label>
        <input
          name="nombre"
          defaultValue={data.predioById.nombre}
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
          name="avaluo"
          defaultValue={data.predioById.avaluo}
          onChange={(e) => {
            setAvaluoPredio(e.target.value);
          }}
          type="number"
          min="0"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          <b>Departamento:</b>{" "}
        </label>
        <input
          name="departamento"
          defaultValue={data.predioById.departamento}
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
          name="municipio"
          defaultValue={data.predioById.municipio}
          onChange={(e) => {
            setMunicipioPredio(e.target.value);
          }}
          type="text"
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
          onClick={(e) => dispatch(toogleEditar())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default EditarPredio;
