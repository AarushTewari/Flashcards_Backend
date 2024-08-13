import express from 'express';
import { categoryList } from '../controllers/categoryController.js';

export const categoryRouter = express.Router();

categoryRouter.get("/list", categoryList);