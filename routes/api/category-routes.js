const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// http://test.heroku.com/api/categories/
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// http://test.heroku.com/api/categories/:id
// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
})


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: "Category updated successfully" })
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categories) {
      res.status(404).json({ message: 'No categories found with this id!' })
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
