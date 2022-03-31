const router = require('express').Router();
const { Product, Tag, User, ProductTag } = require('../../models');
const { route } = require('./tag-routes');
// const ProductTag = require('../../models/Product_Tag');

// Get all products, tags, and users
router.get('/', (req, res) => {
    Product.findAll({
        include: [
            {
                model: Tag
            },
            {
                model: User,
                attributes: {exclude: ['password']},
            }
        ],
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

// Find one product 
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Tag
            },
            {
                model: User
            }
    ]
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

// Create a new product
router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        user_id: req.body.user_id,
        tag_id: req.body.tag_id
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Update 
router.put('/:id', (req, res) => {
    Product.update(req.body,{ 
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if(!dbProductData) {
            res.status(400).json({ message: 'No product with that id found'})
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    })
})

// Delete Product
router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if(!dbProductData) {
            res.status(404).json({ message: 'No user found with that id'})
            return;
        }
        res.json(dbProductData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;