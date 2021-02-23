const Customer = require("../models/customer.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const customer = new Customer({
        CustomerName: req.body.CustomerName
    });

    return new Promise((resolve, reject) => {
        Customer.create(customer, (err, data) => {
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

exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Customer.getAll((err, data) => {
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
        Customer.findById(req.params.customerId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'Customer not found with id: ' + req.params.customerId
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });
};

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    return new Promise((resolve, reject) => {
        Customer.updateById(req.params.customerId, new Customer(req.body), (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });

    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'Customer not found with id: ' + req.params.customerId
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
        Customer.remove(req.params.customerId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'Customer successfully deleted with id: ' + req.params.customerId}),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'Customer not found with id: ' + req.params.customerId
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
        Customer.removeAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'All customers were successfully deleted'}),
        (error) => res.status(500).send({
            message: error.message
        }));
};