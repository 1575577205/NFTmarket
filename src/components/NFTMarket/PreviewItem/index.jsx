import React, { Component } from 'react'

import SlideOvers from '../../Slide-overs'


export default class PreviewItem extends Component {
  
  state={
    uri:this.props.uri,
    name:this.props.name,
    price:this.props.price
  }
  

  
  render() {
    return (
      <>
      <div className="flex-shrink-0">
        
          <img
            className={` object-cover group-hover:opacity-75 w-72 h-72`}
            src = {this.props.uri}
            
            alt=" "
          />
        </div>
        <div className="flex-1 bg-white p-2 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center mt-2">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={"http://127.0.0.1:8080/ipfs/QmTLGjUcNZnWUg7W4KxTygMp3czhtQkoEEixkwU72FAzmQ"}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">制作者</p>
                  {/* <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{shortifyAddress(item.creator)}</p> */}
                </div>
              </div>
              <p className="text-lg  font-semibold text-indigo-600 pt-1 ">
                Aries
              </p>
            </div>
            <div className=" mt-2">
              <p className="text-xl font-semibold text-gray-900 ">{this.props.name} <span className="text-sm font-semibold text-gray-600">#100</span>
              <span className="order-1 text-xl  text-indigo-600  float-right">
                      {this.props.price} ETH                  
              </span>
              
              </p> 
            </div>
          </div>   
          <div className="py-2 ">
            <div className=" float-right">
              <button
                disabled={false}
                type="button"
                className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                购买
              </button>
              <button
                disabled={false}
                type="button"
                className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                预览
              </button>
            </div>
            
          </div>
        </div>
    
      </>
    )
  }
}
