import React, { Component } from 'react'
import { marketContract } from '../../../../contract'
import PubSub from 'pubsub-js'
export default class UnlistedButton extends Component {

    burn = async()=>{
        if(window.confirm("您确定销毁该NFT?")){
         await marketContract.burn(this.props.id)
        }

        marketContract.on("burnNFTSuccess",()=>{
          PubSub.publish("burn",{id:this.props.id})
        })
      }
    
    listToMarket = async() =>{
      await marketContract.listNFT(this.props.id)

      marketContract.on("listNFTSuccess", async()=>{
        
        PubSub.publish("listToMarket",{id:this.props.id})
      })
      
    }
  render() {
    return (
      <>
        <button
            disabled={this.props.id===""}
            onClick={this.listToMarket}
            type="button"
            className="  flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            出售
        </button>
            <button
            onClick={this.burn}
            disabled={this.props.id===""}
            type="button"
            className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            销毁
            
        </button>
      </>
    )
  }
}
