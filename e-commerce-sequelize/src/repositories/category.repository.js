const { Category } = require('../../models');

class CategoryRepository {
    async getCategories() {
        return Category.findAll();
    }

    async getByIds(ids) {
        return Category.findAll({
            where: {
                id: ids
            }
        })
    }

    async addCategory(categoryObject) {
        return Category.create(categoryObject);
    }

    async deleteCategory(categoryId) {
        const deletedCount = Category.destroy({
            where: {
                id: categoryId
            }
        });

        return deletedCount;
    }
}

module.exports = new CategoryRepository();