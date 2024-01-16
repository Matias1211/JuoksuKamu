import styles from './AddItem.module.scss'
import ItemForm from '../ItemForm/ItemForm'

function AppItem(props) {

  return (
    <div className={styles.additem}>
      <h2>Uusi lenkki
      </h2>
      <ItemForm onItemSubmit={props.onItemSubmit}
                typelist={props.typelist} />
    </div>
  )

}

export default AppItem