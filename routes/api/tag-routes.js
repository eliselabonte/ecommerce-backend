const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product}]
  }).then((tags) => {
    res.json(tags)
  }).catch((err) => {
    res.status(500).json(err)})
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include:  [{model: Product}]
    })
    res.json(tags)
  }
  catch{
    res.status(404).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  }
  catch (err) {res.status(500).json(err)}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: { id: req.params.id }, 
  })
    .catch((err) => res.status(500).json(err))
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {id: req.params.id}
    })

    if (!tag) {
      res.status(404).json({ message: 'no tag found with that id.'})
    }
  }
  catch {
    res.status(500).json(err);
  }
});

module.exports = router;
