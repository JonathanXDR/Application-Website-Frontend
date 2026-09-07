// The key owner's own profile, from `/me`
export interface FlickProfile {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  profile_picture_url: string | null
  is_pro: boolean
}

export interface FlickFollowedUser {
  user_id: string
  username: string
  display_name: string | null
  profile_picture_url: string | null
  is_pro: boolean
  followed_at: string
}
