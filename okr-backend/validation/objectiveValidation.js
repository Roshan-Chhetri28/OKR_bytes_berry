const Joi = require('joi');

const objectiveSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().optional(),
});

const keySchema = Joi.object({
  objective_id: Joi.number().required(),
  name: Joi.string().min(3).max(255).required(),
  progress: Joi.number().integer().min(0).max(100).required(),
});

module.exports = { objectiveSchema, keySchema };
