#!/bin/bash
node setupDB.js
node 'fillDomains.js'
node 'fillCampus.js'
node 'fillVms.js'
node 'fillApps.js'
node 'fillVmApp.js'
