const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');
const blogController = require('../../controllers/blog.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Blog'), validate(blogValidation.createBlog), blogController.createBlog)
  .get(auth('getBlog'), validate(blogValidation.getBlogs), blogController.getBlogs);

router
  .route('/:blogId')
  .get(auth('getBlog'), validate(blogValidation.getBlog), blogController.getBlog)
  .patch(auth('Blog'), validate(blogValidation.updateBlog), blogController.updateBlog)
  .delete(auth('Blog'), validate(blogValidation.deleteBlog), blogController.deleteBlog);

module.exports = router;
