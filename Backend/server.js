const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fundRoutes = require('./routes/fundRoutes');
const optionRoutes = require('./routes/optionRoutes');
const userDetailsRoutes = require('./routes/userDetails')
const initiativeRoutes = require('./routes/initiative')
const paymentRoutes = require('./routes/payment');
const docRoutes = require('./routes/docRoutes')
const bodyParser = require('body-parser');
const { jwtAuthMiddleware } = require('./jwt')
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path')
const app = express();
require('dotenv').config();

const _dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: process.env.frontend_url, credentials: true }));
app.use("/files", express.static("files"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use('/', authRoutes);
app.use('/fund', jwtAuthMiddleware, fundRoutes);
app.use('/options', optionRoutes);
app.use('/init', jwtAuthMiddleware, initiativeRoutes);
app.use('/doc', jwtAuthMiddleware, docRoutes);
app.use('/ud', jwtAuthMiddleware, userDetailsRoutes);
app.use('/pay', jwtAuthMiddleware, paymentRoutes);

app.use(express.static(path.join(_dirname, "/Frontend/build")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "build", "index.html"))
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

