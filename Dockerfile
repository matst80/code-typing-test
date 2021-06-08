FROM node:14-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY --from=build-stage /app/build /usr/src/app/build

COPY index.js ./

EXPOSE 3030
CMD [ "node", "index.js" ]