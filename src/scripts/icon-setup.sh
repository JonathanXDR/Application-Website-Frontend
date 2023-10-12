#!/bin/bash

# Define the directory containing the SVG files
# Use a relative path to the directory
dir="../assets/icons"

# Convert the relative path to an absolute path
abs_dir=$(cd "$(dirname "$0")" && cd "$dir" && pwd)

# Check if the directory exists
if [[ ! -d "$abs_dir" ]]; then
    echo "Directory '$abs_dir' does not exist."
    exit 1
fi

# Use find to get a list of all SVG files in the directory and its subdirectories
find "$abs_dir" -name '*.svg' | while IFS= read -r file; do
    # Use sed to remove the specified lines and to update the attributes
    sed -i '' \
        -e '/<?xml version/d' \
        -e '/<!--Generator/d' \
        -e '/<!DOCTYPE svg/d' \
        -e 's/ fill-opacity="0.85"//g' \
        -e 's/ fill="#ffffff"/ fill="currentColor"/g' \
        "$file"

    # Extract width and height values using grep and awk
    width=$(grep -o 'width="[0-9.]*"' "$file" | awk -F'"' '{print $2}')
    height=$(grep -o 'height="[0-9.]*"' "$file" | awk -F'"' '{print $2}')

    # Use sed to set the viewBox attribute
    sed -i '' \
        -e "/<svg/s/>/ viewBox=\"0 0 $width $height\">/" \
        "$file"
done

echo "Processing complete."
