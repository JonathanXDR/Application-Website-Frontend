#!/bin/bash

usage() {
  echo "Usage: $0 --dir <directory> --pattern <file-pattern> --ignore <ignore-pattern>"
  exit 1
}

dir="./public/icons"
file_pattern="*.svg"
ignore_pattern="*/symbol/*"

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
  --ignore)
    ignore_pattern="$2"
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

process_svgs() {
  local sub_dir=$1
  echo "Cleaning up files for $sub_dir..."
  find "$abs_dir/$sub_dir" -name "$file_pattern" ! -path "$ignore_pattern" | while IFS= read -r file; do

    sed -i '' \
      -e '/<?xml version/d' \
      -e '/<!--Generator/d' \
      -e '/<!DOCTYPE svg/,/">/d' \
      "$file"

    replace_fill_opacity() {
      local fill_colors=("white" "#ffffff")
      local opacity_values=("0.85" "0.425" "0.2125")
      local replacements=("var(--color-primary)" "var(--color-secondary)" "var(--color-tertiary)")

      for fill_color in "${fill_colors[@]}"; do
        for i in "${!opacity_values[@]}"; do
          local opacity_value="${opacity_values[i]}"
          local replacement="${replacements[i]}"

          sed -i '' \
            -e "s/fill=\"$fill_color\" fill-opacity=\"$opacity_value\"/fill=\"$replacement\"/g" \
            -e "s/fill=\"$fill_color\" fill-opacity=\"${opacity_value#0.}%\"/fill=\"$replacement\"/g" \
            "$file"
        done
      done
    }

    replace_fill_opacity

    width=$(grep -m1 -o 'width="[0-9.]*"' "$file" | awk -F'"' '{print $2}')
    height=$(grep -m1 -o 'height="[0-9.]*"' "$file" | awk -F'"' '{print $2}')

    if [[ $width && $height ]]; then

      if grep -q 'viewBox=' "$file"; then
        sed -i '' "s/viewBox=\"[^\"]*\"/viewBox=\"0 0 $width $height\"/" "$file"
      else
        perl -i -pe "s/(<svg[^>]*)(>)/\1 viewBox=\"0 0 $width $height\"\2/" "$file"
      fi
    fi
  done
}

find "$abs_dir" -mindepth 1 -maxdepth 1 -type d | while IFS= read -r sub_dir; do
  process_svgs "$(basename "$sub_dir")"
done

echo "\nProcessing complete.\n"
