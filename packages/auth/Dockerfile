# First stage

FROM node:alpine as builder

WORKDIR /app

COPY *.json .
COPY yarn.lock .

COPY packages/auth/*.json ./packages/auth/
COPY packages/common/*.json ./packages/common/

RUN yarn install

COPY packages/auth/ ./packages/auth/
COPY packages/common/ ./packages/common/

RUN yarn run build

### Second stage
#FROM node:alpine
#
#WORKDIR /app
#
#COPY *.json .
#COPY yarn.lock .
#
#COPY --from=builder /app/packages/auth/package.json ./packages/auth/package.json
#COPY --from=builder /app/packages/auth/dist ./packages/auth/dist
#
#COPY --from=builder /app/packages/common/package.json ./packages/common/package.json
#COPY --from=builder /app/packages/common/dist ./packages/common/dist
#
#RUN yarn global add lerna
#RUN yarn install --production
#
#WORKDIR /app/packages/auth

CMD ["yarn", "start"]
