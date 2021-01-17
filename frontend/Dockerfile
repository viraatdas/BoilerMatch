FROM node:latest

# Create app directory
RUN mkdir -p /usr/frontend/

# Install dependencies
COPY package*.json /usr/frontend/
WORKDIR /usr/frontend/

RUN npm install --quiet

# Exports
EXPOSE 3000
ENTRYPOINT ["npm", "start"]


