#!/bin/sh
# Starts wg-easy and, next to it, the WireRoute relay. The relay is
# restarted if it ever stops; wg-easy itself runs exactly as upstream.
# WIREROUTE_RELAY=off turns the relay off.
( while :; do /usr/local/bin/wireroute-relay; sleep 3; done ) &
exec node server/index.mjs
