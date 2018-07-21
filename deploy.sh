#!/bin/sh
die () {
    echo >&2 "$@"
    exit 1
}

zip -rq1 target.zip lib/ index.js node_modules/ package.json yarn.lock

[ "$#" -eq 1 ] || die "Usage: ./deploy.sh [arn]"

aws lambda update-function-code \
    --function-name $1 \
    --zip-file fileb://target.zip \
    --region eu-west-1

rm -r target.zip
