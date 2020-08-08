#!/bin/bash
set -e

P_CONDITION=$1
P_FILEPATH=$2

# echo ${P_CONDITION}
# echo ${P_FILEPATH}

if [[ "${P_CONDITION}" == 'change' ]]
then
  sh -c "sed -i -e \"s@ 1@ 2@\" ${P_FILEPATH}"  
fi

if [[ "${P_CONDITION}" == 'revert' ]]
then
  sh -c "sed -i -e \"s@ 2@ 1@\" ${P_FILEPATH}"  
fi
