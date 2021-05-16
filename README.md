Redis Hackathon Project
----


# Docker commands

docker run -p 6379:6379 -v redis-data:/data -v redis-config:/usr/local/etc/redis --name redismod redislabs/redismod --include /usr/local/etc/redis/redis.conf

docker start redismod

docker exec -it redismod bash

docker exec -it redismod redis-cli

telegraf  --config ./telegraf.conf  --debug



# Improvements

flatten models hashset
flatten donations into hashset


# TODOs

1. Request body validation
2. URL encoding
3. Login and user management
4. write unknown error handler. don't leak server error messages in response.
5. check ramifications of javascript int time treatment
6. redis command return value handling




----