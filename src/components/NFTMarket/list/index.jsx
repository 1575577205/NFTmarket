import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { marketContract } from '../../../contract'
import Items from '../item'


export default class NFTList extends Component {
    state ={
        IDs:[]
    }
    componentDidMount(){
        //组件加载后获取NFTid列表
        marketContract.getNFTList().then(data=>{
            var ids = this.state.IDs
            for(var i=0;i<data.length;i++){
                ids.push(data[i].toNumber())
            }
            this.setState({
                IDs:ids
            })
            
        })

        
        //NFT进入列表后更新
        PubSub.subscribe("listToMarket",(_,data)=>{
            
            const {id} = data
            var ids = this.state.IDs
            for(var i =0;i<ids.length;i++){
                if(ids[i]===0){
                    ids[i] = id
                    this.setState({
                        IDs:ids
                    })
                    return
                }
            }
            ids.push(id) 
            this.setState({
                IDs:ids
            })
            
        })

        PubSub.subscribe("unlist",(_,data)=>{
            const {id} = data
            console.log(id)
            var ids = this.state.IDs
            for(var i =0;i<ids.length;i++){
                if(ids[i]===id.toNumber()){
                    ids[i] = 0
                    this.setState({
                        IDs:ids
                    })
                    return
                }
            }

        })
    }
  render() {
    return (
        <>        
            <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-10 lg:pb-28 lg:px-10">
            <div className="absolute inset-0">
                <div className="bg-white  sm: h-full" />
            </div>
            <div className="relative">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">欢迎来到NFT交易市场</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Mint a NFT to get unlimited ownership forever!
                    </p>
                </div>

                <div className="py-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8   ">
                    {
                        this.state.IDs.map(id=>{
                            if(id===0){
                                return(null)
                            }else{
                                return(
                                    <div key={id}  className="flex flex-col  rounded-lg shadow-lg overflow-hidden  ">
                                        <Items ntfId={id}/>
                                    </div>)
                            }
                            
                        })
                    }
                        
                    
                </div>
            </div>
            </div>       
        </>   
        
      
    
           
    )
  }
}
