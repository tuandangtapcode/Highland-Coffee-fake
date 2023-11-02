const CategoriesRoutes = require('./categories.routes');
const ProductsRoutes = require('./products.routes')
const CustomerRoutes = require('./customers.routes');
const OrdersRoutes = require('./orders.routes');
const CommentsRoutes = require('./comments.routes');

function routes(app) {
    app.use('/categories', CategoriesRoutes);
    app.use('/products', ProductsRoutes);
    app.use('/customers', CustomerRoutes);
    app.use('/orders', OrdersRoutes);
    app.use('/comments', CommentsRoutes);
}

module.exports = routes;