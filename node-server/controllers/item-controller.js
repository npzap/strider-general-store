const Item = require("../models/item.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const item = new Item({
        ItemName: req.body.ItemName,
        Price: req.body.Price,
        Active: true
    });

    return new Promise((resolve, reject) => {
        Item.create(item, (err, data) => {
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
        Item.getAll((err, data) => {
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
        Item.findById(req.params.itemId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `Item not found with id: ` + req.params.itemId
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
        Item.updateById(req.params.itemId, new Item(req.body), (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: `Item not found with id: ` + req.params.itemId
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
        Item.remove(req.params.itemId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send({message: 'Item successfully deleted with id: ' + req.params.itemId}),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'Item not found with id: ' + req.params.itemId
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
        Item.removeAll((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => res.send({message: 'All Items were successfully deleted'}),
        (error) => res.status(500).send({
            message: error.message
        }));
};