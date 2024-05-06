# phpmy admin
version: "3.8"
services:
  mysql-db:
    image: mariadb:10.5
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
      MYSQL_DATABASE: $MYSQL_DATABASE
      MYSQL_USER: $MYSQL_USER
      MYSQL_PASSWORD: $MYSQL_PASSWORD
    ports:
      - 3306:3306
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      PMA_HOST: $MYSQLDB_HOST
      MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
  back:
    build: ./back
    restart: always
    ports:
      - 8001:5000
    volumes:
      - ./back/src:/app/src
      - ./back/package.json:/app/package.json
      - ./back/tsconfig.json:/app/tsconfig.json
    depends_on:
      - mysql-db