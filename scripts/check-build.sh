#!/usr/bin/env bash

BUILD_INTERVAL_MINUTES="${BUILD_INTERVAL_MINUTES:-30}"

latest_tag=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/^v//')
latest_commit_timestamp=$(git log -1 --format=%cI)
previous_commit_timestamp=$(git log -2 --format=%cI | tail -n1)

if [[ -z "$latest_commit_timestamp" || -z "$previous_commit_timestamp" ]]; then
    echo "🛑 - Not enough commit history to decide whether to build."
    exit 0
fi

echo -e "\nLatest commit timestamp: $latest_commit_timestamp"
echo -e "Previous commit timestamp: $previous_commit_timestamp\n"

latest_commit_unix=$(date -d "$latest_commit_timestamp" +%s)
previous_commit_unix=$(date -d "$previous_commit_timestamp" +%s)

minutes_diff=$(((latest_commit_unix - previous_commit_unix) / 60))

echo -e "Time between the last two commits: $minutes_diff minutes"

export APP_DATE="$latest_commit_timestamp"
export APP_VERSION="$latest_tag"

if ((minutes_diff >= BUILD_INTERVAL_MINUTES)); then
    echo -e "✅ - At least $BUILD_INTERVAL_MINUTES minutes between the last two commits, proceeding with build\n"
    exit 1
else
    echo -e "🛑 - Less than $BUILD_INTERVAL_MINUTES minutes between the last two commits, skipping build\n"
    exit 0
fi
