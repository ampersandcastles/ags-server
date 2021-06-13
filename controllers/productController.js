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
  


module.exports = router;