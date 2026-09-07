// A distinct review tag with its usage count. Tags are free-form personal
// strings, not a controlled vocabulary, and the endpoint returns them
// most-used first.
export interface FlickTag {
  tag: string
  count: number
}
