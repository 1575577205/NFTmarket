import React, { Component } from 'react'
import {init} from "../contract"
export default class Connect extends Component {
  componentDidMount(){
    init();
  }
  render() {
    return (
      <>
      </>
    )
  }
}
