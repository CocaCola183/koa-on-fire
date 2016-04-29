FROM node:4.4.1

# MAINTAINER
MAINTAINER Kivi

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production
RUN mkdir -p /app/dist && cp -a /tmp/node_modules /app/
ADD config.json /app/config.json

# Define working directory
WORKDIR /app
ADD ./dist /app/dist

# Expose port
EXPOSE  8080

# Run app using nodemon
CMD ["nodemon", "/app/dist/index.js"]
