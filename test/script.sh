#!/bin/bash
set -e

P_HOME_PATH=$(pwd)
P_CONDITION=$1
P_FILE=$2

# echo ${P_CONDITION}
# echo ${P_FILE}

if [[ "${P_CONDITION}" == 'change' ]]
then
  sh -c "sed -i -e \"s@ 1@ 2@\" ${P_HOME_PATH}${P_FILE}"  
fi

if [[ "${P_CONDITION}" == 'revert' ]]
then
  sh -c "sed -i -e \"s@ 2@ 1@\" ${P_HOME_PATH}${P_FILE}"  
fi
