#!/bin/bash

echo "Building java docker file"
docker build -t $APP_NAME .
docker run --name $APP_NAME -d $APP_NAME


