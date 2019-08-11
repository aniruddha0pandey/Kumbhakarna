#!/bin/sh

set -a; source './.env'; set +a
envsubst < './credentials.gs' > './credentials.tmp.gs' && mv './credentials.tmp.gs' './credentials.gs'

