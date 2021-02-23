const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3080;

app.use(bodyParser.json());
app.use(cors());


require('./routes/customer-routes')(app);
require('./routes/item-routes')(app);
require('./routes/order-routes')(app);
require('./routes/user-routes')(app);


app.listen(PORT, () => console.log('Server listening on port ' + PORT));