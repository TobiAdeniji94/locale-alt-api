import client from './redis';

import dotenv from 'dotenv';
dotenv.config();

const REDIS_EXPIRATION = process.env.REDIS_EXPIRATION as string;

async function getSetCache(key: string, cb: () => Promise<any>) {
    try {
        const data = await client.get(key);
        if (data) {
            console.log("Cached");
            return JSON.parse(data);
        }
    } catch (error) {
        console.error(`Error getting data from Redis for key ${key}: ${error}`);
    }

    try {
        const new_data = await cb();
        await client.setEx(key, parseInt(REDIS_EXPIRATION), JSON.stringify(new_data));
        // console.log('New data');
        return new_data;
    } catch (error) {
        console.error(`Error setting new data in Redis for key ${key}: ${error}`);
        throw error;
    }
}

export {getSetCache};
