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

    displayCompleted = (status) => {
        if (status){
          return this.setState({ viewCompleted: true}) 
        }
        return this.setState({ viewCompleted: false}) 
      };

    renderTabList = () => {
        return (
          <div className='my-5 tab-list'>
            <span 
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              Completed
            </span>
            <span 
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incompleted
            </span>
          </div>
        );

        //  Render item in the list (completed or incomleted)
        renderItems = () => {
            const { viewCompleted, taskList } = this.state;
            const newItems = this.state.taskList.filter(
                (item) => item.completed === viewCompleted
                );
          };
            
        

      };


}



export default App;