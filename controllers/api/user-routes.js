const router = require('express').Router();
const { Product, Tag, User } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
        include: {
            model: Product
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Product,
                include: [{
                    model: Tag
                }]
            },
    ],
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// Create User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        monthly_income: req.body.monthly_income
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// Update User
router.put('/:id', (req, res) => {
    User.update(req.body, {
        
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// Delete User
router.delete('/:id',(req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })

    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that Id.'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;