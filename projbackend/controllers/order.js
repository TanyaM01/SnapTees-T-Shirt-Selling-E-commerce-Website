const {Order, ProductCart} = require("../models/order")


exports.getOrderById = (req,res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price") //that individual product, don't put comma
    .exec((err,order)=> {
        if(err){
            return res.status(400).json({
                error: "No order found in DB"
            })
        }
        req.order = order;
        next();
    } )
}

exports.createOrder = (req,res) => {
    req.body.order.user = req.profile;         //req.body.order.user = req.profile;: This line is setting the user property within the order property of the request body to the user profile information obtained from req.profile.
    const order = new Order(req.body.order) //This line creates a new instance of the Order model using the data present in the order property of the request body (req.body.order).
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
            error: "Failed to save your order in DB"
            })
        }
        res.json(order)
    })
}

exports. getAllOrders =(req, res) => {
    Order.find().populate("user", "_id name").exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "NO Orders found in DB"
            })
        }
        res.json(order)
    })
}


exports. getOrderStatus = (req, res) => {
 res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error: "cannot update order status"
                })
            }
            res.json(order)
        }
    )    
}