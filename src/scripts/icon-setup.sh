#!/bin/bash

dir="../assets/icons"
abs_dir=$(cd "$(dirname "$0")" && cd "$dir" && pwd)

if [[ ! -d "$abs_dir" ]]; then
    echo "Directory '$abs_dir' does not exist."
    exit 1
fi

find "$abs_dir" -name '*.svg' | while IFS= read -r file; do
    sed -i '' \
        -e '/<?xml version/d' \
        -e '/<!--Generator/d' \
        -e '/<!DOCTYPE svg/,/">/d' \
        "$file"

    sed -i '' \
        -e 's/fill="#ffffff" fill-opacity="0.2125"/fill="none"/g' \
        "$file"

    sed -i '' \
        -e 's/fill="#ffffff" fill-opacity="0.85"/fill="currentColor"/g' \
        "$file"

    width=$(grep -m1 -o 'width="[0-9.]*"' "$file" | awk -F'"' '{print $2}')
    height=$(grep -m1 -o 'height="[0-9.]*"' "$file" | awk -F'"' '{print $2}')

    if [[ $width && $height ]]; then
        perl -i -pe "s/(<svg[^>]*)(>)/\1 viewBox=\"0 0 $width $height\"\2/" "$file"
    fi
done

echo "Processing complete."
