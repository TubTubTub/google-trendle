FROM python:3.12

RUN apt-get -q -y update
RUN apt-get install -y gcc

# # #

ARG SESSION_SECRET_KEY
ARG POSTGRES_URL
ARG REDIS_URL
ARG SERP_API_KEY

ENV FLASK_APP=src
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# # #

ENV USERNAME=backend
ENV WORKING_DIR=/home/backend
WORKDIR ${WORKING_DIR}

# # #

COPY src src
COPY requirements.txt .
COPY service_entrypoint.sh .

# # #

RUN groupadd ${USERNAME} && \
    useradd -g ${USERNAME} ${USERNAME}

RUN chown -R ${USERNAME}:${USERNAME} ${WORKING_DIR}
RUN chmod -R u=rwx,g=rwx ${WORKING_DIR}

USER ${USERNAME}
ENV PATH "$PATH:/home/${USERNAME}/.local/bin"

# # #

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# # #

RUN chmod +x service_entrypoint.sh

# # #

EXPOSE 5000
RUN flask db init

ENTRYPOINT [ "./service_entrypoint.sh" ]