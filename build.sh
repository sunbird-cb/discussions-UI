#!/bin/bash
yarn install
npm run build-doc
tar cvzf documentation.tar.gz documentation
