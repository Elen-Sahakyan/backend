const productService = require('../services/product.service');

class ProductController {
    async getProducts (req, res) {
        const { category } = req.query;

        const products = await productService.listProducts(category);

        return res.status(200).json(products);
    }
 
    async getProduct (req, res) {
        const { id } = req.params;

        const product = await productService.listProduct(parseInt(id));

        return res.status(200).json(product);
    }

    async generateProduct(req, res) {
        const productData = req.body;

        const product = await productService.addProduct(productData);

        return res.status(201).json({
            message: 'Product created successfully',
            id: product.id
        })
    }

    async updateProduct(req, res) {
        const productData = req.body;
        
        const { id } = req.params;

        const updatedProduct = await productService.changeProduct(productData, parseInt(id));

        return res.status(200).json({
            message: 'Product updated successfully',
            updatedProduct: updatedProduct
        })
    }

    async deleteProduct(req, res) {
        const { id } = req.params;

        await productService.removeProduct(parseInt(id));

        return res.status(204).json();
    }

}

module.exports = new ProductController();