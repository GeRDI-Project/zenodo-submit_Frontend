# build stage
FROM node:lts-alpine as builder
RUN apk add git
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17.3-alpine
COPY build/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/html/submit
RUN mkdir /usr/share/nginx/html/submit/zenodo
COPY --from=builder /app/dist /usr/share/nginx/html/submit/zenodo
EXPOSE 80
CMD nginx -g "daemon off;"
