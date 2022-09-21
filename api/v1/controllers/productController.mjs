import Product from "../../../models/productModel.mjs";
import catchAsync from "../../../utils/catchAsync.mjs";
import AppError from "../../../utils/appError.mjs";

export const createProduct = catchAsync(async (req, res, next) => {
  const { body } = req;
  const product = await Product.create(body);

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const getProducts = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  const query = {};

  if (q) {
    query.name = { $regex: q, $options: "i" };
  }

  const products = await Product.find(query);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const product = await Product.findById(id);

  if (!product) return next(new AppError("Product not found.", 404));

  const updatedProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedProduct,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) return next(new AppError("Product not found.", 404));

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "Deleted",
  });
});
