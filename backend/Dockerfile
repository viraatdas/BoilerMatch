FROM node:latest

RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json /usr/src/app/
RUN npm install --quiet && mv /usr/src/app/node_modules/ /node_modules/

# Bundle app soure
COPY ./ /usr/src/app

# Exports
EXPOSE 3000
CMD [ "nodemon" ]
