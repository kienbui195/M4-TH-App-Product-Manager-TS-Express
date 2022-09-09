"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const port = 8000;
data_source_1.AppDataSource.initialize().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.set('view engine', 'ejs');
    app.set('views', path_1.default.join(__dirname, 'views'));
    app.use(body_parser_1.default.json());
    const ProductRepo = connection.getRepository(Product_1.Products);
    app.get('/product/create', (req, res) => {
        res.render('create');
    });
    app.post('/product/create', upload.none(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body.name && req.body.author && req.body.price) {
            const productData = {
                name: req.body.name,
                price: req.body.price,
                author: req.body.author,
                avatar: req.body.avatar
            };
            const product = yield ProductRepo.save(productData);
            res.redirect('/');
        }
        else
            res.redirect('/product/create');
    }));
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield ProductRepo.find();
        res.render('list', { data: products });
    }));
    app.listen(port, () => {
        console.log(`running at http://localhost:${port}`);
    });
}));
//# sourceMappingURL=index.js.map