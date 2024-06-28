import { Request, Response } from "express";
import Supplier from "../models/SupplierModel";

const createMySupplier = async (req: Request, res: Response) => {
  try {
    const {
      supplierName,
      supplierPhoneNumber,
      supplierEmail,
      supplierDeliverables,
    } = req.body;

    if (
      !supplierName ||
      !supplierPhoneNumber ||
      !Array.isArray(supplierDeliverables) ||
      supplierDeliverables.length < 1
    ) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const existingSupplierName = await Supplier.findOne({ supplierName });
    if (existingSupplierName) {
      return res.status(409).json({ message: "Duplicate supplier name" });
    }
    const existingSupplierEmail = await Supplier.findOne({ supplierEmail });
    if (existingSupplierEmail) {
      return res
        .status(409)
        .json({ message: "Duplicate supplier email address" });
    }
    const existingSupplierPhone = await Supplier.findOne({
      supplierPhoneNumber,
    });
    if (existingSupplierPhone) {
      return res
        .status(409)
        .json({ message: "Duplicate supplier phone number" });
    }

    const newSupplier = await new Supplier(req.body);
    newSupplier.supplierName = supplierName;
    newSupplier.supplierEmail = supplierEmail;
    newSupplier.supplierPhoneNumber = supplierPhoneNumber;
    newSupplier.supplierDeliverables = supplierDeliverables;

    await newSupplier.save();

    return res.status(201).send(newSupplier);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMySupplier,
};
