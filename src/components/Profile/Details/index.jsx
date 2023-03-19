import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import UnlistedButton from './UnlistedButton'
import ListedButton from './ListedButton'
export default class Details extends Component {
  state={
    uri_ : "",
    name_:"",
    id_:"",
    price_:"",
    describe_:"",
    needReputation_:"",
    isListed_:false

  }
  componentDidMount(){
    PubSub.subscribe("showDetails",(_,data)=>{
      const {uri,name,id,price,isListed,describe,needReputation} = data
      this.setState({
        uri_:uri,
        name_:name,
        id_:id,
        price_:price,
        isListed_:isListed,
        describe_:describe,
        needReputation_:needReputation
      })
      
    })

    PubSub.subscribe("unlist",(_,data)=>{
      console.log(data)
      const{id} =data
      if(id===this.state.id_){
        this.setState({
          isListed_ : false
        })
      }
    })

    PubSub.subscribe("listToMarket",(_,data)=>{
      
      const{id} =data
      if(id===this.state.id_){
        this.setState({
          isListed_ : true
        })
        
      }
      
    })

    PubSub.subscribe("burn",(_,data)=>{
      this.setState({id_:""})
    })
  }

  
  render() {
    return (
      
        <aside key={this.state.id} className="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
            
              <div className="pb-16 space-y-6">
                <div>
                  <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                    <img src={this.state.id_===""?"":this.state.uri_} alt=" " className="object-cover w-80 h-80" />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        <span className="sr-only">Details for </span>
                        {this.state.id_===""?"":this.state.name_} <span className='text-gray-500'>{this.state.id_===""?"":"#"+this.state.id_}</span>
                      </h2>
                      <p className="text-sm font-medium text-gray-500 pt-2">{this.state.id_===""?"":"描述："}</p>
                      <div className=' pt-2 text-gray-500 font-semibold'>
                        {this.state.id_===""?"": this.state.describe_}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="py-2 flex justify-between text-sm font-medium">
                  <dt className="font-medium text-gray-500">{this.state.id_===""?"":"限制信誉分"}</dt>
                  <dd className="text-gray-900 text-right "><span className='font-semibold text-gray-900'>{this.state.id_===""?"":this.state.needReputation_}</span><span className=' text-orange-500'> {this.state.id_===""?"":"Score"}</span></dd>
                  </div >
                  

                  <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  
                    <div className="py-2 flex justify-between text-sm font-medium">
                        <dt className="text-gray-500">{this.state.id_===""?"":"价格:"} </dt>
                        <dd className="text-gray-900 text-right "><span className='font-semibold text-gray-900'>{this.state.id_===""?"":this.state.price_}</span><span className=' text-purple-800'>  {this.state.id_===""?"":"ETH"}</span></dd>
                      </div>
                  </dl>
                </div>

                <div className="flex">
                    {this.state.id_===""?"": this.state.isListed_?<ListedButton id = {this.state.id_}/>:<UnlistedButton id = {this.state.id_}/>}
                </div>
            </div>
            
        </aside>
      
    )
  }
}
