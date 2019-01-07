#!/bin/bash

API="http://localhost:4741"
URL_PATH="/bucketLists"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "bucketli.st": {
      "title":"'"${TITLE}"'",
      "subtitle":"'"${SUBTITLE}"'",
      "description":"'"${DESCRIPTION}"'"
    }
  }'

echo
