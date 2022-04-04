const router = require('express').Router();
const sequelize = require('../config/connection');
const { Tag, Product, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Product.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [{
            model: Tag,
            attributes: ['tag_name', 'tag_color']
        },
        {
            model: User,
            attributes: ['username', 'monthly_income']
        }]
    })
        .then(dbProductData => {
            const products = dbProductData.map(product => product.get({ plain: true }));
            console.log(products)
            res.render('dashboard', {
                products,
                loggedIn: true,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
})

// Edit a product
router.put('/edit/:id', withAuth, (req, res) => {
    Product.findByPk(req.params.id, {
        attributes: ['product_name', 'price', 'tag_id'],
        include: [{
            model: Tag,
            attributes: ['tag_name', 'tag_color']
        }],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbProductData => {
            const product = dbProductData.get({ plain: true });
            res.render('edit-product', {
                product,
                loggedIn: true,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
})

module.exports = router;