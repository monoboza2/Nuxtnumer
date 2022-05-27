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
EXPOSE 3000

CMD [ "npm", "start" ]

# FROM node:16.13.1

# RUN mkdir -p /usr/app
# WORKDIR /usr/app

# COPY package.json /usr/app
# COPY package-lock.json /usr/app
# # COPY yarn.lock .

# RUN npm install
# RUN npm run build

# COPY . /usr/app

# ENV HOST 0.0.0.0
# EXPOSE 3000

# CMD [ "npm","start" ]
