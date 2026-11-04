# WireRoute relay

This custom wg-easy image also runs a small relay for
WireRoute (a Chrome extension that
sends chosen sites through your WireGuard servers).

What it does: WireRoute users' browsers ask it to open connections to
websites, so the long trip between the user and this server is one
connection that stays warm, instead of every page piece warming up across
the distance. Sites with many pictures load several times faster when the
user is far from the server.

Safety:
- It listens on port 51829 but only serves connections that arrive on the
  WireGuard interface (`wg0`) from the VPN's own network. Nothing to open on
  your router; it is invisible from the internet and the LAN.
- VPN users can already reach the internet through this server; the relay
  gives them nothing new. It refuses to connect to the server itself
  (loopback).
- Plain WireGuard clients are not affected.

Settings (environment variables):

| Variable | Default | Meaning |
|---|---|---|
| `WIREROUTE_RELAY` | on | `off` turns the relay off |
| `WIREROUTE_RELAY_PORT` | `51829` | port on the VPN address |
| `WIREROUTE_RELAY_IFACE` | `wg0` | the WireGuard interface |

The source is copied from the WireRoute repository (`tools/sync-relay.sh`).
