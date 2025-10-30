import { WooClient } from '../clients/wooClient';
import { Product } from '../../libs/common/src/types'; // Assuming Product type is defined in common library
import { Database } from '../../libs/common/src/utils'; // Assuming a utility for database operations

const wooClient = new WooClient();

async function syncProducts() {
    try {
        const products: Product[] = await wooClient.fetchProducts();
        await Database.saveProducts(products);
        console.log(`Successfully synced ${products.length} products.`);
    } catch (error) {
        console.error('Error syncing products:', error);
    }
}

export { syncProducts };