FROM python:3.10.12

WORKDIR /api-redis

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 3003

CMD ["python3", "main.py"]