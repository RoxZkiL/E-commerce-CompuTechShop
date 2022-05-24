const { User, Product, Reviews } = require("../db");

const getAllComments = async () => {
  try {
    const commentsDB = await Reviews.findAll()
    const result = await commentsDB.map(c => {
      return {
        id: c.id,
        comment: c.comment,
        user: c.userId,
        product: c.productId,
        calification: c.calification
      }
    })
    return result
  }
  catch (err) {
    console.log(err)
  }
}

const getCommentByUserId = async (userId) => {
  try {
    const commentsDB = await Reviews.findAll({
      where: {
        userId
      }
    })
    const result = await commentsDB.map(c => {
      return {
        id: c.id,
        comment: c.comment,
        user: c.userId,
        product: c.productId,
        calification: c.calification
      }
    })
    return result
  }
  catch (err) {
    console.log(err)
  }
}

const getCommentByProductId = async (productId) => {
  try {
    const commentsDB = await Reviews.findAll({
      where: {
        productId
      }
    })
    const result = await commentsDB.map(c => {
      return {
        id: c.id,
        comment: c.comment,
        user: c.userId,
        product: c.productId,
        calification: c.calification
      }
    })
    return result
  }
  catch (err) {
    console.log(err)
  }
}

const getCommentByProductName = async (productName) => {
  try {
    const userReview = await User.findAll()
    //console.log(userReview.dataValues)
    const product = await Product.findOne({
      where: {
        name: productName
      }
    })
    //console.log(product)
    const commentsDB = await Reviews.findAll({
      where: {
        productId: product.dataValues.id
      }
    })

    const result = await commentsDB.map(c => {
      const userFiltered = userReview.filter(u => u.dataValues.id === c.userId)
      const userName = userFiltered[0].given_name + ' ' + userFiltered[0].family_name
      return {
        id: c.id,
        comment: c.comment,
        user: userName,
        product: c.productId,
        calification: c.calification
      }
    })
    return result
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = { getAllComments, getCommentByUserId, getCommentByProductId, getCommentByProductName };