#!/bin/bash
file=/docker-entrypoint-initdb.d/data.dump
dbname=db
echo "pg_restore -U postgres --dbname=$dbname --verbose --single-transaction < $file"
pg_restore -U postgres --dbname=$dbname --verbose --single-transaction < $file
