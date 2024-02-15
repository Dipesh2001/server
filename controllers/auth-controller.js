// in express js application , a controller refers to a part of your
// code that is responsible for for handling application's logic
// typeically used to process incoming reuests, interact with models(data sources)
// and send response back to clients. they can help orgnize application by saperating
// concerns and following the mvc(model-viw-controller) design pattern.

const Products = require("../models/products-model");

exports.getAllProducts = async (req, res) => {
  // const products = await Products.find();
  let { page, size } = req.query;
  //   console.log(page, size);
  page = parseInt(page);
  size = parseInt(size);
  //   console.log(page, size);
  const totalRecords = await Products.countDocuments();
  const totalPages = Math.ceil(totalRecords / size);

  const skip = (page - 1) * size;
  const products = await Products.find().skip(skip).limit(size);

  res
    .status(200)
    .json({ pageCount: totalPages, rowsCount: totalRecords, data: products });
};

// module.exports = { getAllProducts };
