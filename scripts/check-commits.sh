#!/usr/bin/env bash

set -eu

readonly MAX_COMMITS_TO_CHECK=50
readonly SCRIPT_NAME="$(basename "${0}")"
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NC='\033[0m'
readonly MIN_GIT_VERSION="2.0.0"

log_error() {
  printf "${RED}%s: Error: %s${NC}\n" "${SCRIPT_NAME}" "${1}" >&2
}

log_warning() {
  printf "${YELLOW}%s: Warning: %s${NC}\n" "${SCRIPT_NAME}" "${1}" >&2
}

log_success() {
  printf "${GREEN}%s: %s${NC}\n" "${SCRIPT_NAME}" "${1}"
}

log_info() {
  printf "%s: %s\n" "${SCRIPT_NAME}" "${1}"
}

cleanup() {
  exit_code=$?
  if [ $exit_code -ne 0 ] && git rev-parse --verify HEAD >/dev/null 2>&1; then
    log_warning "Script failed, attempting to reset git state..."
    git reset --hard HEAD >/dev/null 2>&1 || true
  fi
  exit "${exit_code}"
}

trap cleanup EXIT

check_git_repo() {
  if ! git rev-parse --git-dir >/dev/null 2>&1; then
    log_error "Not in a git repository"
    return 1
  fi
}

check_git_version() {
  if ! command -v git >/dev/null 2>&1; then
    log_error "Git is not installed"
    return 1
  fi

  git_version=$(git --version | awk '{print $3}')
  if [ "$(printf '%s\n' "$MIN_GIT_VERSION" "$git_version" | sort -V | head -n1)" != "$MIN_GIT_VERSION" ]; then
    log_error "Git version ${MIN_GIT_VERSION} or higher is required"
    return 1
  fi
}

perform_squash() {
  message="$1"
  commits="$2"
  commit_count=$(echo "$commits" | wc -w | tr -d ' ')
  oldest_commit=$(echo "$commits" | tr ' ' '\n' | tail -n 1)

  log_info "Squashing ${commit_count} commits with message: '${message}'"

  if ! git reset --soft "${oldest_commit}~1" >/dev/null 2>&1; then
    log_error "Failed to reset to commit ${oldest_commit%????????}"
    return 1
  fi

  if ! git commit -m "${message}" >/dev/null 2>&1; then
    log_error "Failed to create squashed commit"
    return 1
  fi

  log_success "Squashed ${commit_count} commits successfully"
}

squash_duplicate_commits() {
  prev_msg=""
  prev_hash=""
  commits_to_squash=""
  in_duplicate_sequence=false

  log_info "Analyzing commit history for consecutive duplicates..."

  git log --pretty=format:"%H %s" -n "$MAX_COMMITS_TO_CHECK" 2>/dev/null | while IFS= read -r commit_line; do
    [ -z "$commit_line" ] && continue

    hash=${commit_line%% *}
    message=${commit_line#* }

    if [ "$message" = "$prev_msg" ]; then
      if [ "$in_duplicate_sequence" = false ]; then
        log_info "Found duplicate sequence with message: '$message'"
        commits_to_squash="$prev_hash"
        in_duplicate_sequence=true
      fi
      commits_to_squash="$commits_to_squash $hash"
      log_info "  Adding commit ${hash%????????} to squash sequence"
    elif [ "$in_duplicate_sequence" = true ]; then
      perform_squash "$prev_msg" "$commits_to_squash"
      commits_to_squash=""
      in_duplicate_sequence=false
    fi

    prev_msg="$message"
    prev_hash="$hash"
  done

  if [ "$in_duplicate_sequence" = true ] && [ -n "$commits_to_squash" ]; then
    perform_squash "$prev_msg" "$commits_to_squash"
  fi
}

main() {
  check_git_repo || exit 1
  check_git_version || exit 1

  last_commit_msg=$(git log -1 --pretty=%B 2>/dev/null) || {
    log_error "Failed to get last commit message"
    return 1
  }

  second_last_commit_msg=$(git log -2 --skip=1 --pretty=%B 2>/dev/null | head -n 1) || {
    return 0
  }

  if [ -n "$second_last_commit_msg" ] && [ "$last_commit_msg" = "$second_last_commit_msg" ]; then
    log_info "Detected consecutive commits with identical messages"
    squash_duplicate_commits
  fi
}

main
