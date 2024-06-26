#!/bin/bash

cd "$(dirname "$0")/../components" || exit

if [ $? -ne 0 ]; then
  echo "Error: Unable to navigate to the components directory."
  exit 1
fi

find . -type f -name "*.vue" | while read vue_file; do
  base_name=$(basename "$vue_file" .vue)
  parent_dir=$(dirname "$vue_file")
  grandparent_dir=$(dirname "$parent_dir")

  ts_file="$parent_dir/$base_name.ts"
  css_file="$parent_dir/$base_name.css"

  if [ -f "$ts_file" ] && [ -f "$css_file" ]; then
    temp_vue=$(mktemp)
    temp_ts=$(mktemp)
    temp_css=$(mktemp)

    awk '/<template>/,/<\/template>/' "$vue_file" >"$temp_vue"
    awk '/<script lang="ts">/,/<\/script>/' "$vue_file" >"$temp_ts"
    awk '/<style scoped>/,/<\/style>/' "$vue_file" >"$temp_css"

    echo "<script lang=\"ts\">" >"$temp_ts"
    cat "$ts_file" >>"$temp_ts"
    echo "</script>" >>"$temp_ts"

    echo "<style scoped>" >"$temp_css"
    cat "$css_file" >>"$temp_css"
    echo "</style>" >>"$temp_css"

    cat "$temp_vue" >"$grandparent_dir/$base_name.vue"
    echo "" >>"$grandparent_dir/$base_name.vue"
    cat "$temp_ts" >>"$grandparent_dir/$base_name.vue"
    echo "" >>"$grandparent_dir/$base_name.vue"
    cat "$temp_css" >>"$grandparent_dir/$base_name.vue"

    rm "$vue_file" "$ts_file" "$css_file"
    rmdir "$parent_dir" 2>/dev/null

    rm "$temp_vue" "$temp_ts" "$temp_css"
  fi
done

echo "Component restructuring complete."
