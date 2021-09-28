const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  Category.findAll({
      include: [{model: Product}]
    }).then((categories) => {
      res.json(categories)
    }).catch((err)=>  {
      res.status(500).json(err)
    })
});

router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const category = await Category.findByPk(req.params.id, {
      include:  [{model: Product}]
    })
    res.json(category)
  }
  // is a 404 error appropriate here?
  catch { err =>{
    res.status(404).json(err)
      }
  }
});

// double check this one
// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: { id: req.params.id }, 
  })
    .catch((err) => res.status(500).json(err))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {id: req.params.id}
    })

    if (!category) {
      res.status(404).json({ message: 'no category found with that id.'})
    }
  }
  catch {
    res.status(500).json(err);
  }
});

module.exports = router;
