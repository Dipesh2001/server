const Products = require("../models/products-model");

exports.getAllProducts = async (req, res) => {
  try {
    let { page, size } = req.query;
    //   console.log(page, size);
    page = parseInt(page);
    size = parseInt(size);
    //   console.log(page, size);
    const totalRecords = await Products.countDocuments();
    const totalPages = Math.ceil(totalRecords / size);

    const skip = (page - 1) * size;
    const products = await Products.find().skip(skip).limit(size);

    return res.status(200).json({
      sucess: true,
      message: "Something went wrong",
      pageCount: totalPages,
      rowsCount: totalRecords,
      data: products,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong", error: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Products({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
    });
    await product.save();
    return res.status(201).json({
      sucess: false,
      message: "Product added successfully.",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Error while adding product",
      error: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id);

    return res.status(200).json({
      sucess: true,
      message: "Product deleted successfully.",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Error while deleting product",
      error: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);

    return res.status(200).json({
      sucess: true,
      message: "Product data fetched successfully.",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Error while getting product",
      error: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      sucess: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      message: "Error while updating product",
      error: err,
    });
  }
};
