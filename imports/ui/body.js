import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Tasks } from '../api/tasks.js'
import { Problems } from '../api/problems.js'
import './task.js'
import './body.html'

Template.body.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict()
  Meteor.subscribe('tasks')
  Meteor.subscribe('problems')
})

Template.body.helpers({
  tasks() {
    const instance = Template.instance()
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true }}, {sort: { createdAt: -1 }})
    }
    return Tasks.find({}, {sort: { createdAt: -1 }})
  },
  problems() {
    return Problems.find({})
  },
  incompleteCount() {
    return Problems.find({ checked: { $ne: true }}).count()
  }
})

Template.body.events({
  'submit .new-task'(e) {
    e.preventDefault()
    const target = e.target
    const text = target.text.value
    Meteor.call('tasks.insert', text)
    target.text.value = ''
  },
  'submit .new-problem'(e) {
    e.preventDefault()
    const target = e.target
    const text = target.text.value
    Meteor.call('problems.insert', text)
    target.text.value = ''
  },
  'change .hide-completed input'(e, instance) {
    instance.state.set('hideCompleted', e.target.checked)
  },
})
