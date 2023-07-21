# base stage

FROM node:18.15-alpine as base

WORKDIR /app

# dev stage

FROM base as dev

COPY *.json ./
COPY yarn.lock ./
COPY jest.config.ts ./

COPY packages/auth/*.json ./packages/auth/
# Copy common package inside auth container -> it is a local package, not npm hosted 
COPY packages/common/*.json ./packages/common/

RUN apk add --no-cache --virtual .gyp python3 make g++
RUN yarn install
RUN apk del .gyp

COPY packages/auth/ ./packages/auth/
COPY packages/common/ ./packages/common/

RUN yarn run build

# prod stage

FROM base as prod

COPY *.json ./
COPY yarn.lock ./

COPY --from=dev /app/packages/auth/package.json ./packages/auth/package.json
COPY --from=dev /app/packages/auth/dist ./packages/auth/dist

COPY --from=dev /app/packages/common/package.json ./packages/common/package.json
COPY --from=dev /app/packages/common/dist ./packages/common/dist

RUN yarn install --production

WORKDIR /app/packages/auth

CMD ["yarn", "start"]
