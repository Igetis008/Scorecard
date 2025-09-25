#!/bin/bash

npm install express socket.io sqlite3 jsonwebtoken body-parser cors node-pptx googleapis axios socket.io-client react react-dom

node -e "require('./backend/config/db').init(require('sqlite3').verbose().Database('./quiz.db'))"

cd frontend && npm install && npm run build && cd ..

node backend/server.js
