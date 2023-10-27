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
    };       

    //  Render item in the list (completed or incomleted)
    renderItems = () => {
        const { viewCompleted, taskList } = this.state;
        const newItems = this.state.taskList.filter(
            (item) => item.completed === viewCompleted
        );    
        return newItems.map((item) => (
            <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
                <span className={`todo-title mr-2 ${item.completed ? "completed-todo" : ""}`} title={item.title}>
                    {item.title}
                </span>
                <span>
                    <button className='btn btn-info mr-2 mx-2 text-white'>Edit</button>
                    <button className='btn btn-danger mr-2 mx-0'>Delete</button>
                </span>
            </li>
            ));
     };
        
    render() {
        return (
            <main className='container'>
            <h1 className='text-black text-uppercase text-center my-4'>Task Manager</h1>
            <h1 className='row'>
                <div className='col-md-6 col-sm-10 mx-auto p-0'>
                    <div className='card p-3'>
                        <div>
                            <button className='btn btn-primary'>Add Task</button>
                        </div>
                    {this.renderTabList()}
                    <ul className='list-group list-group-flush'>{this.renderItems()}</ul>
                    </div>
                </div>
            </h1>
            
            </main>
        );
    }

}



export default App;