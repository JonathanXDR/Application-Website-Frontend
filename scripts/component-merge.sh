#!/bin/bash

# Navigate to the components directory
cd "$(dirname "$0")/../components"

# Check if the directory change was successful
if [ $? -ne 0 ]; then
  echo "Error: Unable to navigate to the components directory."
  exit 1
fi

# Find all Vue files in any subdirectories
find . -type f -name "*.vue" | while read vue_file; do
  # Extract the base name and parent directory of the file
  base_name=$(basename "$vue_file" .vue)
  parent_dir=$(dirname "$vue_file")
  grandparent_dir=$(dirname "$parent_dir")

  # Define the names of the TypeScript and CSS files
  ts_file="$parent_dir/$base_name.ts"
  css_file="$parent_dir/$base_name.css"

  # Check if TypeScript and CSS files exist
  if [ -f "$ts_file" ] && [ -f "$css_file" ]; then
    # Create temporary files
    temp_vue=$(mktemp)
    temp_ts=$(mktemp)
    temp_css=$(mktemp)

    # Extract parts of the Vue file
    awk '/<template>/,/<\/template>/' "$vue_file" >"$temp_vue"
    awk '/<script lang="ts">/,/<\/script>/' "$vue_file" >"$temp_ts"
    awk '/<style scoped>/,/<\/style>/' "$vue_file" >"$temp_css"

    # Append TypeScript content
    echo "<script lang=\"ts\">" >"$temp_ts"
    cat "$ts_file" >>"$temp_ts"
    echo "</script>" >>"$temp_ts"

    # Append CSS content
    echo "<style scoped>" >"$temp_css"
    cat "$css_file" >>"$temp_css"
    echo "</style>" >>"$temp_css"

    # Merge into final Vue file
    cat "$temp_vue" >"$grandparent_dir/$base_name.vue"
    echo "" >>"$grandparent_dir/$base_name.vue"
    cat "$temp_ts" >>"$grandparent_dir/$base_name.vue"
    echo "" >>"$grandparent_dir/$base_name.vue"
    cat "$temp_css" >>"$grandparent_dir/$base_name.vue"

    # Remove original Vue file, TypeScript, and CSS files
    rm "$vue_file" "$ts_file" "$css_file"
    rmdir "$parent_dir" 2>/dev/null # Remove the directory if empty

    # Remove temporary files
    rm "$temp_vue" "$temp_ts" "$temp_css"
  fi
done

echo "Component restructuring complete."
