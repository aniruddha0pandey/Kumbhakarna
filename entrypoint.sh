#!/bin/sh
set -a; source './.env'; set +a
envsubst < './gscripts/credentials.gs' > './gscripts/credentials.tmp.gs' && mv './gscripts/credentials.tmp.gs' './gscripts/credentials.gs'

