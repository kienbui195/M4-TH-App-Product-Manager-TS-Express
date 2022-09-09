import { AppDataSource } from "./src/data-source";
import { Products } from "./src/entity/Product";
import multer from 'multer';
const upload = multer();
import express from "express";
import bodyParser from "body-parser";
import path from "path";

const port = 8000;

AppDataSource.initialize().then(async  connection => {
    const app = express();
    app.set('view engine' , 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Products);

    app.get('/product/create', (req, res) => {
        res.render('create');
    });
    app.post('/product/create', upload.none() ,async (req, res) => {
        if (req.body.name && req.body.author && req.body.price) {
            const productData = {
                name: req.body.name,
                price: req.body.price,
                author: req.body.author,
                avatar: req.body.avatar
            };

            const product = await ProductRepo.save(productData);
            res.redirect('/');
        } else res.redirect('/product/create');
    })

    app.get('/' , async (req, res) => {
        const products = await ProductRepo.find();
        res.render('list', {data: products})
    })

    app.listen(port, () => {
        console.log(`running at http://localhost:${port}`);
    })
})



