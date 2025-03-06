#!/bin/bash

LISTENPORT="${PORT:-3000}"
sed -i "s/listen\s*8080;/listen $LISTENPORT;/" /etc/nginx/conf.d/default.conf

REACT_APP_API_URL="${API_URL:-http://localhost:8000}" \
  REACT_APP_API_KEY="${API_KEY:-123456}" \
  npm run build && \
  cp -r /app/build/* /usr/share/nginx/html && \
  nginx -g 'daemon off;'