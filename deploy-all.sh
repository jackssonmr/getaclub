#!/usr/bin/env bash

#. ./setup-env.sh
. ./build-all.sh

if [ -d "deployment" ]; then
  rm -rf deployment;
fi

note "Generando Contenedores Docker..."; docker-compose build --no-cache;
note "Realizando limpieza..."; docker rmi $(docker images -f "dangling=true" -q)
mkdir deployment; cd deployment; note "Generando Paquetes para Contenedores...";
docker images --format "{{.Repository}} " | grep covid19 | xargs -t -I {} docker save --output {}.tar {}:latest;
docker images --format "docker load < {{.Repository}}.tar " | grep covid19 > import-all.sh; cd -
