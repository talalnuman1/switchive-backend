const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    blogUrl: Joi.string().required(),
  }),
};

const getBlogs = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    imageUrl: Joi.string(),
    blogUrl: Joi.string(),
  }),
};
const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
