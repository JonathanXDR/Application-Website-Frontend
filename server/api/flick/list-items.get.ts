import type { H3Event } from 'h3'

// The list id is a query param rather than a route segment to keep every
// route a flat file with a uniform `cacheKey` composition. Leaving it
// client-supplied is safe: every list it reaches belongs to the key owner and
// is already enumerated by `/api/flick/lists`.
function getListItemsQuery(event: H3Event) {
  return {
    listId: requireFlickParam(flickPathId(getQuery(event).list_id)),
    ...getFlickPageQuery(event),
  }
}

export default defineCachedEventHandler(
  async (event) => {
    const { request } = useFlick()
    const { listId, page, limit } = getListItemsQuery(event)

    try {
      return await request<FlickPaginated<FlickListItem>>(
        `/me/lists/${listId}/items`,
        { params: { page, limit } },
      )
    }
    catch (error) {
      handleFlickError(error)
    }
  },
  {
    name: 'flick-list-items',
    maxAge: FLICK_CACHE_MAX_AGE,
    swr: true,
    getKey: (event) => {
      const { listId, page, limit } = getListItemsQuery(event)
      return cacheKey(listId, page, limit)
    },
  },
)
