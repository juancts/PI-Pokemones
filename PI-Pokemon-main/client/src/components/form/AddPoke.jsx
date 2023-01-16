import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./Form.modules.css";
import { validate } from "./validate";
import { addTypes } from "../../actions/Actions";
import styles from "./Form.modules.css";

export default function AddPoke() {
  const [pokemon, setPokemon] = useState({});
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  //useEffect(() => {
  //   dispatch(addTypes());
  // }, [dispatch]);

  const [inputs, setInputs] = useState({
    name: "",
    height: "",
    weight: "",
    health: "50",
    attack: "50",
    defense: "50",
    speed: "50",
    types: [],
    img: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    img: "",
  });

  let history = useHistory();

  
  const [selectedItems, setSelectedItems] = useState([]);

  function handleCheckboxChange(e) {
    var checkbox = e.target;
    if (checkbox.checked) {
      setSelectedItems([...selectedItems, checkbox.value])
      //selectedItems.push(checkbox.value);
    } else {
      var index = selectedItems.indexOf(checkbox.value);
      selectedItems.splice(index, 1);
    }
    console.log(selectedItems);
    setPokemon({
      ...pokemon,
      [e.target.name]: selectedItems,
    });
    setInputs({
      ...inputs,
      [e.target.name]: selectedItems,
    });
  }

  function handleChange(e) {
    setPokemon({
        ...pokemon,
        [e.target.name]: e.target.value,
      });

      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
      console.log("INPUTS TYPES:", inputs.types);
      setErrors(
        validate({
          ...inputs,
          [e.target.name]: e.target.value,
        })
      );
      console.log(pokemon);
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      window.alert("Muchas gracias, completado correctamente");
      axios.post("http://localhost:3001/api/pokemones/", pokemon).then(() => {
        setInputs({
          name: "",
          height: "",
          weight: "",
          health: "",
          attack: "",
          defense: "",
          speed: "",
          img: "",
        });
        setErrors({
          name: "",
          height: "",
          weight: "",
          health: "",
          attack: "",
          defense: "",
          speed: "",
          img: "",
        });
        history.push("/allPokes");
      });
    } else {
      window.alert("Debes corregir los errores");
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <NavBar />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <header>
            <h2>Your Own Pokemon</h2>
            <p>Insert a name, select its stats and choose the types!</p>
          </header>
          <label>Nombre:</label>
          <input
            onChange={handleChange}
            name="name"
            placeholder="Pokemon name?..."
            type="text"
            value={inputs.name}
            className={errors.name && styles.warning}
          />
          <p className="danger">{errors.name}</p>
          <label>Height (m):</label>
          <input
            onChange={handleChange}
            name="height"
            placeholder="Pokemon height?..."
            type="number"
            value={inputs.height}
            className={errors.height && styles.warning}
          />
          <p className="danger">{errors.height}</p>
          <label>Weight (kg):</label>
          <input
            onChange={handleChange}
            name="weight"
            placeholder="Pokemon weight?..."
            type="number"
            value={inputs.weight}
            className={errors.weight && styles.warning}
          />
          <p className="danger">{errors.weight}</p>
          <label>health:</label>
          <input
            onChange={handleChange}
            name="health"
            placeholder="Pokemon health?..."
            type="range"
            min="0"
            max="100"
            step="1"
            value={inputs.health}
            //className={errors.health && "warning"}
          />
          <p>
            Valor: <output id="healthRange">{inputs.health}</output>
          </p>

          <p className="danger">{errors.health}</p>

          <label>attack:</label>
          <input
            onChange={handleChange}
            name="attack"
            placeholder="Pokemon attack?..."
            type="range"
            min="0"
            max="100"
            step="1"
            value={inputs.attack}
            //className={errors.attack && "warning"}
          />
          <p>
            Valor: <output id="attackRange">{inputs.attack}</output>
          </p>
          <p className="danger">{errors.attack}</p>
          <label>defense:</label>
          <input
            onChange={handleChange}
            name="defense"
            placeholder="Pokemon defense?..."
            type="range"
            min="0"
            max="100"
            step="1"
            value={inputs.defense}
            //className={errors.defense && "warning"}
          />
          <p>
            Valor: <output id="defenseRange">{inputs.defense}</output>
          </p>
          <p className="danger">{errors.defense}</p>
          <label>speed:</label>
          <input
            onChange={handleChange}
            name="speed"
            placeholder="Pokemon speed?..."
            type="range"
            min="0"
            max="100"
            step="1"
            value={inputs.speed}
            //className={errors.speed && "warning"}
          />
          <p>
            Valor: <output id="speedRange">{inputs.speed}</output>
          </p>
          <p className="danger">{errors.speed}</p>
          <span>Type:</span>

          {types &&
            types.map((type, i) => (
              <div key={i}>
                <input onChange={handleCheckboxChange} type="checkbox" name="types" value={type} />
                <label>{type}</label>
              </div>
              // <option key={i} value={type}>
              //   {type}
              // </option>
            ))}

          <label>Image:</label>
          <input
          onChange={handleChange}
            name="img"
            placeholder="Pokemon image..."
            type="text"
            value={inputs.img}
            className={errors.img && "warning"}
          />
          <p className="danger">{errors.img}</p>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}