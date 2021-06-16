const router = require('express').Router();
const {ProductModel} = require('../models');

let validateSession = require("../middleware/validateSession");



/*********************
 * PRODUCT - CREATE A NEW PRODUCT TO BE ADDED TO DATABASE
 ********************/
router.post('/', async (req, res) => {
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




/*********************
 * PRODUCT - UPDATE INDIVIDUAL PRODUCT
 ********************/
 router.put("/edit/:id", async (req, res) => {
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

 router.delete("/delete/:id", async (req, res) => {
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

/*********************
 * GET PRODUCT - INDIVIDUAL ITEMS FOR A USER
 ********************/
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

/*********************
 * PUT -ALLOWS LOGGED ITEMS TO BE UPDATED BY USER
 ********************/
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

module.exports = router;