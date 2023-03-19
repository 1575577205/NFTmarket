import React, { Component } from 'react'
import { marketContract } from '../../../../contract'
import PubSub from 'pubsub-js'
export default class ListedButton extends Component {

    unList= async()=>{
        await marketContract.unlistNFTByOwner(this.props.id)
        await marketContract.on("unListNFTSuccess",()=>{
          
          PubSub.publish("unlist",{id : this.props.id})
        })
        
    }
  render() {
    return (
      <div className='flex-2 w-full'>
        <button
            disabled={this.props.id===""}
            onClick={this.unList}
            type="button"
            className=" w-full   py-2 px-4 border border-transparent rounded-md shadow-sm text-medium font-medium text-white hover: bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            从商城中撤下
        </button>
      </div>
    )
  }
}
