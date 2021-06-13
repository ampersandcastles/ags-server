const router = require('express').Router();
const {ProductModel} = require('../models');
const middleware = require('../middleware');

let validateSession = require("../middleware/validateSession");
const {ProductModel} = require('../models');


/*********************
 * PRODUCT - CREATE A NEW ITEM TO BE ADDED TO DATABASE
 ********************/
router.post('/', validateSession, async (req, res) => {
    const {nameOfProduct, availability, 
        description, type, price, photoURL} = req.body;

    try {
        const product = await ProductModel.create({
            nameOfProduct, availability, 
        description, type, price, photoURL
        });
        res.status(200).json({
            message: "Product successfully created.",
            product
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
});

/*********************
 * PRODUCT - DELETE INDIVIDUAL LOGS BY USER
 ********************/
 router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };
  
    Product.destroy(query)
      .then(() => res.status(200).json({ message: "Product Entry Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
  

/*********************
 * PRODUCT - GETS ALL ITEMS FOR USER
 ********************/
router.get("/", (req, res) => {
  Product.findAll()
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json({ error: err }));
});




/************************
 * PRODUCT - GET BY NAME
 ***********************/
router.get("/:name", function (req, res) {
  let name = req.params.name;

  Product.findAll({
    where: { name: name },
  })
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json({ error: err }));
});



/*********************
 * PRODUCT - GET BY CATEGORY
 ********************/
 router.get('/category/:category', (req,res) => {
    Product.findAll({
        where: {
            category: req.params.category
        }
    })
        .then(logs => res.status(200).json({
            logs: logs
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

/*********************
 * PRODUCT - UPDATE
 ********************/
router.put("/edit/:id", validateSession, function (req, res) {
  const updateProductEntry = {
    name: req.body.product.name,
    price: req.body.product.price,
    description: req.body.product.description,
    availability: req.body.product.availability,
    photoURL: req.body.product.photoURL,
  };
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Product.update(updateProductEntry, query)
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json({ error: err }));
});

/*********************
 * GET PRODUCT - INDIVIDUAL ITEMS FOR A USER
 ********************/
router.get('/:id', (req,res) => {
    Food.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

/*********************
 * PUT -ALLOWS LOGGED ITEMS TO BE UPDATED BY USER
 ********************/
router.put('/:id', (req, res) => {
    Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

module.exports = router;