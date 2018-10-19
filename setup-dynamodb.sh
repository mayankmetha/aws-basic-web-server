#!/bin/bash
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name Books --key-schema AttributeName=isbn,KeyType=HASH --attribute-definitions AttributeName=isbn,AttributeType=S --provisioned-throughput ReadCapacityUnits=25,WriteCapacityUnits=25
node testPutItem.js