/**
 * A 404 rather than a proxied upstream auth error keeps an absent secret from
 * flipping an endpoint from inert to live but broken.
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
