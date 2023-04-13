const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');
const path = require('path');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const productsRoute = require('./routes/productsRoute');
const usersRoute = require('./routes/usersRoute');
const salesRoute = require('./routes/salesRoute');
const saleProductsRoute = require('./routes/saleProductsRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));
app.use(registerRoute);
app.use(loginRoute);
app.use(productsRoute);
app.use(usersRoute);
app.use(salesRoute);
app.use(saleProductsRoute);
app.use(adminRoute);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('File:', req.file);
  res.status(200).json(req.file.filename);
});

app.use('/viacep', createProxyMiddleware({ target: 'https://viacep.com.br', changeOrigin: true }));

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
