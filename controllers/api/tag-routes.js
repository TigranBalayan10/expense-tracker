const router = require('express').Router();
const { Product, Tag, User } = require('../../models');

// Get all routes
router.get('/', (req, res) => {
    Tag.findAll({
        include: [
            {
                model: Product,
                include: [{
                    model: User,
                    attributes: { exclude: ['password']}
                }]
            },
    ],
    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
        );
});

// Find one tag
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


// create a new tag
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name,
        tag_color: req.body.tag_color,

    })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
        
    })
    .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with that ID'});
        return;
    }
    res.json(dbTagData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err)
    });
});

router.put('/:id', (req, res) => {
    Tag.update(req.body,{
        
        where: {
            id: req.params.id
        }
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

module.exports = router;