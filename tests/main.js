/* eslint-env mocha */

import assert from 'assert'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'

const collection = new Mongo.Collection('test_mocha', {})

describe('testMocha', function () {
  it('Insert into a remote colelction', function (done) {
    const allow = {
      insert: function () {
        return true
      },
      update: function () {
        return true
      },
      remove: function () {
        return true
      }
    }

    if (Meteor.isFibersDisabled) {
      Object.assign(allow,
        {
          insertAsync: function () {
            return true
          },
          updateAsync: function () {
            return true
          },
          removeAsync: function () {
            return true
          }
        })
    }

    // Full permissions on collection
    collection.allow(allow)

    const key = `test_${Random.id()}`
    collection.insertAsync({ _id: key, test: 1 })
      .then(() => collection.find({ _id: key, test: 1 }).countAsync())
      .then((docs) => {
        assert.equal(docs, 1)
      })
      .then(() => done())
      .catch(done)
  })

  if (Meteor.isClient) {
    it('Test update', function () {
      const collection2 = new Mongo.Collection('test_mocha', { connection: null })
      const ret = collection2.upsert({ _id: 'test' }, { $set: { test: 1 } })
      console.log('collection2', ret)
      assert.equal(!!ret.then, false)
    })
  }
})
