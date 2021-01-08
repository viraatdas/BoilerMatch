FROM node:latest

# Create app directory
RUN mkdir -p /usr/frontend/

# Install dependencies
COPY package*.json /usr/frontend/
WORKDIR /usr/frontend/

RUN yarn install --silent

# Exports
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "web"]


