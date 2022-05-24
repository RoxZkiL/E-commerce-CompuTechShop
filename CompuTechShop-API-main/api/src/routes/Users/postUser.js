const router = require("express").Router();
const { User } = require("../../db");
const { transporter } = require("../../Mails/index");

router.post("/", async (req, res) => {
  const {
    given_name,
    family_name,
    nickname,
    email,
    email_verified,
    birthday,
    address,
    picture,
    phone,
    is_admin,
    is_admin_pro,
    password,
    is_banned
  } = req.body;
  try {
    let newUser = await User.create({
      given_name,
      family_name,
      nickname,
      email,
      email_verified,
      birthday,
      address,
      picture,
      phone,
      is_admin,
      is_admin_pro,
      password,
      is_banned
    });
    //console.log(newUser.dataValues.email);
    res.send("USUARIO AGREGADO");
    // HIJOS DE $#"$, si ponen el await trasporter ese antes que el res.send se demora 2 segundos en postear un usuario
    await transporter.sendMail({
      from: '"CompuTech Shop" <computechshopok@gmail.com>', // sender address
      to: newUser.dataValues.email, // list of receivers
      subject: "Welcome!", // Subject line
      html: `<h4>Hi ${newUser.dataValues.given_name}!</h4>
    		<p>Welcome to CompuTech Shop!
        It is a pleasure for us to have you here.</br>
        </br>
        Sending you the best!</br>
        CompuTechShop Team.
        <p/>`, // html body
    });
    
  } catch (error) {
    console.log(error, "rutaPost");
  }
});


module.exports = router;
