import { h , app } from 'hyperapp'
import { location, Route,  Switch, Link } from "@hyperapp/router"
import './style.scss'

import  Nav  from './pages/nav'
import  Home  from './pages/home'
import  Tasks  from './pages/tasks/tasks'
import  Messages  from './pages/messages/messages'
import  Content  from './pages/content/content'
import  Analytics  from './pages/analytics/analytics'

import  data  from './data'

const tasks = Tasks(data.tasks) 
const content = Content(data.content)

const state = {
  location: location.state, 
  tasks: tasks.state,
  content: content.state
}

const actions = {
  location: location.actions,
  tasks: tasks.actions,
  content: content.actions
}

const view = ( state, actions ) => {
  const index = {
    tasks: tasks.view(state.tasks, actions.tasks),
    content: content.view(state.content, actions.content)
  };
  
  return (
    <div>
      <Nav></Nav>
      <Switch>    
        <Route path="/" render={ Home } />   
        <Route parent path="/tasks" render={ index.tasks } />    
        <Route parent path="/content" render={ index.content } />        
      </Switch>
    </div>
  )
}

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)