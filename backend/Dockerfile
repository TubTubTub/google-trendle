FROM python:3.11-alpine
WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

# docker build -t backend .
# docker run -it --rm -p 5000:5000 backend