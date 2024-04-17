#!/bin/bash

GITHUB_TOKEN=$VITE_GITHUB_TOKEN
GITHUB_REPO_BRANCH=${GITHUB_REPO_BRANCH:-develop}
BUILD_INTERVAL_MINUTES=${BUILD_INTERVAL_MINUTES:-30}

commits_info=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
    "https://api.github.com/repos/$GITHUB_REPO_OWNER/$GITHUB_REPO_NAME/commits?sha=$GITHUB_REPO_BRANCH&per_page=2")

echo -e "$commits_info\n"

commit_timestamps=$(echo "$commits_info" | grep '"date":' | cut -d '"' -f 4 | awk 'NR % 2 == 1')

readarray -t timestamps <<<"$commit_timestamps"

echo -e "Latest Commit Timestamp: ${timestamps[0]}"
echo -e "Previous Commit Timestamp: ${timestamps[1]}\n"

latest_commit_unix=$(date -d "${timestamps[0]}" +%s)
second_latest_commit_unix=$(date -d "${timestamps[1]}" +%s)

minutes_diff=$((($latest_commit_unix - $second_latest_commit_unix) / 60))

echo -e "Time difference between the last two commits: $minutes_diff minutes\n"

if [ $minutes_diff -ge "$BUILD_INTERVAL_MINUTES" ]; then
    echo -e "✅ - More than $BUILD_INTERVAL_MINUTES minutes between the last two commits, proceeding with build\n"
    exit 1
else
    echo -e "🛑 - Less than $BUILD_INTERVAL_MINUTES minutes between the last two commits, skipping build\n"
    exit 0
fi
