import express from "express";
const app = express();

app.use(express.json());

const products = [
    { id: 1, name: "Mouse", category: "electronics" },
    { id: 2, name: "Keyboard", category: "electronics" },
    { id: 3, name: "Chair", category: "furniture" },
    { id: 4, name: "Notebook", category: "stationery" }
];

app.get("/", (req, res) => {
    res.send("Hello from server");
});

app.get("/products", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products: products
    });
});

app.get("/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
            product: null
        });
    }

    res.status(200).json({
        success: true,
        message: "Product found",
        product: product
    });
});

app.post("/products", (req, res) => {
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide name and category"
        });
    }

    const newProduct = {
        id: Date.now(),
        name,
        category
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: "Product created",
        products: products
    });
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});
