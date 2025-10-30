import axios from 'axios';

class WooClient {
    private client: ReturnType<typeof axios.create>;

    constructor(url: string, consumerKey: string, consumerSecret: string) {
        this.client = axios.create({
            baseURL: url,
            auth: {
                username: consumerKey,
                password: consumerSecret,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    public async getProducts(page: number = 1, perPage: number = 10): Promise<any> {
        try {
            const response = await this.client.get(`/products`, {
                params: {
                    page,
                    per_page: perPage,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Error fetching products: ${message}`);
        }
    }

    public async getProductById(productId: number): Promise<any> {
        try {
            const response = await this.client.get(`/products/${productId}`);
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Error fetching product with ID ${productId}: ${message}`);
        }
    }
    public async createProduct(productData: any): Promise<any> {
        try {
            const response = await this.client.post(`/products`, productData);
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Error creating product: ${message}`);
        }
    }
    public async updateProduct(productId: number, productData: any): Promise<any> {
        try {
            const response = await this.client.put(`/products/${productId}`, productData);
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Error updating product with ID ${productId}: ${message}`);
        }
    }
    public async deleteProduct(productId: number): Promise<any> {
        try {
            const response = await this.client.delete(`/products/${productId}`);
            return response.data;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Error deleting product with ID ${productId}: ${message}`);
        }
    }
}

export default WooClient;