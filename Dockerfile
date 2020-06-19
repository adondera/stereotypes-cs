FROM ubuntu:20.10

RUN apt-get update -y && \
    apt-get -y upgrade && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y python3-pip && \ 
    DEBIAN_FRONTEND=noninteractive apt-get install -y build-essential libssl-dev libffi-dev python3-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENV APP_SETTINGS config.DockerConfig

ENTRYPOINT [ "gunicorn" ]

CMD [ "-k", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "-w", "1","-b", "0.0.0.0:8000", "server:app"]

# populate the database
# TO BE USED WITH CARE!!!
RUN python3 -c 'print("Hello world");'
