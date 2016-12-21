import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

Template.navigation.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict()
  this.state.set('showAddProblemInput', false)
})

Template.navigation.helpers({
  showAddProblemInput() {
    return Template.instance().state.get('showAddProblemInput')
  }
})

Template.navigation.events({
  'submit .new-problem'(e, instance) {
    e.preventDefault()
    const target = e.target
    const text = target.text.value
    Meteor.call('problems.insert', text)
    target.text.value = ''
    instance.state.set('showAddProblemInput', false)
  },
  'click .add-problem'(e, instance) {
    console.log('hello')
    e.preventDefault()
    const showInput = instance.state.get('showAddProblemInput')
    instance.state.set('showAddProblemInput', !showInput)
  }
})
