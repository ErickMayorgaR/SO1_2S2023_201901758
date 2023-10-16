FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=SO1Proyecto1

COPY ./database/init.sql /docker-entrypoint-initdb.d/init.sql

ENTRYPOINT ["sh", "/docker-entrypoint-initdb.d/init.sql"]

CMD ["mysqld"]
