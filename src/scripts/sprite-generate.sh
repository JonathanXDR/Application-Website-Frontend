#!/bin/bash

dir="../assets/icons"
abs_dir=$(cd "$(dirname "$0")" && cd "$dir" && pwd)

if [[ ! -d "$abs_dir" ]]; then
  echo "Directory '$abs_dir' does not exist."
  exit 1
fi

generate_sprite() {
  local sub_dir=$1
  echo "Generating sprite for $sub_dir..."
  cd "$abs_dir/$sub_dir" || {
    echo "Failed to navigate to $abs_dir/$sub_dir"
    exit 1
  }
  svg-sprite --symbol --symbol-sprite=sprite.svg ./*.svg
}

for sub_dir in small medium large; do
  generate_sprite "$sub_dir"
done

cd - >/dev/null
echo "\nProcessing complete.\n"
