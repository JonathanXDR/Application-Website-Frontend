// The account that owns the API key. Flick has no OAuth and no cross-account
// reads.
export interface FlickProfile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  profile_picture_url: string | null
  is_pro: boolean
}

export interface FlickFollowedUser {
  /** Exactly the value the write endpoints accept for `watched_with`. */
  user_id: string
  username: string
  display_name: string | null
  profile_picture_url: string | null
  is_pro: boolean
  followed_at: string
}
