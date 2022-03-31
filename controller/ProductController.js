const Product = require("../models/Product");

let createPr = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
};
let updatePr = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
};

let deletePr = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};
let showPr = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};
let showAllPr = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const { page, size } = req.pagination;
    try {
        let products;

        if (qNew) {
            products = await Product.find()
                .sort({ createdAt: -1 })
                .limit(size)
                .skip(page * size);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            })
                .limit(size)
                .skip(page * size);
        } else {
            products = await Product.find()
                .limit(size)
                .skip(page * size);
        }
        const count = await Product.count();
        const totalPages = Math.ceil(count/size);

        res.status(200).json({content:products,page,totalPages});
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createPr: createPr,
    updatePr: updatePr,
    deletePr: deletePr,
    showPr: showPr,
    showAllPr: showAllPr,
};
