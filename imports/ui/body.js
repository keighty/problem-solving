import { Template } from 'meteor/templating'
import { Tasks } from '../api/tasks.js'
import './body.html'

Template.body.helpers({
  tasks() {
    return Tasks.find({})
  },
})

Template.body.events({
  'submit .new-task'(e) {
    e.preventDefault()
    const target = e.target
    const text = target.text.value

    Tasks.insert({
      text,
      createdAt: new Date(),
    })

    target.text.value = ''
  }
})
