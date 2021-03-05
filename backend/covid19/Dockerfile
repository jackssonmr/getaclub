FROM openjdk:8u111-jre-alpine
MAINTAINER Jackson E. Mosquera R. <jackson.mosquera@radartecnologies.com>

COPY build/libs/*.jar app.jar

#ENV SPRING_APPLICATION_JSON='{"spring": {"cloud": {"config": {"server": \
#  {"git": {"uri": "/var/lib/spring-cloud/config-repo", \
#  "clone-on-start": true}}}}}}'
ENTRYPOINT ["/usr/bin/java"]
CMD ["-jar", "/app.jar"]
VOLUME /tmp
EXPOSE 7010

# docker build --file=Dockerfile --tag=serviciocovid19:latest --rm=true .
# docker run -d -p 7021:7021 --name ServicioCovid19 serviciocovid19

# https://runnable.com/docker/binding-docker-ports
