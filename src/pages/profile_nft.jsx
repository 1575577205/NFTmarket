import React, { Component } from 'react'
import {Header,NFTList,Details} from '../components'

export default class Profile extends Component {
  render() {
    return (
      <>
        
        <Header NFTList = {<NFTList/>} Details = {<Details/>}/>
        
      </>
    )
  }
}
