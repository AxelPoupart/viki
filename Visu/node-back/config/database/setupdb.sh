#!/bin/bash
node setupDB.js
node 'fill domains.js'
node 'fill campus.js'
node 'fill vms.js'
node 'fill apps.js'
node 'fill vm_app.js'
