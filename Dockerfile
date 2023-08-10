# Grabbing NodeJS v20 img
FROM  node:20
# CD into image working directory (all commands here on will be called in /app)
WORKDIR /app
# Copy package.json into /app
COPY package.json .
# Install needed packages
RUN npm install
# Copy all code in this project over to /app (ignores anything in .dockerignore)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]