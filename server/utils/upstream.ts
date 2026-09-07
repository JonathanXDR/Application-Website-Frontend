/**
 * Auth, rate-limit, and 5xx statuses reflect our own credential or quota state
 * with the upstream rather than the caller's request, so forwarding them would
 * wrongly tell a valid caller they were unauthorized. They collapse to gateway
 * errors instead. `statusText` reaches the client, so callers pass a fixed
 * string and log the upstream detail themselves.
 */
export function mapUpstreamStatus(status: number, statusText: string) {
  if (status === 404) return { status: 404, statusText }
  if (status === 400 || status === 422) return { status, statusText }
  if (status === 429) return { status: 503, statusText }
  return { status: 502, statusText }
}
