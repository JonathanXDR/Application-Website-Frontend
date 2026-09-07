import type { H3Event } from 'h3'

// Items in one of the owner's custom lists, ranked lists already in rank
// order. Upstream this is `GET /me/lists/{list_id}/items`; the id arrives as
// a query param instead of a route segment because every existing route in
// this project is a flat file and reads its input through `getQuery`, which
// keeps the `cacheKey` composition uniform across all of them.
//
// The id is charset-validated rather than merely escaped, so a caller cannot
// steer the request at another upstream path. It is not pinned to a single
// list the way the GitHub routes pin the repository owner: every list this
// can reach belongs to the key owner and is already enumerated by
// `/api/flick/lists`, so accepting the id exposes nothing that route does not.
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
