FROM golang:1.21.0

WORKDIR /app

COPY . .

RUN go build -o main .

EXPOSE 3004

CMD ["./main"]