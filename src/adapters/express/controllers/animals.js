const animalService = require('../../../services/animals');

const getAnimal = async (req, res, next) => {
  const { animalId } = req.params;
  try {
    const animal = await animalService.findOneById(animalId);

    res.status(200).json({
      data: animal,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnimal,
};
