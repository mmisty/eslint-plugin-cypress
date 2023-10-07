#!/bin/bash

sed '/"scripts":/,/},/d' build/package.json > build/temp.json

mv build/temp.json build/package.json