
# Node version
FROM node:18

# Make work directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

# Install & build
RUN npm install
RUN npm run build 

# PORT defined
EXPOSE $PORT

# Set ENV variables
ENV PORT=$PORT
ENV DB_URI=$DB_URI
ENV TEST_DB_URI=$TEST_DB_URI
ENV JWT_SECRET=$JWT_SECRET
ENV ENVIRONMENT=$ENVIRONMENT

# Execute command
CMD [ "npm", "start"]