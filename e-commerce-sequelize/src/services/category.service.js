const categoryRepository = require('../repositories/category.repository');
const { NotFoundError } = require('../errors');

class CategoryService {
    async listCategories() {
        return categoryRepository.getCategories();
    }

    async generateCategory(categoryObject) {
        return categoryRepository.addCategory(categoryObject);
    }

    async removeCategory(categoryId) {
        const deletedCount = await categoryRepository.deleteCategory(categoryId);

        if(!deletedCount) {
            throw new NotFoundError('Category not found', 'CAT_NOT_FOUND');
        }

        return deletedCount;
    }
}

module.exports = new CategoryService();