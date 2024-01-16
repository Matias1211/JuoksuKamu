import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';
import { MdNavigateNext } from 'react-icons/md';

function Item({ data }) {
  const locale = 'fi-FI';
  const date = new Date(data.date).toLocaleDateString(locale);
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  });

  const distance = data.distance ? `${data.distance} km` : '';
  const duration = data.duration ? `${data.duration} min` : '';

  // Calculate average speed (in km/h)
  const averageSpeed = data.distance && data.duration
    ? (data.distance / (data.duration / 60)).toFixed(2)
    : '';

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_distance}>{distance}</div>
        <div className={styles.item_duration}>{duration}</div>
        <div className={styles.item_averageSpeed}>{`Avg Speed: ${averageSpeed} km/h`}</div>
        <div className={styles.item_date}>{date}</div>
      </div>
      <div className={styles.item_edit}>
        <Link to={`/edit/${data.id}`}>
          <MdNavigateNext />
        </Link>
      </div>
    </div>
  );
}

export default Item;
