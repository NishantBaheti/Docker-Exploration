FROM python:3.9.2-alpine3.12

EXPOSE 8080

WORKDIR app
COPY . .
RUN pip install -r requirements.txt

CMD ["python","app.py"]


# docker build -t pythonapi:1.0.0 .
# docker container run -it -d -p 5000:8080 --network custom_network --name pythonapi pythonapi:1.0.0
