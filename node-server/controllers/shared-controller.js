const Order = require("../models/order.js");
const OrdersItems = require("../models/ordersItems");
const Customer = require("../models/customer");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    let customerId;
    if(req.body.newCustomer){
        Customer.create(req.body.CustomerName, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        }).then((data) => {
            customerId = data.id;
        });

    } else{
        customerId = req.body.CustomerId;
    }

    const order = new Order({
        CustomerId: customerId,
        Date: req.body.Date,
        Total: req.body.Total
    });

    const Items = req.body.Items;

    return new Promise((resolve, reject) => {
        Order.create(order, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => {
        let itemQuery = [];
        let orderId = data.id;
        let returnData = data;

        Items.forEach((item) => {
            let ordersItems = new OrdersItems({
                OrderId: orderId,
                ItemId: item.ItemId,
                Quantity: item.Quantity
            });

            itemQuery.push(
                new Promise((resolve, reject) => {
                    OrdersItems.create(ordersItems, (err, data) => {
                        if(err){
                            reject(err);
                        }
                        resolve(data);
                    });
                })
            );
        });

        Promise.all(itemQuery).then((returnItems) => {
            returnData.items = returnItems;
            res.send(returnData);
        });
    },
        (error) => res.status(500).send({
            message: error.message
        })
    );
};

exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Order.getAllWithCustomers((err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((orders) => {
            let returnOrders = [];
            let itemQueries = [];
            orders.forEach((order) => {
                itemQueries.push(
                    new Promise((resolve, reject) => {
                        OrdersItems.getItemsById(order.OrderId, (err, itemData) => {
                            if(err){
                                reject(err);
                            }
                            order.Items = itemData;
                            resolve(order);
                        });
                    })
                        //Workaround if Promise.all().then() stops working again
                        // .then((order) => {
                        //         //returnOrders.push(order);
                        //     },
                        //     (error) => res.status(500).send({
                        //         message: error.message
                        //     })
                );
            });

            Promise.all(itemQueries).then((values) => {
                console.log(values);
                res.send(values)
            }).catch(error => console.log("error: " + error));


            // //Workaround for Promise.all().then() not running...
            // setTimeout(() => {
            //     res.send(returnOrders);
            // }, 2000)
        },
        (error) => res.status(500).send({
            message: error.message
        })
    );
};

exports.findOne = (req, res) => {
    return new Promise( (resolve, reject) => {
        Order.findById(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        })}).then(
        (OrderData) => {
            new Promise(((resolve, reject) => {
                OrdersItems.getItemsById(OrderData.OrderId, (err, itemData) => {
                    if(err){
                        reject(err);
                    }
                    OrderData.Items = itemData;
                    resolve(OrderData);
                });
            })).then((OrderData) => res.send(OrderData),
                (error) => res.status(500).send({
                    message: error.message
                }))
        }, (error) => {
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

exports.delete = (req, res) => {
    return new Promise((resolve, reject) => {
        OrdersItems.remove(req.params.orderId, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then(() => {
            new Promise((resolve, reject) => {
                Order.remove(req.params.orderId,(err, data) => {
                    if(err){
                        reject(err);
                    }
                    resolve(data);
                });
            }).then( () => res.send({message: 'Order successfully deleted with id: ' + req.params.orderId}),
                (error) => res.status(500).send({
                    message: error.message
                }))
        },
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


