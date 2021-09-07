import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'

export default class App extends Component {
	//状态在哪里，操作状态的方法就在哪里

	constructor() {
        super()
        this.state = {
            todos: [] //展示列表
        }
    }

    //挂载完成前时执行
    UNSAFE_componentWillMount() {
        //从localStrong中获取myList
        var todos = localStorage.getItem('todos')
		console.log('加载中',todos)
        if (todos === null || todos === '') {
            todos = []//初始化todos数组
        } else {
            //JSON字符串转JSON对象
            todos = JSON.parse(localStorage.getItem("todos"));
        }
		console.log('加载中1',todos)
        //设置状态值
        this.setState({
            todos: todos
        })
    }


	//addTodo用于添加一个todo，接收的参数是todo对象
	addTodo = (todoObj)=>{
		//获取原todos
		const {todos} = this.state
		//追加一个todo
		const newTodos = [todoObj,...todos]
		//更新状态
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}

	//updateTodo用于更新一个todo对象
	updateTodo = (id,done)=>{
		//获取状态中的todos
		const {todos} = this.state
		//匹配处理数据
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,done}
			else return todoObj
		})
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}

	//deleteTodo用于删除一个todo对象
	deleteTodo = (id)=>{
		//获取原来的todos
		const {todos} = this.state
		//删除指定id的todo对象
		// console.log('你好1')
		const newTodos = todos.filter((todoObj)=>{
			return todoObj.id !== id
		})
		//更新状态
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}
	

	//editorTodo用于编辑一个todo对象
	editorTodo = (id,str)=>{
		//获取原来的todos
		// console.log('你好2',str)
		const {todos} = this.state
		//编辑指定id的todo对象
		//匹配处理数据
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) {
				todoObj.name=str
				return todoObj
			}
			else return todoObj
		})
		//更新状态
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}



	//checkAllTodo用于全选
	checkAllTodo = (done)=>{
		//获取原来的todos
		const {todos} = this.state
		//加工数据
		const newTodos = todos.map((todoObj)=>{
			return {...todoObj,done}
		})
		//更新状态
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}

	//clearAllDone用于清除所有已选中的
	clearAllDone = ()=>{
		//获取原来的todos
		const {todos} = this.state
		//过滤数据
		const newTodos = todos.filter((todoObj)=>{
			return !todoObj.done
		})
		//更新状态
		this.setState({todos:newTodos})
		const obj = JSON.stringify(newTodos)//转化为JSON字符串
		console.log(obj)
		localStorage.todos = obj
	}

	render() {
		const {todos} = this.state
		return (
			<div className="todo-container">
				<div className="todo-wrap">
					<Header addTodo={this.addTodo}/>
					<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} editorTodo={this.editorTodo}/>
					<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
				</div>
			</div>
		)
	}
}
