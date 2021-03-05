#!/usr/bin/env bash

function note() {
    local GREEN NC
    GREEN='\033[0;32m'
    NC='\033[0m' # No Color
    printf "\n${GREEN}$@  ${NC}\n" >&2
}

set -e

. ./setup-env.sh

cd backend/covid19;                                 note "Generando covid19...";          ./gradlew clean bootjar; cd -


cd frontend/webapp;                                   note "Generando FrontEnd...";   ng build --prod; cd -

find . -name *SNAPSHOT.jar -exec du -h {} \;
