import React, { Component } from 'react'
import { marketContract } from '../../../contract'
import { ethers } from '../../../ethersv5'
import PubSub from 'pubsub-js'
export default class Item extends Component {
  state={
    owner:"",
    price:"",
    name:"",
    id:this.props.nftId,
    uri:"",
    describe:"",
    needReputation:0,
    isListed:false
  }

  componentDidMount(){
    marketContract.getNFTInfo(this.props.nftId).then(data=>{
      this.setState({
        owner:data[0],
        price:data[1],
        name : data[2],
        uri : data[3],
        describe : data[4],
        needReputation:data[5].toNumber()
      }) 
    })

    marketContract.isListed(this.state.id).then(res=>{
      this.setState({
        isListed : res
      })
    })

    PubSub.subscribe("unlist",(_,data)=>{
      
      const {id} = data
      if(id===this.state.id){
        this.setState({
          isListed:false
        })
      }
      
    })

    PubSub.subscribe("listToMarket",(_,data)=>{
      const {id} = data
      if(id===this.state.id){
        this.setState({
          isListed:true
        })
      }
    })
  }

  showDetails = ()=>{
    // alert( ethers.utils.formatUnits(this.state.price, 18))
    PubSub.publish("showDetails",{
      uri : this.state.uri,
      name:this.state.name, 
      id : this.state.id, 
      price:ethers.utils.formatUnits(this.state.price, 18),
      describe:this.state.describe,
      needReputation:this.state.needReputation,
      isListed:this.state.isListed
    } )
  }

  
  
  render() {
    return (
      <li
        
      className="relative">
      <div
        className={
          'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-800  rounded-lg overflow-hidden group-hover:opacity-100'
        }
      >
        <img
          src={this.state.uri} 
          alt=''
          className='object-cover pointer-events-none  w-44 h-44'                  
        />
        <button
        onClick = {this.showDetails}
        type="button" className="absolute inset-0 focus:outline-none w-full">
          <span className="sr-only">View details for name</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-semibold text-gray-500 truncate pointer-events-none">
        {this.state.name} #{this.state.id} {this.state.isListed?<span className=' text-green-700'>(正在出售)</span>:""}
      </p>
      
    </li> 
    )
  }
}
