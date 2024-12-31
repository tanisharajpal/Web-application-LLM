FROM python:3.9.5

ENV DEBUG=1

WORKDIR /opt/back

RUN apt -y update && \
    rm -rf /var/lib/apt/lists/*

COPY back/requirements.txt .

RUN pip install -r requirements.txt

COPY back/ .

CMD python -m uvicorn back.main:app --host 0.0.0.0 --port 5000 --reload