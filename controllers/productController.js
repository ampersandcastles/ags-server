<<<<<<< HEAD
const express = require("express");
const router = express.Router();

let validateSession = require("../middleware/validateSession");
const Product = require("../db").import("../models/product");


/*********************
 * PRODUCT - CREATE A NEW ITEM TO BE ADDED TO DATABASE
 ********************/
router.post('/', (req, res) => {
    const productFromRequest = {
        nameOfProduct: req.body.nameOfProduct,
        image: req.body.image,
        category: req.body.category,
       descriptionOfProduct: req.body.descriptionOfProduct,
        owner_id: req.user.id
    }
    Product.create(productFromRequest)
        .then(log => res.status(200).json({
            log: log
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
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
=======
const router = require('express').Router();
const {ProductModel} = require('../models');

let validateSession = require("../middleware/validateSession");



/*********************
 * PRODUCT - CREATE A NEW PRODUCT TO BE ADDED TO DATABASE
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
    }catch(error){
        res.status(500).json({
            error: `Failed to created product: ${error}`
        })
    }
});

/*********************
 * PRODUCT - GETS ALL PRODUCTS FOR USER
 ********************/
 router.get("/all", validateSession, async (req, res) => {
    try {
        const allProdcuts = await ProductModel.findAll();
        res.status(200).json(allProdcuts)
    }catch(error){
        res.status(500).json({
            error: `Cannot find products: ${error}`
        })
    }
});


/************************
 * PRODUCT - GET All PRODUCTS BY TYPE
 ***********************/
 router.get("/:type", validateSession, async (req, res) => {
    try {
        const specificProduct = await ProductModel.findAll({
            where: {type: req.params.type}
        })
        res.status(200).json({
            message: `Product successfully found.`,
            product: specificProduct
        })
    }catch (error){
        res.status(500).json({
            message: `Failed to find products: ${error}`
        })
    }
 })

>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804



/*********************
<<<<<<< HEAD
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
=======
 * PRODUCT - UPDATE INDIVIDUAL PRODUCT
 ********************/
 router.put("/edit/:id", validateSession, async (req, res) => {
    const {nameOfProduct, availability, 
        description, type, price, photoURL} = req.body;

    try {
        const productUpdate = await ProductModel.update({nameOfProduct, availability, 
            description, type, price, photoURL},
            {where:{id: req.params.id}}
        )
        res.status(200).json({
            message: "Product successfully updated",
            productUpdate
        })
    }catch(error) {
        res.status(500).json({
            message: `Failed to update product: ${error}`
        })
    }

  });



/*********************
 * PRODUCT - DELETE INDIVIDUAL PRODUCT 
 ********************/

 router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const deletedProduct = await ProductModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            message: "Product has been successfully deleted",
            deletedProduct
        })
    }catch (error) {
        res.status(500).json({
            message: `Failed to delete product: ${error}`
        })
    }
  });
  





/*********************
 * PRODUCT - GET BY CATEGORY
 ********************/
//  router.get('/category/:category', (req,res) => {
//     Product.findAll({
//         where: {
//             category: req.params.category
//         }
//     })
//         .then(logs => res.status(200).json({
//             logs: logs
//         }))
//         .catch(err => res.status(500).json({
//             error: err
//         }))
// });
>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804

/*********************
 * GET PRODUCT - INDIVIDUAL ITEMS FOR A USER
 ********************/
<<<<<<< HEAD
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
=======
// router.get('/:id', (req,res) => {
//     Food.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(log => res.status(200).json({
//         log: log
//     }))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
// });
>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804

/*********************
 * PUT -ALLOWS LOGGED ITEMS TO BE UPDATED BY USER
 ********************/
<<<<<<< HEAD
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
=======
// router.put('/:id', (req, res) => {
//     Product.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(log => res.status(200).json({
//         log: log
//     }))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
// });
>>>>>>> e973021718b30d31cfb7dfcbda5f08458f529804

module.exports = router;