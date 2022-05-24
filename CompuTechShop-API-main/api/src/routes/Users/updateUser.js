const router = require("express").Router();
const { User } = require("../../db");
const { transporter } = require("../../Mails/index");

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {
      given_name,
      family_name,
      nickname,
      email,
      email_verified,
      picture,
      birthday,
      address,
      phone,
      is_admin,
      is_admin_pro,
      password,
      is_banned
    } = req.body;
    //console.log(id)
    const updateUser = await User.update(
      {
        given_name,
        family_name,
        nickname,
        email,
        email_verified,
        picture,
        birthday,
        address,
        phone,
        is_admin,
        is_admin_pro,
        password,
        is_banned
      },
      {
        where: { id },
      }
    );
    // await transporter.sendMail({
    //   from: '"CompuTech Shop" <computechshopok@gmail.com>',
    //   to: email,
    //   subject: `${given_name}, tus datos fueron actualizados`,
    //   html: `<h4>Hola ${given_name}!</h4> 
		// 	<p>Abajo te dejamos tus nuevos datos actualizados:<p/>
		// 	<ul>
		// 	 <li>${given_name}</li>
		// 	 <li>${family_name}</li>
		// 	 <li>${nickname}</li>
		// 	 <li>${email}</li>
		// 	 <li>${picture}</li>
		// 	 <li>${address}</li>
		// 	 <li>${phone}</li>
		// 	</ul>
		// 	<p>Saludos!</p>`,
    // });
    //console.log(id)
    res.send({ msg: "actualizado" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
