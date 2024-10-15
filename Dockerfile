# This image will be published as dspace/dspace-angular
# See https://github.com/DSpace/dspace-angular/tree/main/docker for usage details

FROM node:18-alpine

# Ensure Python and other build tools are available
# These are needed to install some node modules, especially on linux/arm64
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

ADD . /app/

COPY config/config.development.yml /app/config/config.development.yml

COPY config/config.production.yml /app/config/config.production.yml

COPY config/config.test.yml /app/config/config.test.yml

EXPOSE 4000

# We run yarn install with an increased network timeout (5min) to avoid "ESOCKETTIMEDOUT" errors from hub.docker.com
# See, for example https://github.com/yarnpkg/yarn/issues/5540
RUN yarn install --network-timeout 300000

ENV NODE_OPTIONS="--max_old_space_size=4096"

# On startup, run in DEVELOPMENT mode (this defaults to live reloading enabled, etc).
# Listen / accept connections from all IP addresses.
# NOTE: At this time it is only possible to run Docker container in Production mode
# if you have a public URL. See https://github.com/DSpace/dspace-angular/issues/1485
ENV NODE_ENV development
CMD yarn serve --host 0.0.0.0
