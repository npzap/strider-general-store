const Order = require("../models/order.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const order = new Order({
        CustomerId: req.body.CustomerId,
        Date: req.body.Date,
        Total: req.body.Total
    });

    return new Promise((resolve, reject) => {
        Order.create(order, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => res.status(500).send({
            message: error.message
        })
    );
};

exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Order.getAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => res.status(500).send({
            message: error.message
        }));
};

exports.findOne = (req, res) => {
    return new Promise((resolve, reject) => {
        Order.findById(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `Order not found with id: ` + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }}
        );
};

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    return new Promise((resolve, reject) => {
        Order.updateById(req.params.orderId, new Order(req.body), (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `Order not found with id: ` + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });


};

exports.delete = (req, res) => {
    return new Promise((resolve, reject) => {
        Order.remove(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'Order successfully deleted with id: ' + req.params.orderId}),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'Order not found with id: ' + req.params.orderId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });
};

exports.deleteAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Order.removeAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'All orders were successfully deleted'}),
        (error) => res.status(500).send({
            message: error.message
        }));
};