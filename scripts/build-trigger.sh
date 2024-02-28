#!/bin/bash

GITHUB_TOKEN=$VITE_GITHUB_TOKEN
GITHUB_REPO_BRANCH=${GITHUB_REPO_BRANCH:-develop}
BUILD_INTERVAL_MINUTES=${BUILD_INTERVAL_MINUTES:-30}
MANUAL_TRIGGER_KEYWORD="force-build"

latest_commit_info=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$VITE_GITHUB_REPO_OWNER/$VITE_GITHUB_REPO_NAME/commits/$GITHUB_REPO_BRANCH?per_page=1")

# curl -L \
#     -H "Accept: application/vnd.github+json" \
#     -H "Authorization: Bearer $GITHUB_TOKEN" \
#     -H "X-GitHub-Api-Version: 2022-11-28" \
#     https://api.github.com/repos/$VITE_GITHUB_REPO_OWNER/$VITE_GITHUB_REPO_NAME/commits/$GITHUB_REPO_BRANCH?per_page=1

latest_commit_timestamp=$(echo "$latest_commit_info" | grep -oP '"date": "\K[^"]+' | head -1)

latest_commit_unix=$(date -d "$latest_commit_timestamp" +%s)
current_unix=$(date +%s)
minutes_diff=$((($current_unix - $latest_commit_unix) / 60))

echo "Time since last commit: $minutes_diff minutes"

commit_message=$(echo "$latest_commit_info" | grep -oP '"message": "\K[^"]+' | head -1)

if [[ "$commit_message" == *"$MANUAL_TRIGGER_KEYWORD"* ]]; then
    echo "✅ - Build triggered manually"
    exit 1
elif [ $minutes_diff -ge $BUILD_INTERVAL_MINUTES ]; then
    echo "✅ - More than $BUILD_INTERVAL_MINUTES minutes since last commit, proceeding with build"
    exit 1
else
    echo "🛑 - Less than $BUILD_INTERVAL_MINUTES minutes since last commit, skipping build"
    exit 0
fi
