const router = require("express").Router();
const { Product, Payment, User } = require("../../db");
const { transporter } = require("../../Mails/index");
const axios = require("axios");
const { getPayments } = require("../../Controllers/Payments");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const payments = await getPayments()
    let num ;
    if(payments.length > 0){payments.sort((a,b) =>{
      if (a.idTogether < b.idTogether) {
        return 1;
    }
    if (a.idTogether > b.idTogether) {
        return -1;
    }
    return 0;
    })
    num = payments[0].idTogether;
  }

    
    let idTogether = num ? num + 1 : 1 ;

    const { id, successEmail, extraEmail, extraAddress } = req.query;
    const infoApi = await axios.get(
      "https://api.mercadopago.com/v1/payments/" + id,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    const infoTotal = {
      items: infoApi.data.additional_info.items.map((item) => {
        return {
          name: item.title,
          picture: item.picture_url,
          price: item.unit_price,
          quantity: item.quantity,
        };
      }),
      total_paid_amount: infoApi.data.transaction_details.total_paid_amount,
      status: infoApi.data.status,
      status_detail: infoApi.data.status_detail,
    };

    if (infoTotal) {
      /* const productos = [] */
      let user;
      let email = []
      let id;
      for (let i = 0; i < infoTotal.items.length; i++) {
        let actualDate = new Intl.DateTimeFormat("es-ES", {
          dateStyle: "full",
          timeStyle: "long",
        }).format(new Date());
        let aux = {
          //ajustar esto para que conicida con el modelo
          idTogether: idTogether,
          idMatch: infoTotal.items.length,
          name: infoTotal.items[i].name,
          picture: infoTotal.items[i].picture,
          price: infoTotal.items[i].price,
          date: actualDate,
          quantity: infoTotal.items[i].quantity,
          total_paid_amount:
            infoTotal.items[i].price * infoTotal.items[i].quantity,
          status: infoTotal.status,
          status_detail: infoTotal.status_detail,
          state: "In process",
          userEmail: successEmail ? successEmail : "CORREO@HARDCODEADO.com",
          extraEmail: extraEmail ? extraEmail : null,
          extraAddress: extraAddress ? extraAddress : null,
        };

        const cambioCantidad = await Product.findOne({
          where: {
            name: aux.name,
          },
        });

        let newPayment = await Payment.create(aux);
        let product = await Product.findAll({
          where: { name: aux.name },
        });
        newPayment.addProduct(product);
        /*    productos.push(cambioCantidad) */

        const updateProduct = await Product.update(
          { quantity: cambioCantidad.quantity - infoTotal.items[i].quantity },
          {
            where: { name: aux.name },
          }
        );
        email.push(aux.userEmail);
        aux.extraEmail ? email.push(aux.extraEmail) : null
        id = aux.idTogether;
      }
      idTogether = idTogether + 1;
      email = [...new Set (email)]
      //console.log('email', email)
      user = await User.findOne({
        where: { email: email },
      });
      //console.log('user', user)
      
      res.send({ msg: "Pagos subidos a la base de datos" });
      
      email.map(el => {
        transporter.sendMail({
        from: '"CompuTech Shop" <computechshopok@gmail.com>', // sender address
        to: el, // list of receivers
        subject: "Thanks for your order!", // Subject line
        html: `<h4>Hi ${user.dataValues.given_name}!</h4>
        <p>Thank you for buying in CompuTechShop! We hope everything went well. Your order number: #${id} will be shipped to your profile's address in the next 2-5 working days. 
        If you need to change your address please go to your profile, click on “edit user” button, write the new address and click on the “update user” button.
        </br>
        </br>
        Sending you the best!</br>
        CompuTechShop Team.
        <p/>`, // html body
      });
      })
      // await transporter.sendMail({
      //   from: '"CompuTech Shop" <computechshopok@gmail.com>', // sender address
      //   to: user.dataValues.email, // list of receivers
      //   subject: "Thanks for your order!", // Subject line
      //   html: `<h4>Hi ${user.dataValues.given_name}!</h4>
      //   <p>Thank you for buying in CompuTechShop! We hope everything went well. Your order number: #${id} will be shipped to your profile's address in the next 2-5 working days. 
      //   If you need to change your address please go to your profile, click on “edit user” button, write the new address and click on the “update user” button.
      //   </br>
      //   </br>
      //   Sending you the best!</br>
      //   CompuTechShop Team.
      //   <p/>`, // html body
      // });
      
      /* await newPayment.addProduct(productos); */
      
    }
  } catch (error) {
    console.log("ERROR EN SUCCESS", error);
  }
});

module.exports = router;
