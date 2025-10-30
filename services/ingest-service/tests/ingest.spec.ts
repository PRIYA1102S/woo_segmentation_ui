import { WooClient } from '../src/clients/wooClient';
import { syncProducts } from '../src/workers/wooSync';

jest.mock('../src/clients/wooClient');

describe('Ingest Service', () => {
    let wooClient: WooClient;

    beforeEach(() => {
        wooClient = new WooClient();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should sync products from WooCommerce API', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        wooClient.getProducts = jest.fn().mockResolvedValue(mockProducts);

        const result = await syncProducts(wooClient);

        expect(wooClient.getProducts).toHaveBeenCalled();
        expect(result).toEqual(mockProducts);
    });

    it('should handle errors during product sync', async () => {
        wooClient.getProducts = jest.fn().mockRejectedValue(new Error('API Error'));

        await expect(syncProducts(wooClient)).rejects.toThrow('API Error');
    });
});