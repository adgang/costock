Redis Hackathon Project
----



docker run -p 6379:6379 -v redis-data:/data -v redis-config:/usr/local/etc/redis --name redismod redislabs/redismod --include /usr/local/etc/redis/redis.conf

docker start redismod

docker exec -it redismod bash

docker exec -it redismod redis-cli




----