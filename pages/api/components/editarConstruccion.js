import { useQuery } from "@apollo/client";
import styles from "../../../styles/Home.module.css";
import { ALL_CONSTRU, FIND_CONSTRU } from "../../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PREDIO } from "../../../graphql/queries";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { toogleEditarConstruccion } from "../../../redux/slices/stateSlice";
import { EDIT_CONSTRU } from "../../../graphql/queries";

const EditarConstruccion = () => {
  //dispatch
  const dispatch = useDispatch();

  //Invocar Valores iniciales para la edicion
  const valoresEdit = useSelector((state) => state.predioVal);

  //Estados de la Construccion
  const [areaConstru, setAreaConstru] = useState(0);
  const [dirConstru, setDirConstru] = useState("");
  const [pisosConstru, setPisosConstru] = useState(0);
  const [tipoConstru, setTipoConstru] = useState("");

  //   Query para editar (mutar)
  const [editConstruMutate, { dataEdit, loadingEdit, errorEdit }] =
    useMutation(EDIT_CONSTRU);

  //Genera los resultados del query de busqueda de construccion por ID
  const { data, error, loading } = useQuery(FIND_CONSTRU, {
    variables: { id: parseInt(valoresEdit.idconstru) },
  });

  useEffect(() => {
    if (data && data.construccionById) {
      setAreaConstru(data.construccionById.areac);
      setDirConstru(data.construccionById.dir);
      setPisosConstru(data.construccionById.pisos);
      setTipoConstru(data.construccionById.tipo);
    }
  }, [data]);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error...";
  }

  console.log("DATA, ", data);

  const submitEdit = () => {
    editConstruMutate({
      variables: {
        idconstru: parseInt(valoresEdit.idconstru),
        area: parseInt(areaConstru),
        pisos: parseInt(pisosConstru),
        dir: dirConstru,
        tipo: tipoConstru,
      },
      refetchQueries: [
        {
          query: ALL_CONSTRU,
          variables: { idconstru: parseInt(valoresEdit.idPredio) },
        },
      ],
    });
    if (errorEdit) {
      window.alert("Error Actualizando Datos");
    } else {
      window.alert("Actualizacion de registro Exitosa");
    }
    if (loadingEdit) {
      return "Loading";
    }
    dispatch(toogleEditarConstruccion());
  };

  return (
    <div className={` ${styles.popContainer} `}>
      <div>
        {" "}
        <h3>
          <b>Editar construccion numero : {valoresEdit.idConstruccion} </b>
        </h3>
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Area(m2): {valoresEdit.nombre} </b>{" "}
        </label>
        <input
          defaultValue={data.construccionById.areac}
          name="area"
          onChange={(e) => setAreaConstru(e.target.value)}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Direccion:</b>{" "}
        </label>
        <input
          defaultValue={data.construccionById.dir}
          name="direccion"
          onChange={(e) => setDirConstru(e.target.value)}
          type="text"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          <b>Pisos:</b>{" "}
        </label>
        <input
          defaultValue={data.construccionById.pisos}
          name="departamento"
          onChange={(e) => setPisosConstru(e.target.value)}
          type="number"
        />
      </div>
      <div className={` ${styles.inputLine} `}>
        <label>
          {" "}
          <b>Tipo:</b>{" "}
        </label>
        <input
          defaultValue={data.construccionById.tipo}
          name="municipio"
          onChange={(e) => setTipoConstru(e.target.value)}
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
          onClick={() => dispatch(toogleEditarConstruccion())}
          className={`btn btn-danger border `}
        >
          Cancelar
        </div>
      </div>
    </div>
  );
};

export default EditarConstruccion;
