const { User } = require("../db");
const { getPaymentByUserEmail } = require("../Controllers/Payments");

const users = async () => {
  const arrDB = await User.findAll();
  const result = [];
  for (let i = 0; i < arrDB.length; i++) {
    const userPayment = await getPaymentByUserEmail(arrDB[i].email);
   
   let totalAmount = 0;
   if (userPayment.length !== 0) {
     let totalAmountEmail = userPayment.reduce((acc, element) => {
       return element.total_paid_amount + acc;
     },0);
     totalAmount += totalAmountEmail;};
     
     result.push({
      id: arrDB[i].id,
      given_name: arrDB[i].given_name,
      family_name: arrDB[i].family_name,
      nickname: arrDB[i].nickname,
      email: arrDB[i].email,
      email_verified: arrDB[i].email_verified,
      birthday: arrDB[i].birthday,
      address: arrDB[i].address,
      picture: arrDB[i].picture,
      phone: arrDB[i].phone,
      is_admin: arrDB[i].dataValues.is_admin,
      is_admin_pro: arrDB[i].dataValues.is_admin_pro,
      password: arrDB[i].dataValues.password,
      is_banned: arrDB[i].dataValues.is_banned,
      totalAmount: totalAmount
    });
  }
  return result;
};

const userName = async (given_name) => {
  try {
    const nameDB = await User.findAll({
      where: {
        given_name: given_name,
      },
    });
    console.log(nameDB);
    const user = await nameDB.map((u) => {
      return {
        id: u.dataValues.id,
        given_name: u.dataValues.given_name,
        family_name: u.dataValues.family_name,
        nickname: u.dataValues.nickname,
        email: u.dataValues.email,
        email_verified: u.dataValues.email_verified,
        birthday: u.dataValues.birthday,
        address: u.dataValues.address,
        picture: u.dataValues.picture,
        phone: u.dataValues.phone,
        is_admin: u.dataValues.is_admin,
        is_admin_pro: u.dataValues.is_admin_pro,
        password: u.dataValues.password,
        is_banned: u.dataValues.is_banned,
      };
    });
    return user[0];
  } catch (error) {
    console.log(error);
  }
};

const userId = async (id) => {
  try {
    const dbUser = await User.findByPk(id);
    return {
      id: dbUser.id,
      given_name: dbUser.given_name,
      family_name: dbUser.family_name,
      nickname: dbUser.nickname,
      email: dbUser.email,
      email_verified: dbUser.email_verified,
      birthday: dbUser.birthday,
      address: dbUser.address,
      picture: dbUser.picture,
      phone: dbUser.phone,
      is_admin: u.dataValues.is_admin,
      is_admin_pro: u.dataValues.is_admin_pro,
      password: u.dataValues.password,
      is_banned: u.dataValues.is_banned,
    };
  } catch (error) {
    console.log(error);
  }
};

const userEmail = async (email) => {
  try {
    const dbUser = await User.findOne({ where: { email } });
    return {
      id: dbUser.id,
      given_name: dbUser.given_name,
      family_name: dbUser.family_name,
      nickname: dbUser.nickname,
      email: dbUser.email,
      email_verified: dbUser.email_verified,
      birthday: dbUser.birthday,
      address: dbUser.address,
      picture: dbUser.picture,
      phone: dbUser.phone,
      is_admin: dbUser.is_admin,
      is_admin_pro: dbUser.is_admin_pro,
      password: dbUser.password,
      is_banned: dbUser.is_banned,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { users, userName, userId, userEmail };
