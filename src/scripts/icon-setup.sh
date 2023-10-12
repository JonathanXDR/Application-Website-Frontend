#!/bin/bash

# Define the directory containing the SVG files
dir="assets/icons"

# Check if the directory exists
if [[ ! -d "$dir" ]]; then
    echo "Directory '$dir' does not exist."
    exit 1
fi

# Navigate to the directory
cd "$dir"

# Iterate through each SVG file in the directory
for file in *.svg; do
    # Use sed to remove the specified lines from each SVG file
    sed -i '' '/^<?xml version="1.0" encoding="UTF-8"?>/d' "$file"
    sed -i '' '/^<!--Generator: Apple Native CoreSVG 232.5-->/d' "$file"
    sed -i '' '/^<!DOCTYPE svg/,/^       "http:\/\/www.w3.org\/Graphics\/SVG\/1.1\/DTD\/svg11.dtd">/d' "$file"

    # Extract the width and height attributes
    width=$(xmlstarlet sel -t -v "/svg/@width" "$file")
    height=$(xmlstarlet sel -t -v "/svg/@height" "$file")

    # Use xmlstarlet to update the fill attribute, remove the fill-opacity attribute, and set the viewBox attribute
    xmlstarlet ed -L \
        -u "//@fill" -v "currentColor" \
        -d "//@fill-opacity" \
        -i "/svg" -t attr -n "viewBox" -v "0 0 $width $height" \
        "$file"

    # Format the SVG file with Prettier
    prettier --write "$file"
done

# Return to the original directory
cd -

echo "Processing complete."
