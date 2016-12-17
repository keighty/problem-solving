import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Tasks } from '../api/tasks.js'
import './task.js'
import './body.html'

Template.body.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict()
})

Template.body.helpers({
  tasks() {
    const instance = Template.instance()
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true }}, {sort: { createdAt: -1 }})
    }
    return Tasks.find({}, {sort: { createdAt: -1 }})
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true }}).count()
  }
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
  },
  'change .hide-completed input'(e, instance) {
    instance.state.set('hideCompleted', e.target.checked)
  },
})
