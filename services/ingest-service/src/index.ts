import express from 'express';
import cron from 'node-cron';
import { WooClient } from './clients/wooClient';
import { syncProducts } from './workers/wooSync';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize WooCommerce client
const wooClient = new WooClient();

// Set up a cron job to sync products every hour
cron.schedule('0 * * * *', async () => {
    console.log('Running product sync...');
    await syncProducts(wooClient);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Ingest service is running on port ${PORT}`);
});