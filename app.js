const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/taskRoutes.js');
const path = require('path')

const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
