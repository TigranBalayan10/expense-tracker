const router = require('express').Router();
const { Product, Tag, User, ProductTag } = require('../../models');
// const ProductTag = require('../../models/Product_Tag');

router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price'],
        include: [{
            model: Tag,
            attributes: ['tag_name'],
            through: ProductTag,
            as: 'tags'
        }],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbProductData => {
            const products = dbProductData.map(product => product.get({ plain: true }));
            return res.status(200).json(products);
        }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
})

router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'price'],
        include: [{
            model: Tag,
            attributes: ['tag_name']
        }],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
})

router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        tag_name: req.body.tags
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;