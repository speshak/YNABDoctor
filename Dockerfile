FROM node:latest
WORKDIR /usr/src/
RUN git clone https://github.com/vishnubob/wait-for-it.git
RUN git clone https://github.com/gruberb/YNABDoctor.git
WORKDIR /usr/src/YNABDoctor
RUN npm install
EXPOSE 8080