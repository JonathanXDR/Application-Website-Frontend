// Translates an upstream HTTP status into a client-facing one for the
// upstream proxy routes (GitHub, Apple Music, and Flick). A 404 is a genuine
// not-found and a 400/422 is a request the caller can correct, so both pass
// through unchanged. Auth, rate-limit, and 5xx statuses instead reflect *our*
// credential or quota state with the upstream, not the anonymous caller's
// request, so forwarding them verbatim would wrongly tell a valid caller they
// were unauthorized, forbidden, or rate limited. Those collapse to gateway
// errors (429 -> 503 Service Unavailable, everything else -> 502 Bad Gateway).
// The fixed `statusText` keeps upstream detail out of the public response. The
// caller logs the real status.
export function mapUpstreamStatus(status: number, statusText: string) {
  if (status === 404) return { status: 404, statusText }
  if (status === 400 || status === 422) return { status, statusText }
  if (status === 429) return { status: 503, statusText }
  return { status: 502, statusText }
}
