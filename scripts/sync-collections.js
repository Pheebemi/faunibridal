#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const dressesPath = path.join(__dirname, '..', 'data', 'dresses.json')
const collectionsPath = path.join(__dirname, '..', 'data', 'collections.json')

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n')
}

function sync() {
  const dresses = loadJson(dressesPath)
  const collections = loadJson(collectionsPath)

  const map = {}
  dresses.forEach(d => {
    const col = d.collectionId || null
    if (!col) return
    if (!map[col]) map[col] = []
    map[col].push(String(d.id))
  })

  const updated = collections.map(c => ({
    ...c,
    dresses: map[c.id] ? Array.from(new Set(map[c.id])) : []
  }))

  writeJson(collectionsPath, updated)
  console.log('Synced collections.json from dresses.json')
}

sync()
