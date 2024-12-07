#!/bin/bash

# Number of commits to check for duplicates
CHECK_LIMIT=5

# Get the last N commits (hash and message)
commit_info=$(git log -n $CHECK_LIMIT --pretty=format:"%H %s")

# Initialize variables
prev_message=""
commit_hashes=()
duplicate_messages=()

# Check for consecutive duplicate commit messages
while read -r hash message; do
  if [ "$message" == "$prev_message" ]; then
    duplicate_messages+=("$message")
    if [ -z "${commit_hashes[-1]}" ]; then
      commit_hashes+=("$hash")
    fi
  else
    prev_message="$message"
    commit_hashes+=("$hash")
  fi
done <<<"$commit_info"

# Check if duplicates are found
if [ ${#duplicate_messages[@]} -gt 0 ]; then
  echo "Auto-squashing commits with identical messages..."

  # Count the total commits to include in the rebase
  total_to_rebase=${#commit_hashes[@]}

  # Prepare the rebase sequence
  squash_range="HEAD~$total_to_rebase"
  git rebase -i "$squash_range" --autosquash --quiet

  # Check the result of the rebase
  if [ $? -eq 0 ]; then
    echo "Squashing completed successfully."
  else
    echo "Error occurred during the rebase. Resolving conflicts manually may be required."
    git rebase --abort
  fi
else
  echo "No consecutive duplicate commit messages found."
fi

exit 0
