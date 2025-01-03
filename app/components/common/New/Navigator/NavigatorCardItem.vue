<!--
  This source file is part of the Swift.org open source project

  Copyright (c) 2022-2024 Apple Inc. and the Swift project authors
  Licensed under Apache License v2.0 with Runtime Library Exception

  See https://swift.org/LICENSE.txt for license information
  See https://swift.org/CONTRIBUTORS.txt for Swift project authors
-->

<template>
  <BaseNavigatorCardItem
    :id="`container-${item.uid}`"
    :class="{ expanded, 'active': isActive, 'is-group': isGroupMarker }"
    :style="{ '--nesting-index': item.depth }"
    :data-nesting-index="item.depth"
    :aria-hidden="isRendered ? null : 'true'"
    :hide-navigator-icon="isGroupMarker"
    @keydown.left.prevent="handleLeftKeydown"
    @keydown.right.exact.prevent="handleRightKeydown"
    @keydown.enter.prevent="clickReference"
    @keydown.alt.right.prevent="toggleEntireTree"
  >
    <template #depth-spacer>
      <span
        :id="usageLabel"
        hidden
      >
        {{ $t("filter.navigate") }}
      </span>
      <button
        v-if="isParent"
        class="tree-toggle"
        tabindex="-1"
        :aria-labelledby="item.uid"
        :aria-expanded="expanded ? 'true' : 'false'"
        :aria-describedby="ariaDescribedBy"
        @click.exact.prevent="toggleTree"
        @click.alt.prevent="toggleEntireTree"
        @click.meta.prevent="toggleSiblings"
      >
        <InlineChevronRightIcon
          class="icon-inline chevron"
          :class="{ rotate: expanded, animating: idState.isOpening }"
        />
      </button>
    </template>
    <template #navigator-icon="{ className }">
      <TopicTypeIcon
        v-if="!apiChange"
        :key="item.uid"
        :type="item.type"
        :image-override="item.icon ? navigatorReferences[item.icon] : null"
        :should-calculate-optimal-width="false"
        :class="className"
      />
      <span
        v-else
        :class="[{ [`changed changed-${apiChange}`]: apiChange }, className]"
      />
    </template>
    <template #title-container>
      <span
        v-if="isParent"
        :id="parentLabel"
        hidden
      >{{
        $tc("filter.parent-label", item.childUIDs.length, {
          "number-siblings": item.index + 1,
          "total-siblings": item.siblingsCount,
          "parent-siblings": item.parent,
          "number-parent": item.childUIDs.length,
        })
      }}</span>
      <span
        v-if="!isParent"
        :id="siblingsLabel"
        hidden
      >
        {{
          $t("filter.siblings-label", {
            "number-siblings": item.index + 1,
            "total-siblings": item.siblingsCount,
            "parent-siblings": item.parent,
          })
        }}
      </span>
      <component
        :is="refComponent"
        :id="item.uid"
        ref="reference"
        :class="{ bolded: isBold }"
        :url="isGroupMarker ? null : item.path || ''"
        :tabindex="isFocused ? '0' : '-1'"
        :aria-describedby="`${ariaDescribedBy} ${usageLabel}`"
        class="leaf-link"
        @click.exact="handleClick"
        @click.alt.prevent="toggleEntireTree"
      >
        <HighlightMatches
          :text="item.title"
          :matcher="filterPattern"
        />
      </component>
      <Badge
        v-if="isDeprecated"
        variant="deprecated"
      />
      <Badge
        v-else-if="isBeta"
        variant="beta"
      />
    </template>
    <template #content-container>
      <slot name="card-item-content" />
    </template>
  </BaseNavigatorCardItem>
</template>

<script>
import { IdState } from 'vue-virtual-scroller'
import Badge from '~/components/common/New/Badge.vue'
import Reference from '~/components/common/New/ContentNode/Reference.vue'
import InlineChevronRightIcon from '~/components/common/New/Icons/InlineChevronRightIcon.vue'
import BaseNavigatorCardItem from '~/components/common/New/Navigator/BaseNavigatorCardItem.vue'
import HighlightMatches from '~/components/common/New/Navigator/HighlightMatches.vue'
import TopicTypeIcon from '~/components/common/New/TopicTypeIcon.vue'
import { ChangeTypesOrder } from '~/constants/Changes'
import { TopicTypes } from '~/constants/TopicTypes'
import { waitFrames } from '~/utils/loading'

