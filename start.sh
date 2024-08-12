#!/bin/bash

if [ "$1" == "dev" ]; then
    cd server/ && npm run dev &
    cd client/ && npm run dev
else
    cd server/ && npm run start &
    cd client/ && npm run build && http-server dist/
fi
