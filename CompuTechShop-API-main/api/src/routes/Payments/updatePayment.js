const router = require("express").Router();
const { Payment, User } = require("../../db");
const { transporter } = require("../../Mails/index");

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params
    const {state} = req.body;
    // console.log(id, state)

    await Payment.update(
      {
        state: state,
      },
      {
        where: { id },
      }
    );
    const newPay = await Payment.findOne({
      where: {id}
    })
    let user = await User.findOne({
      where: {email: newPay.userEmail}
    })
    //console.log('pay', newPay)
    mails = [newPay.dataValues.userEmail, newPay.dataValues.extraEmail]

    res.send({ msg: "Actualizado" });
    mails = [...new Set(mails)]
    mails.map(el => { el ?
      transporter.sendMail({
      from: '"CompuTech Shop" <computechshopok@gmail.com>', // sender address
      to: el, // list of receivers
      subject: "Order status", // Subject line
      html: `<h4>Hi ${user.given_name}!</h4>
      <p>The status of your purchase number #${newPay.dataValues.idTogether} has been updated to "${newPay.state}". For more information, you can view the details in your profile
      </br>
      </br>
      Sending you the best!</br>
      CompuTechShop Team.
      <p/>`, // html body
    }) : null
    })
    // await transporter.sendMail({
    //   from: '"CompuTech Shop" <computechshopok@gmail.com>', // sender address
    //   to: newPay.userEmail, // list of receivers
    //   subject: "Order status", // Subject line
    //   html: `<h4>Hi ${user.given_name}!</h4>
    //     <p>The status of your purchase has been updated to "${newPay.state}". For more information, you can view the details in your profile
    //     </br>
    //     </br>
    //     Sending you the best!</br>
    //     CompuTechShop Team.
    //     <p/>`, // html body
    // });
    
  } catch (err) {
    console.log("Error en updatePayment", err);
  }
});

module.exports = router;
