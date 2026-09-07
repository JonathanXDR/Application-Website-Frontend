// The account that owns the API key. Flick has no OAuth and no cross-account
// reads, so this is always the key owner and never an arbitrary user.
export interface FlickProfile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  profile_picture_url: string | null
  is_pro: boolean
}

// A user the key owner follows. `user_id` is exactly the value the write
// endpoints accept for `watched_with`, which is why the documentation calls
// this the discovery endpoint for co-watcher tagging.
export interface FlickFollowedUser {
  user_id: string
  username: string
  display_name: string | null
  profile_picture_url: string | null
  is_pro: boolean
  followed_at: string
}
