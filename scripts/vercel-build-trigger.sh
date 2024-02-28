#!/bin/bash

GITHUB_REPO="your_username/your_repo"
GITHUB_TOKEN=$GITHUB_TOKEN
BUILD_INTERVAL_MINUTES=${BUILD_INTERVAL_MINUTES:-30}
MANUAL_TRIGGER_KEYWORD="force-build"

latest_commit_timestamp=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$GITHUB_REPO/commits?per_page=1" |
    jq -r '.[0].commit.committer.date')

latest_commit_unix=$(date -d "$latest_commit_timestamp" +%s)
current_unix=$(date +%s)
minutes_diff=$((($current_unix - $latest_commit_unix) / 60))

echo "Time since last commit: $minutes_diff minutes"

commit_message=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$GITHUB_REPO/commits?per_page=1" |
    jq -r '.[0].commit.message')

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
