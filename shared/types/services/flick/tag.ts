// Tags are free-form personal strings, not a controlled vocabulary. The
// endpoint returns them most-used first.
export interface FlickTag {
  tag: string
  count: number
}
