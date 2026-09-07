import type { H3Event } from 'h3'

// Items in one of the owner's custom lists. Upstream this is
// `GET /me/lists/{list_id}/items`. The id arrives as a query param rather
// than a route segment to keep every route a flat file with a uniform
// `cacheKey` composition.
//
// Unlike the GitHub routes, which pin the repository owner, the id is not
// pinned: every list it can reach belongs to the key owner and is already
// enumerated by `/api/flick/lists`.
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
