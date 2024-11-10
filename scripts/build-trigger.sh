#!/bin/bash

BUILD_INTERVAL_MINUTES="${BUILD_INTERVAL_MINUTES:-30}"

latest_commit_timestamp=$(git log -1 --format=%cI)
previous_commit_timestamp=$(git log -2 --format=%cI | tail -n1)

if [[ -z "$latest_commit_timestamp" || -z "$previous_commit_timestamp" ]]; then
    echo "🛑 - Not enough commit history to determine build trigger."
    exit 0
fi

echo -e "\nLatest Commit Timestamp: $latest_commit_timestamp"
echo -e "Previous Commit Timestamp: $previous_commit_timestamp\n"

latest_commit_unix=$(date -d "$latest_commit_timestamp" +%s)
previous_commit_unix=$(date -d "$previous_commit_timestamp" +%s)

minutes_diff=$(((latest_commit_unix - previous_commit_unix) / 60))

export LAST_COMMIT_DATE="$latest_commit_timestamp"

echo -e "Time difference between the last two commits: $minutes_diff minutes\n"

if ((minutes_diff >= BUILD_INTERVAL_MINUTES)); then
    echo -e "✅ - More than $BUILD_INTERVAL_MINUTES minutes between the last two commits, proceeding with build\n"
    exit 1
else
    echo -e "🛑 - Less than $BUILD_INTERVAL_MINUTES minutes between the last two commits, skipping build\n"
    exit 0
fi
