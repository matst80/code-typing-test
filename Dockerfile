FROM node:14-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY client/package*.json ./
RUN npm install

# Build
COPY client/. .
RUN npm run build

FROM node:14

# Create app directory

COPY --from=build-stage /app/build /usr/src/app/build

WORKDIR /usr/src/app
COPY server/. .

RUN npm install

EXPOSE 3030
CMD [ "node", "index.js" ]