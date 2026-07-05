const categoryService = require('../services/category.service');

class CategoryController {
    async getAllCategories(req, res) {
        const categories = await categoryService.listCategories();

        return res.status(200).json(categories);
    }

    async createCategory(req, res) {
        
        const categoryObject = req.body;
        
        const newCategory = await categoryService.generateCategory(categoryObject);

        return res.status(201).json(newCategory);
    }

    async deleteCategory(req, res) {
        const { id } = req.params;

        await categoryService.removeCategory(parseInt(id));

        return res.status(204).json();
    }
}

module.exports = new CategoryController();