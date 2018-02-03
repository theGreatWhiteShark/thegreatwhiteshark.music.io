#!/bin/bash
set -e

if [ ! -d "$SOURCE_DIR" ]; then
  echo "SOURCE_DIR ($SOURCE_DIR) does not exist, build the source directory before deploying"
  exit 1
fi

REPO="git@github.com:theGreatWhiteShark/thegreatwhiteshark.music.io.git"

if [ -n "$TRAVIS_BUILD_ID" ]; then
  # When running on Travis we need to use SSH to deploy to GitHub
  #
  # The following converts the repo URL to an SSH location,
  # decrypts the SSH key and sets up the Git config with
  # the correct user name and email (globally as this is a
  # temporary travis environment)
  #
  # Set the following environment variables in the travis configuration (.travis.yml)
  #
  #   DEPLOY_BRANCH    - The only branch that Travis should deploy from
  #   ENCRYPTION_LABEL - The label assigned when encrypting the SSH key using travis encrypt-file
  #   GIT_NAME         - The Git user name
  #   GIT_EMAIL        - The Git user email
  #
  echo DEPLOY_BRANCH: $DEPLOY_BRANCH
  echo ENCRYPTION_LABEL: $ENCRYPTION_LABEL
  echo GIT_NAME: $GIT_NAME
  echo GIT_EMAIL: $GIT_EMAIL
  if [ "$TRAVIS_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "Travis should only deploy from the DEPLOY_BRANCH ($DEPLOY_BRANCH) branch"
    exit 0
  else
    if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
      echo "Travis should not deploy from pull requests"
      exit 0
    else
      chmod 600 $SSH_KEY
      eval `ssh-agent -s`
      ssh-add $SSH_KEY
      git config --global user.name "$GIT_NAME"
      git config --global user.email "$GIT_EMAIL"
    fi
  fi
fi

echo "Deploying..."
REPO_NAME=$(basename $REPO)
TARGET_DIR=$(mktemp -d /tmp/$REPO_NAME.XXXX)
REV=$(git rev-parse HEAD)
echo "REPO: $REPO"
echo "REPO_NAME: $REPO_NAME"
echo "SOURCE_DIR: $SOURCE_DIR"
echo "TARGET_DIR: $TARGET_DIR"
echo "TARGET_BRANCH: $TARGET_BRANCH"
echo "REV: $REV"
git clone --branch ${TARGET_BRANCH} ${REPO} ${TARGET_DIR}
rsync -rt --delete --exclude=".git" --exclude=".travis.yml" $SOURCE_DIR/ $TARGET_DIR/
cd $TARGET_DIR
git add -A .
git commit --allow-empty -m "Built from commit $REV"
git push $REPO $TARGET_BRANCH
echo "Done deploying."
