import Joi from "joi";

export const createProjectSchema = Joi.object({
  projectId: Joi.string().allow(null).optional().messages({
    "string.base": "Project ID must be a text value",
  }),

  title: Joi.string().required().messages({
    "string.base": "Title must be a text value",
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),

  description: Joi.string().min(10).required().messages({
    "string.base": "Description must be a text value",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters long",
    "any.required": "Description is required",
  }),

  dueDate: Joi.date().greater("now").required().messages({
    "date.base": "Due date must be a valid date",
    "date.greater": "Due date must be in the future",
    "any.required": "Due date is required",
  }),

  tags: Joi.array()
    .items(
      Joi.string().messages({ "string.base": "Each tag must be a text value" })
    )
    .required()
    .messages({
      "array.base": "Tags must be an array",
      "array.includes": "Tags must only contain text values",
      "any.required": "Tags are required",
    }),

  priority: Joi.string().valid("low", "medium", "high").required().messages({
    "string.base": "Priority must be a text value",
    "any.only": "Priority must be one of: low, medium, high",
    "any.required": "Priority is required",
  }),
});

export const updateProjectSchema = Joi.object({
  projectId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  dueDate: Joi.date().greater("now").required(),
  tags: Joi.array().items(Joi.string()).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
});
