const { Schema, model } = require('mongoose');

const animalSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    isVaccinated: { type: Boolean, default: false },
    species: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

const AnimalModel = model('animals', animalSchema);

module.exports = AnimalModel;
