const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    attributes: 
      ["id", "category_name"],
      include: [{
      model: Product, 
  }],
    });
    res.json(categories);
  }
  catch (err) {
      res.json(err)
    }
    });

router.get('/:id', async(req, res) => {
  try {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category_name = await Category.findByPk(req.params.id);
  res.json(category_name);
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async(req, res) => {
  try{
  // create a new category
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  }
  catch(err){
    res.json(err)
  };
});

router.put('/:id', async(req, res) => {
  try{
  // update a category by its `id` value
 const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (updatedCategory[0] === 1) {
    res.json({ message: 'Category updated successfully' });
  } else {
    res.json({ message: 'No changes applied' });
  }
} catch (err) {
  res.status(500).json({ error: err.message });
}
});

router.delete('/:id', async(req, res) => {
  try{
  // delete a category by its `id` value
  const rmCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (rmCategory === 1) {
    res.json({ message: 'The Category has been removed' });
  } else {
    res.json({ message: 'Tag not found' });
  }
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  }); 

module.exports = router;
