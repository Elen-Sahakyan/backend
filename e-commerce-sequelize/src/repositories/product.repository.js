const { Product, Category, Review } = require('../../models');

class ProductRepository {
    async findAllProducts(category = null) {
		if(!category) {
			return Product.findAll();
        }
		return Product.findAll({
			include: [
				{
					model: Category,
					where: {
						name: category
					},
					as: 'categories'
				}
			]
		})
    }

	async findOneProduct(productId) {
		return Product.findByPk(productId, {
			include: [
				{ 
					model: Category,
					as: 'categories'
				},
				{ 
					model: Review,
					as: 'reviews'
				}
			]
		})
	}

	async createProduct(productData) {
		const product = await Product.create(productData);

		await product.setCategories(productData.categoryIds);

		return product;
	}

	async updateProduct(productData, productId) {
		const [, [updatedProduct]] = await Product.update(productData, {
			where: {
				id: productId
			},
			returning: true
		});

		return updatedProduct;
	}

	async decrimentStock(stock, quantity, productId, transaction) {
		const [, [updatedProduct]] = await Product.update( { stock: stock - quantity }, {
			where: {
				id: productId
			},
			returning: true,
			transaction
		});
		return updatedProduct;
	}

	async deleteProduct(productId) {
		const deletedCount = await Product.destroy({
			where: {
				id: productId
			}
		})

		return deletedCount
	}
}

module.exports = new ProductRepository();

