var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static('./dist'));
app.listen(app.get('port'));
