const productRepository = require('../repositories/product.repository');
const categoryRepository = require('../repositories/category.repository');
const { 
    NotFoundError,
    BadRequestError
} = require('../errors');

class ProductService {
    async listProducts(category) {
        const products = await productRepository.findAllProducts(category);

        if(!products?.length) {
            throw new NotFoundError('Products not found', 'PROD_NOT_FOUND');
        }

        return products;
    }

    async listProduct(productId) {
        const item = await productRepository.findOneProduct(productId);

        if(!item) {
            throw new NotFoundError('Product not found', 'PROD_NOT_FOUND');
        }

        return item;
    }

    async addProduct(productData) {
        const categoryIds = productData.categoryIds
        const categories = await categoryRepository.getByIds(categoryIds);        

        if(categories.length !== categoryIds.length) {
            throw new BadRequestError('Category id/ids wrong', 'WRONG_CAT_IDS');
        }

        return productRepository.createProduct(productData);
    }

    async changeProduct(productData, productId) {
        const updatedProduct =  await productRepository.updateProduct(productData, productId);

        if(!updatedProduct) {
            throw new NotFoundError('Product not found', 'PROD_NOT_FOUND');
        }

        return updatedProduct;
    }

    async removeProduct(productId) {
        const deletedCount = await productRepository.deleteProduct(productId);

        if(!deletedCount) {
            throw new NotFoundError('Product not found', 'PROD_NOT_FOUND');
        }

        return deletedCount;
    }
}

module.exports = new ProductService();