export default {
  name: 'NavigatorCardItem',
  components: {
    BaseNavigatorCardItem,
    HighlightMatches,
    TopicTypeIcon,
    InlineChevronRightIcon,
    Reference,
    Badge,
  },
  mixins: [
    IdState({
      idProp: vm => vm.item.uid,
    }),
  ],
  props: {
    isRendered: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    filterPattern: {
      type: RegExp,
      default: undefined,
    },
    filterText: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBold: {
      type: Boolean,
      default: false,
    },
    apiChange: {
      type: String,
      default: null,
      validator: v => ChangeTypesOrder.includes(v),
    },
    isFocused: {
      type: Boolean,
      default: () => false,
    },
    enableFocus: {
      type: Boolean,
      default: true,
    },
    navigatorReferences: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [
    'toggle',
    'toggle-full',
    'toggle-siblings',
    'focus-parent',
    'navigate',
  ],
  idState() {
    return {
      // special state to track opening animations for a few seconds, after toggling on/off
      isOpening: false,
    }
  },
  computed: {
    isGroupMarker: ({ item: { type } }) => type === TopicTypes.groupMarker,
    isParent: ({ item, isGroupMarker }) =>
      !!item.childUIDs.length && !isGroupMarker,
    parentLabel: ({ item }) => `label-parent-${item.uid}`,
    siblingsLabel: ({ item }) => `label-${item.uid}`,
    usageLabel: ({ item }) => `usage-${item.uid}`,
    ariaDescribedBy: ({ isParent, parentLabel, siblingsLabel }) =>
      isParent ? `${parentLabel}` : `${siblingsLabel}`,
    isBeta: ({ item: { beta } }) => !!beta,
    isDeprecated: ({ item: { deprecated } }) => !!deprecated,
    refComponent: ({ isGroupMarker }) => (isGroupMarker ? 'h3' : Reference),
  },
  watch: {
    async isFocused(newVal) {
      await waitFrames(8)
      if (newVal && this.isRendered && this.enableFocus) {
        this.focusReference()
      }
    },
    async expanded() {
      // wait for 9 frames (60hz * 0.15ms = 9), for animations queues to finish.
      await waitFrames(9)
      // set the opening animation as ended
      this.idState.isOpening = false
    },
  },
  methods: {
    toggleTree() {
      this.idState.isOpening = true
      this.$emit('toggle', this.item)
    },
    toggleEntireTree() {
      this.idState.isOpening = true
      this.$emit('toggle-full', this.item)
    },
    toggleSiblings() {
      this.idState.isOpening = true
      this.$emit('toggle-siblings', this.item)
    },
    handleLeftKeydown() {
      // if not expanded, go to the nearest parent
      if (!this.expanded) {
        this.$emit('focus-parent', this.item)
        return
      }
      // close the tree otherwise
      this.toggleTree()
    },
    handleRightKeydown() {
      // if we are already expanded, dont do anything
      if (this.expanded || !this.isParent) return
      // otherwise expand
      this.toggleTree()
    },
    clickReference() {
      (this.$refs.reference.$el || this.$refs.reference).click()
    },
    focusReference() {
      (this.$refs.reference.$el || this.$refs.reference).focus()
    },
    handleClick() {
      if (this.isGroupMarker) return
      this.$emit('navigate', this.item.uid)
    },
  },
}
</script>

<style scoped lang="scss">
// @import "docc-render/styles/_core.scss";

$tree-toggle-padding: $nav-card-horizontal-spacing-small;
$chevron-width: $nav-card-horizontal-spacing;

.is-group {
  .leaf-link {
    color: var(--color-figure-gray-tertiary);
    font-weight: $font-weight-semibold;
    // groups dont need the overlay
    &:after {
      display: none;
    }
  }
}

.navigator-icon {
  display: flex;
  flex: 0 0 auto;

  &.changed {
    border: none;
    width: 1em;
    height: 1em;
    z-index: 0;

    &:after {
      top: 50%;
      left: 50%;
      right: auto;
      bottom: auto;
      transform: translate(-50%, -50%);
      background-image: $modified-svg;

      @include prefers-dark {
        background-image: $modified-dark-svg;
      }
      margin: 0;
    }

    &-added::after {
      background-image: $added-svg;

      @include prefers-dark {
        background-image: $added-dark-svg;
      }
    }

    &-deprecated::after {
      background-image: $deprecated-svg;

      @include prefers-dark {
        background-image: $deprecated-dark-svg;
      }
    }
  }
}

.leaf-link {
  color: var(--color-figure-gray);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  display: inline;
  vertical-align: middle;
  @include font-styles(body);

  @include on-keyboard-focus {
    outline: none;
  }

  &:hover {
    text-decoration: none;
  }

  &.bolded {
    font-weight: $font-weight-semibold;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.extended-content {
  @include font-styles(body-reduced);
  color: var(--color-figure-gray-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-toggle {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-right: $tree-toggle-padding;
  box-sizing: border-box;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chevron {
  width: $chevron-width;

  &.animating {
    transition: transform 0.15s ease-in;
  }

  &.rotate {
    transform: rotate(90deg);
  }
}
</style>
