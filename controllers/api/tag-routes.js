const router = require('express').Router();
const { Product, Tag, User } = require('../../models');

router.get('/', (req, res) => {
    Tag.findAll({
        include: [{
            model: Product,
            attributes: ['id', 'product_name', 'price']
        }],
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
});

router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Product,
            attributes: ['id', 'product_name', 'price'],
        }]
    })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: 'No tag found with this id' });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;