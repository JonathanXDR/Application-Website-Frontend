/**
 * Returns the credential, or throws a 404 when it is unset. Hiding an
 * endpoint whose credential is optional at deploy time, rather than proxying
 * an upstream auth error, keeps an absent secret from flipping it from inert
 * to live but broken. `label` names the credential in the server log, never
 * its value.
 */
export function requireCredential(
  value: string | undefined,
  label: string,
): string {
  if (!value) {
    console.error(
      '[config]',
      `endpoint disabled: credential ${label} is not set. Set it in the environment to enable this route.`,
    )
    throw createError({
      status: 404,
      statusText: 'Not Found',
    })
  }
  return value
}
