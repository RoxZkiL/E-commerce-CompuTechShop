const { Product, Payment } = require("../db");

const getPayments = async () => {
  try {
    const arrDB = await Payment.findAll({
      include: {
        model: Product,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(arrDB)
    const result = await arrDB.map((e) => {
      return {
        id: e.id,
        idTogether: e.idTogether,
        idMatch: e.idMatch,
        name: e.name,
        picture: e.picture,
        price: e.price,
        date: e.date,
        quantity: e.quantity,
        total_paid_amount: e.total_paid_amount,
        status: e.status,
        status_detail: e.status_detail,
        state: e.state,
        userEmail: e.userEmail,
        products: e.products.map((p) => p.name),
        extraEmail: e.extraEmail,
        extraAddress: e.extraAddress,
      };
    });
    //console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPaymentsById = async (id) => {
  try {
    const arrDB = await Payment.findAll({
      where: {
        id,
      },
      include: {
        model: Product,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    // console.log(arrDB)
    const result = await arrDB.map((e) => {
      return {
        id: e.id,
        idTogether: e.idTogether,
        idMatch: e.idMatch,
        name: e.name,
        picture: e.picture,
        price: e.price,
        date: e.date,
        quantity: e.quantity,
        total_paid_amount: e.total_paid_amount,
        status: e.status,
        status_detail: e.status_detail,
        state: e.state,
        userEmail: e.userEmail,
        products: e.products.map((p) => p.name),
        extraEmail: e.extraEmail,
        extraAddress: e.extraAddress,
      };
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getPaymentByUserEmail = async (userEmail) => {
  try {
    const userPayment = await Payment.findAll({
      where: {
        userEmail: userEmail,
      },
      include: {
        model: Product,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const result = await userPayment.map((e) => {
      return {
        id: e.id,
        idTogether: e.idTogether,
        idMatch: e.idMatch,
        name: e.name,
        picture: e.picture,
        price: e.price,
        date: e.date,
        quantity: e.quantity,
        total_paid_amount: e.total_paid_amount,
        status: e.status,
        status_detail: e.status_detail,
        state: e.state,
        userEmail: e.userEmail,
        products: e.products.map((p) => p.name),
        extraEmail: e.extraEmail,
        extraAddress: e.extraAddress,
      };
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
const getPaymentByUserName = async (userName) => {
  try {
    const userPayment = await Payment.findAll({
      where: {
        name: userName,
      },
      include: {
        model: Product,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const result = await userPayment.map((e) => {
      return {
        id: e.id,
        idTogether: e.idTogether,
        idMatch: e.idMatch,
        name: e.name,
        picture: e.picture,
        price: e.price,
        date: e.date,
        quantity: e.quantity,
        total_paid_amount: e.total_paid_amount,
        status: e.status,
        status_detail: e.status_detail,
        state: e.state,
        userEmail: e.userEmail,
        products: e.products.map((p) => p.name),
        extraEmail: e.extraEmail,
        extraAddress: e.extraAddress,
      };
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async () => {
  const all = await getPayments();
  if (all.length !== 0) {
    let array = [];
    let total = all.length;

    while (total > 0) {
      if(all.length === 0) break
      let order = {};
      let tajada = Number(all[0].idMatch); //idMatch son la cantidad de pagos q se hicieron desde el mismo carrito

      let arrayRespaldo = [];
      for (let i = 0; i < tajada; i++) {
        arrayRespaldo.push(all.shift());
        total--;
      }
      if(!arrayRespaldo[0].name){
        break
      }
      order.idTogether = arrayRespaldo[0].idTogether;
    

      order.totalCarrito = arrayRespaldo[0].total_paid_amount ? arrayRespaldo.reduce((a, b) => {
        return a + b.total_paid_amount;
      }, 0) : null

      // if(arrayRespaldo[0].total_paid_amount || arrayRespaldo[0].total_paid_amount !== undefined){
      //   order.totalCarrito = arrayRespaldo.reduce((a, b) => {
      //     return a + Number(b.total_paid_amount);
      //   }, 0)
      // }
      // else {
      //   order.totalCarrito = 0
      // }

      order.email = arrayRespaldo[0].userEmail;
      order.date = arrayRespaldo[0].date;
      order.state = arrayRespaldo[0].state;
      order.payments = [];

      for (let x = 0; x < arrayRespaldo.length; x++) {
        {let obj = {};
        obj.name = arrayRespaldo[x].name;
        obj.idTogether = arrayRespaldo[x].idTogether;
        obj.id = arrayRespaldo[x].id;
        obj.price = arrayRespaldo[x].price;
        obj.date = arrayRespaldo[x].date;
        obj.quantity = arrayRespaldo[x].quantity;
        obj.total_paid_amount = arrayRespaldo[x].total_paid_amount;
        obj.status = arrayRespaldo[x].status;
        obj.userEmail = arrayRespaldo[x].userEmail;
        obj.status_detail = arrayRespaldo[x].status_detail;
        obj.state = arrayRespaldo[x].state;
        (obj.extraEmail = arrayRespaldo[x].extraEmail),
          (obj.extraAddress = arrayRespaldo[x].extraAddress);
        
        order.payments.push(obj);}
      }

      array.push(order);
      if (all.length === 0) total--;
    }
    return array;
  }
};

const getOrdersEmail= async(userEmail)=>{
  const order = await getOrders();
  const filtro = order.filter((e) => {
    return e.email === userEmail;
  });
return filtro
}
module.exports = {
  getOrders,
  getOrdersEmail,
  getPayments,
  getPaymentsById,
  getPaymentByUserEmail,
  getPaymentByUserName,
};
