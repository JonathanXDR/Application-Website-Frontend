/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2023-2024 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */

import { FILTER_TAGS, TOPIC_TYPE_TO_TAG } from "~/assets/drafts/constants/Tags";

export default {
  computed: {
    /**
     * Returns a list of the child nodes, that match the filter pattern.
     * @returns NavigatorFlatItem[]
     */
    filteredChildren: ({
      children,
      selectedTags,
      apiChanges,
      filterPattern,
      filterChildren,
    }) => filterChildren(children, selectedTags, apiChanges, filterPattern),
    navigatorItems: ({ nodesToRender }) => nodesToRender,
  },
  methods: {
    filterChildren(children, selectedTags, apiChanges, filterPattern) {
      // use Set over Array for better performance
      const selectedTagSet = new Set(selectedTags);
      // find children that match current filters
      return children.filter(
        ({
          title,
          path,
          type,
          deprecated,
          deprecatedChildrenCount,
          childUIDs,
        }) => {
          // check if `title` matches the pattern, if provided
          const titleMatch = filterPattern ? filterPattern.test(title) : true;
          // groupMarkers know how many children they have and how many are deprecated
          const isDeprecated =
            deprecated || deprecatedChildrenCount === childUIDs.length;
          let tagMatch = true;
          if (selectedTagSet.size) {
            tagMatch = selectedTagSet.has(TOPIC_TYPE_TO_TAG[type]);
            // if there are API changes and there is no tag match, try to match change types
            if (apiChanges && !tagMatch) {
              const change = apiChanges[path];
              tagMatch = selectedTagSet.has(FILTER_TAGS[change]);
            }
            if (selectedTagSet.has(FILTER_TAGS.hideDeprecated)) {
              tagMatch = !isDeprecated;
            }
          }
          // find items, that have API changes
          const hasAPIChanges = apiChanges ? !!apiChanges[path] : true;
          // make sure groupMarker's don't get matched
          return titleMatch && tagMatch && hasAPIChanges;
        },
      );
    },
  },
};
