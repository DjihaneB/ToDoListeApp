import React, { Component } from 'react';

const taskList = [
    {
      "id": 1,
      "title": "Tâche 1",
      "description": "Description de la tâche 1",
      "completed": false
    },
    {
      "id": 2,
      "title": "Tâche 2",
      "description": "Description de la tâche 2",
      "completed": false
    },
    {
      "id": 3,
      "title": "Tâche 3",
      "description": "Description de la tâche 3",
      "completed": false
    },
    {
      "id": 4,
      "title": "Tâche 4",
      "description": "Description de la tâche 4",
      "completed": false
    }
  ];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            taskList: taskList, 
        }
    }
}

export default App;