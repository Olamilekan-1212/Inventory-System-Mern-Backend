"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
dotenv_1.default.config();
var MyUserRoutes_1 = require("./routes/MyUserRoutes");
var MyProductRoutes_1 = require("./routes/MyProductRoutes");
var MySupplierRoutes_1 = require("./routes/MySupplierRoutes");
var cors_1 = require("cors");
var cloudinary_1 = require("cloudinary");
var PORT = process.env.PORT || 8000;
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("test from olamilekan-1212");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// const allowedOrigins = ["http://example1.com", "http://example2.com"];
// const corsOptions: cors.CorsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(function () {
    console.log("connected to the database");
})
    .catch(function (error) {
    console.log(error);
});
app.get("/test", function (req, res) {
    res.send("Hello World");
});
app.use("/api/my/users", MyUserRoutes_1.default);
app.use("/api/my/products", MyProductRoutes_1.default);
app.use("/api/my/suppliers", MySupplierRoutes_1.default);
app.listen(PORT, function () {
    console.log("server running on port ".concat(PORT));
});
