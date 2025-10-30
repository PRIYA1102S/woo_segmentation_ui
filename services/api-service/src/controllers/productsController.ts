import { Request, Response } from 'express';
import { Product } from '../db/prisma.schema'; // Adjust the import based on your actual Prisma model
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductsController {
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const product = await prisma.product.findUnique({
                where: { id: Number(id) },
            });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    }

    async createProduct(req: Request, res: Response) {
        const { name, price, description } = req.body;
        try {
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                },
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product' });
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;
        const { name, price, description } = req.body;
        try {
            const updatedProduct = await prisma.product.update({
                where: { id: Number(id) },
                data: {
                    name,
                    price,
                    description,
                },
            });
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update product' });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prisma.product.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
}

export default new ProductsController();