#!/bin/bash

usage() {
  echo "Usage: $0 --dir <directory> --pattern <file-pattern>"
  exit 1
}

dir="./public/icons"
file_pattern="*.svg"

while [[ "$#" -gt 0 ]]; do
  case "$1" in
  --dir)
    dir="$2"
    shift 2
    ;;
  --pattern)
    file_pattern="$2"
    shift 2
    ;;
  *)
    usage
    ;;
  esac
done

if [[ -z "$dir" ]]; then
  usage
fi

abs_dir=$(cd "$dir" && pwd)

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
  svg-sprite --symbol --symbol-sprite=sprite.svg ./"$file_pattern"
}

find "$abs_dir" -mindepth 1 -maxdepth 1 -type d | while IFS= read -r sub_dir; do
  generate_sprite "$(basename "$sub_dir")"
done

echo "\nProcessing complete.\n"
