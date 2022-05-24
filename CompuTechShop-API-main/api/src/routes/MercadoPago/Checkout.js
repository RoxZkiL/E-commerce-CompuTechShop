const router = require("express").Router();
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

router.post("/", (req, res) => {
  const data = req.body;
  let preference = {
    items: [],
    back_urls: {
      success: "https://computechshop.vercel.app/purchaseResult",
      failure: "https://computechshop.vercel.app/purchaseResult",
      pending: "https://computechshop.vercel.app/purchaseResult",
      // Rutas del front a las que quiero redireccionar, tienen que mostrar los productos vendidos, una vez que la pagina cargue, tiene que hacer un efect
    },
    auto_return: "approved",
    statement_descriptor: "TechPayment",
    shipments: {
      cost: 0, //costo del envio
      mode: "not_specified",
    }, //data que tengo que guardar y manejar el stock
  };

  if (Array.isArray(data.name)) {
    for (let i = 0; i < data.name.length; i++) {
      preference.items.push({
        title: data.name[i],
        picture_url: data.picture_url[i],

        unit_price: parseInt(data.price[i]),
        quantity: parseInt(data.quantity[i]),
      });
    }
  } else {
    preference.items.push({
      title: data.name,
      picture_url: data.picture_url,

      unit_price: parseInt(data.price),
      quantity: parseInt(data.quantity),
    });
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.response.init_point);
      /*  res.redirect(response.response.init_point); */
    })
    .catch(function (error) {
      console.log(error);
    });
});
module.exports = router;
