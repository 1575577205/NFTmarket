import React, { Component } from 'react'
import Navbar from "./Navbar"
import {init} from '../../contract'
export default class BaseLayout extends Component {
  componentDidMount(){
    init()
  }
  render() {
    return (
      <div className="py-0 bg-gray-50 overflow-hidden min-h-screen">
        
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {this.props.children}
        </div>
      </div>
    )
  }
}
