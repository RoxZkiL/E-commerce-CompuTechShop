import styles from "./CartItem.module.css"

const CartItem = ({ data }) => {
  let { name, price, quantity, picture_url } = data;

  return (
    <div className={styles.container}>
      <div>{name}</div>
      <div>
        ${new Intl.NumberFormat().format(price)} x {quantity} = ${new Intl.NumberFormat().format(quantity * price)}
      </div>
      <div className={styles.containerImgBtn}>
        <img className={styles.cartImg} src={picture_url} alt={name} />
      </div>
    </div>
  );
};

export default CartItem;
