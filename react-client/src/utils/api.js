const PORT = process.env.PORT || 3080;

export function loginUser(username, password){
    const data = {
        username: username,
        password: password
    };

    return new Promise((resolve, reject) => {
       fetch('http://localhost:' + PORT + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function addCustomer(CustomerName, authToken){
    const data = {CustomerName: CustomerName};

    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function getCustomers(authToken){

    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/customers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function addItem(name, price, authToken){
    const data = {
        ItemName: name,
        Price: price
    }

    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function getItems(authToken){
    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/items', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function updateItemById(id, authToken){
    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/items' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function getOrders(authToken){
    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function addOrder(id, date, total, authToken){
    const data = {
        CustomerId: id,
        Date: date,
        Total: total
    };

    return new Promise((resolve, reject) => {
        fetch('http://localhost:' + PORT + '/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}