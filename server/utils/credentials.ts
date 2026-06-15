// Guards endpoints whose backing credential is optional at deploy time.
// When the credential is unset the route is hidden behind a 404 instead of
// proxying an upstream auth error, so an absent secret can never silently
// flip an endpoint from inert to live. The label names the missing
// credential in the server log without ever exposing its value.
export function requireCredential(
  value: string | undefined,
  label: string,
): string {
  if (!value) {
    console.error(
      '[config]',
      `endpoint disabled, missing credential: ${label}`,
    )
    throw createError({
      status: 404,
      statusText: 'Not Found',
    })
  }
  return value
}
