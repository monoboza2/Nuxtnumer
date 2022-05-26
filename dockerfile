
FROM node:lts as builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . .

RUN npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run build

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:lts

WORKDIR /usr/app

COPY --from=builder /usr/app  .

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]
