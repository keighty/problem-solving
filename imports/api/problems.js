import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Problems = new Mongo.Collection('problems')

if (Meteor.isServer) {
  Meteor.publish('problems', function tasksPublication () {
    return Problems.find({owner: this.userId})
  })
}

Meteor.methods({
  'problems.insert'(title) {
    check(title, String)
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Problems.insert({
      title,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  }
})
