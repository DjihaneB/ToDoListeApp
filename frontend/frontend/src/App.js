import React, { Component } from 'react';
import './App.css'
import Modal from './components/Modal'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false, 
            viewCompleted: false,
            activeItem: {
                title:"",
                description: "",
                completed: "",
            },
            TodoList: [] 
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () =>{
        axios.get("http://127.0.0.1:8000/api/tasks/")
        .then(res => this.setState({ TodoList : res.data }))
        .catch(err => console.log(err))
    };

    toggle = () =>{
        this.setState({ modal : !this.state.modal });
    };

    handleSubmit = item => {
        this.toggle();
        if(item.id){
            axios.put(`http://127.0.0.1:8000/api/tasks/${item.id}/`, item)
            .then(res => this.refreshList())
        }
        axios.post(`http://127.0.0.1:8000/api/tasks/`, item)
            .then(res => this.refreshList())
            .catch(error => {
                console.log("Error response:", error.response);
            })
    };

    handleDelete = item => {
            axios.delete(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
            .then(res => this.refreshList())
    };

    createItem = () => {
        const item = { title: "", modal: !this.state.modal };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };
    

    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

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
        const { viewCompleted } = this.state;
        const newItems = this.state.TodoList.filter(
            (item) => item.completed === viewCompleted
        );    
        return newItems.map((item) => (
            <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
                <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.title}>
                    {item.title}
                </span>
                <span>
                    <button className='btn btn-info mr-2 mx-2 text-white' onClick={() => this.editItem(item)}>Edit</button>
                    <button className='btn btn-danger mr-2 mx-0'onClick={() => this.handleDelete(item)}>Delete</button>
                </span>
            </li>
            ));
     };

    render() {
        return (
            <div>
            <header style={{ height: '300px' }}>
                <img
                    src="https://i.pinimg.com/originals/c2/9f/6c/c29f6c9e5d71a823eb385ab342115598.gif"
                    alt="Looping GIF"
                    style={{ width: '100%', height: '100%' }}
                />
            </header>

            <main className='content p-3 mb-3 mb-2' style={{ backgroundColor: '#abe5fb' }}>
            <h1 className='text-#D1a9d1 text-center my-4'>Task Manager</h1>
            <h1 className='row'>
                <div className='col-md-6 col-sm-10 mx-auto p-0'>
                    <div className='card p-3'>
                        <div className='d-flex justify-content-between align-items-center'>
                        {this.renderTabList()}
                        <button className='btn-add' onClick={this.createItem}>Add Task</button>  
                        </div>
                
                    <ul className='list-group list-group-flush'>{this.renderItems()}</ul>
                    </div>
                </div>
            </h1>
            {this.state.modal ? (
                <Modal activeItem= {this.state.activeItem} toggle= {this.toggle} onSave= {this.handleSubmit} />
            ): null}
            </main>
            <footer className='my-5 mb-2 text-white text-center'>
            </footer>
            </div>
        );
    }

}
export default App;