#!/bin/sh

npm i
wait-for db:3306 -t 60 -- npx prisma migrate dev

exec $@