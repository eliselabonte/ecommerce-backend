const router = require('express').Router();
const apiRoutes = require('./api');
const categoryRoutes = require('./api/category-routes');
const productRoutes = require('./api/product-routes')
const tagRoutes = require('./api/tag-routes');

router.use('/api', apiRoutes);

router.use('/', categoryRoutes);
router.use('/', productRoutes);
router.use('/', tagRoutes);

module.exports = router;