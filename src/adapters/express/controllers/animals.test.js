const { getMockReq, getMockRes } = require('@jest-mock/express');
const animalsController = require('./animals');
const animalsService = require('../../../services/animals');
const createError = require('../../../utils/createError');
const ERROR_TYPES = require('../../../constants/errors');

jest.spyOn(animalsService, 'findOneById').mockImplementation((animalId) => {
  if (animalId === 'none') {
    throw createError(ERROR_TYPES.NOT_FOUND, {
      data: {},
      message: 'Animal with id none not found',
    });
  }

  return {
    _id: animalId,
    deletedAt: null,
    name: 'Druzhok',
    age: 3,
    gender: 'male',
    isVaccinated: true,
    species: 'dog',
    id: 'DOHxzRSQqHw26bLvG1BXN',
    createdAt: '2023-09-11T17:36:19.720Z',
    updatedAt: '2023-09-11T17:36:19.720Z',
  };
});

describe('animalsController', () => {
  beforeAll(() => {
    console.log('I run before all tests');
  });

  beforeEach(() => {
    console.log('I run before each test');
  });

  afterEach(() => {
    console.log('I run after each test');
  });

  afterAll(() => {
    console.log('I run after all tests');
  });
  describe('GET /animals/:animalId', () => {
    it('returns animal with given animalId', async () => {
      const req = getMockReq({
        params: {
          animalId: '64ff551157cc2b76b2e772a3',
        },
      });
      const { res, next } = getMockRes();

      await animalsController.getAnimal(req, res, next);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        data: {
          _id: '64ff551157cc2b76b2e772a3',
          deletedAt: null,
          name: 'Druzhok',
          age: 3,
          gender: 'male',
          isVaccinated: true,
          species: 'dog',
          id: 'DOHxzRSQqHw26bLvG1BXN',
          createdAt: '2023-09-11T17:36:19.720Z',
          updatedAt: '2023-09-11T17:36:19.720Z',
        },
      });
    });

    it('pass error to next if animal with given id does not exist', async () => {
      const req = getMockReq({
        params: {
          animalId: 'none',
        },
      });
      const { res, next } = getMockRes();

      await animalsController.getAnimal(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(
        createError(ERROR_TYPES.NOT_FOUND, {
          data: {},
          message: 'Animal with id none not found',
        }),
      );
    });
  });
});
