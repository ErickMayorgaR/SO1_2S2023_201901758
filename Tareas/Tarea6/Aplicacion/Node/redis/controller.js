const redis = require('redis')


async function getRedisData() {
    const redisClient = redis.createClient({
        url: 'redis://localhost:6379',
    });
    try {
        await redisClient.connect();
        const keys = await redisClient.keys('album*');

        let dataArray = [];
        for (const key of keys) {
            const data = await redisClient.get(key);
            dataArray.push(data);
        }

        return dataArray;
    } catch (error) {
        console.log(error);
        return "Error";
    }

}

module.exports = {
    getRedisData
}