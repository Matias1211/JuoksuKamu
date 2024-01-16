import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../shared/useform/useform';
import styles from './ItemForm.module.scss'

function ItemForm(props) {
  const navigate = useNavigate();

// Lomakkeen lähetyksen käsittelyfunktio

  const submit = () => {
    let storedValues = { ...values };
    storedValues.amount = parseFloat(storedValues.amount);
    storedValues.id = storedValues.id ? storedValues.id : crypto.randomUUID();

    props.onItemSubmit(storedValues);
    navigate(-1);
  };

// Alustaa lomakkeen tilan, käyttäen annettua dataa tai oletusarvoja

  const initialState = props.formData
    ? props.formData
    : {
        type: '',
        distance: 0,
        duration: 0,
        date: '',
      };

// Käytä yhteistä useForm-hookia lomakkeen tilan hallintaan

  const { values, handleChange, handleSubmit } = useForm(
    submit,
    initialState,
    false
  );

// Lomakkeen peruutusfunktio

  const handleCancel = () => {
    navigate(-1);
  };

// Lomakkeen poistofunktio

  const handleDelete = () => {
    
    if (props.onItemDelete) {
      props.onItemDelete(values.id);
    }
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Juoksu tyyppi:
        <select name="type" value={values.type} onChange={handleChange}>
          <option value="">Valitse</option>
          {props.typelist.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Pituus (km):
        <input
          type="number"
          name="distance"
          value={values.distance}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Kesto (Minuuteissa):
        <input
          type="number"
          name="duration"
          value={values.duration}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Päivämäärä:
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">{props.formData ? 'SAVE' : 'ADD'}</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      {props.onItemDelete && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </form>
  );
}

export default ItemForm;

