"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisClient = void 0;
// redis.ts
var ioredis_1 = require("ioredis");
var RedisClient = /** @class */ (function () {
    function RedisClient() {
    }
    RedisClient.getInstance = function () {
        if (!RedisClient.instance) {
            RedisClient.instance = new ioredis_1.default({
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                password: process.env.REDIS_PASSWORD,
                db: 0,
                retryStrategy: function (times) {
                    if (times > 10)
                        return null;
                    return Math.min(times * 500, 5000);
                },
                reconnectOnError: function (err) {
                    var targetErrors = ['ECONNREFUSED', 'NR_CLOSED'];
                    return targetErrors.some(function (e) { return err.message.includes(e); });
                },
                maxRetriesPerRequest: 3,
                lazyConnect: true,
                enableOfflineQueue: true,
                connectTimeout: 10000,
                commandTimeout: 5000,
            });
            RedisClient.instance.on('error', function (err) {
                console.error('Redis error:', err);
            });
            RedisClient.instance.on('connect', function () {
                console.log('Redis connected');
            });
        }
        return RedisClient.instance;
    };
    return RedisClient;
}());
exports.RedisClient = RedisClient;
exports.redis = RedisClient.getInstance();
