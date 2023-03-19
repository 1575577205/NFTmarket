import React, { Component } from 'react'
import Item from '../Item'
import { marketContract } from '../../../contract'
import PubSub from 'pubsub-js'
export default class NFTList extends Component {
  
  state = {
    NFTs:[]
  }

  componentDidMount(){
    
    marketContract.getOwnerNFTs().then((res)=>{
        var nfts = this.state.NFTs
        for(var i =0;i<res.length;i++){
          if (res[i].toNumber()=== 0) {
            continue
          }
          nfts.push(res[i].toNumber())
        }
        this.setState({NFTs:nfts})

      })

    PubSub.subscribe("burn",(_,data)=>{
      const{id} = data
      var nfts = this.state.NFTs
      for(var i =0;i<nfts.length;i++){
        if (nfts[i]=== id) {
          delete nfts[i]
          break
        }
      }
      this.setState({NFTs:nfts})
    })
  }

  
  render() {
    return (
      <>
        <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
            <ul          
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >                   
              {this.state.NFTs.map((nftID)=>{
                if(nftID!==0){
                  return <Item key={nftID} nftId = {nftID} />
                }
                
              })
              }  
              
                
            </ul>
        </section>
      </>
    )
  }
}
