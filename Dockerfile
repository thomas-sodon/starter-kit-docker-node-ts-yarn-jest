FROM node:22.12.0-alpine as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json yarn.lock tsconfig.json ./
COPY src/ src/
COPY config/ config/
# RUN npm install -g yarn
RUN yarn --immutable
RUN yarn build

FROM node:22.12.0-alpine as runner
USER node
COPY --from=builder --chown=node:node /home/node/app/dist ./
COPY --from=builder --chown=node:node /home/node/app/config ./config
CMD [ "node", "index.js" ]