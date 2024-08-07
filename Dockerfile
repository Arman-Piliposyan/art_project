#stage1 - build react app first 
FROM node:17.8.0-alpine AS builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json /app/
COPY ./.env  /app/
# COPY .npmrc /app/
RUN  npm install
COPY . /app
RUN     npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY ./.env  /app/
COPY    --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/         
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]