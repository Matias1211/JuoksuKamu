import React, { useState } from 'react';
import styles from './Settings.module.scss';
import Button from '../../shared/buttons';

function Settings(props) {
  // Käytä state-hookia uuden lenkkityypin hallintaan
  const [newType, setNewType] = useState('');

  // Käsittelijä uuden lenkkityypin lähetykselle
  const handleTypeSubmit = (event) => {
    event.preventDefault();
    const typeToAdd = newType.trim();
    if (typeToAdd) {
      // Kutsu yläkomponentin onTypeSubmit-funktiota uudella lenkkityypillä
      props.onTypeSubmit(typeToAdd);
      setNewType(''); // Tyhjennä syötekenttä lähetyksen jälkeen
    }
  };

  // Käsittelijä uuden lenkkityypin muutokselle
  const handleTypeChange = (event) => {
    setNewType(event.target.value);
  };

  return (
    <div className={styles.settings}>
      <h2>Asetukset</h2>
      <h3>Lenkkityypit</h3>
      <div className={styles.settings_types}>
        {/* Näytä olemassa olevat lenkkityypit */}
        {props.typelist.map((type) => (
          <div key={type}>{type}</div>
        ))}
        {/* Lomake uuden lenkkityypin lisäämiseksi */}
        <form onSubmit={handleTypeSubmit}>
          <div className={styles.settings_form}>
            <input
              type='text'
              name='type'
              value={newType}
              onChange={handleTypeChange}
              placeholder='Lisää lenkkityyppi'
            />
            {/* Lisää-nappi lomakkeen lähetykselle */}
            <Button type='submit' primary>
              Lisää
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
