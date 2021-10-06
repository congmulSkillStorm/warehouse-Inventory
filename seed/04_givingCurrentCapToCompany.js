import mongoose from 'mongoose';
import { Company, Warehouse } from '../models/index.js';

let allCompanieswithWarehouse = await Company.find({}).populate('Warehouse');