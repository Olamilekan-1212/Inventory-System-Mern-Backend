import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Product from "../models/ProductModel";
import Supplier from "../models/SupplierModel";
import User from "../models/UsersModel";
import mongoose from "mongoose";

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const currentUser = await User.findById(req.user.user_Id).select(
      "-password"
    );

    if (!currentUser) {
      return res.status(400).json({ message: "Invalid receiver" });
    }

    if (!imageUrl) {
      return res
        .status(400)
        .json({ message: "Please provide a valid image file" });
    }
    const product = new Product(req.body);
    const supplierName = await Supplier.findOne({
      supplierName: req.body.supplierDetails,
    });
    if (!supplierName) {
      return res.status(400).json({ message: "Invalid supplier details" });
    }
    product.supplierDetails = req.body.supplierDetails;
    product.receivedBy = new mongoose.Types.ObjectId(req.user.user_Id);
    product.imageFile = imageUrl;
    product.dateSupplied = new Date();
    await product.save();
    res.status(201).json({
      product,
      receiverDetails: currentUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createNewProduct,
};
