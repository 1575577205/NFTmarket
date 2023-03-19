import React, { Component } from 'react'
import PreviewItem from '../NFTMarket/PreviewItem'
import { ethers } from '../../ethersv5';
import { create } from "ipfs-http-client";
import { marketContract } from '../../contract';

export default class Mint extends Component {

  state ={
    imgFile:"",
    src:"",
    name:"",
    price:""

  }


  
  loadImg = async(event)=>{
    let file = event.target.files[0]
    this.setState({imgFile:file})
    var reader = new FileReader()
    reader.readAsDataURL(file)
    var res 
     reader.onloadend =async (e)=> {
        res = e.target.result  
        this.setState({src:res})
     }

  }


  //铸造NFT
  mint = async ()=>{
    const{name,price,count,needReputation,description} = this
    let imgFile = this.state.imgFile
    const client = create("http://localhost:5002");
    const { cid } = await client.add(imgFile);
    let uri = "http://localhost:9090/ipfs/"+ cid.toString()
    const amount = ethers.utils.parseUnits(price.value, 18)
    console.log(description.value)
    for(var i =  0;i<parseInt(count.value);i++ ){
      
      await marketContract.createNFT(amount,name.value,uri,description.value,needReputation.value)
      marketContract.on("createNFTSuccess",()=>{
        alert("NFT铸造成功！")
      })
    }
    
  }
  render() {
    return (
      <>
        
        <div className="mt-10 sm:mt-0 py-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">铸造您的NFT</h3>
              <p className="mt-1 text-sm text-gray-600">Create your own NFTs.</p>
              {/* <img src="http://bafybeigmcj7yezlbdkspe4lisjceb6hfffu4vsj2l35ih3vxgmcvds65dq.ipfs.localhost:8080/?filename=Qmc5GErY4zwB4qGxin2o8uyx8HBx2fdqbVvb876ubJJ88K" alt="" height={100} width = {50}/>  */}
            </div>
            <div  className="flex flex-col  rounded-lg shadow-lg overflow-hidden  " style={{width:293 ,height:436}}>
                  <PreviewItem uri = {this.state.src} name = {this.state.name} price = {this.state.price}/>
            </div>
            
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">

                    <div>
                    <label className="block text-lg font-medium text-gray-700">上传NFT图片</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center" >
                        <div id='img'>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        </div>
                        <div className=" text-mid text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md  bg-white font-medium text-indigo-600  focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span className="">点此上传</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={this.loadImg} />
                          </label>
                          
                          
                        </div>
                        <p className="text-xs text-gray-500">格式为:PNG, JPG, GIF (10MB以内)</p>
                      </div>
                    </div>
                  </div>


                  <div className="py-4 grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-mid font-medium text-gray-700">
                        NFT名称
                      </label>
                      <input
                        ref={c=>this.name = c}
                        onChange={(e)=>(this.setState({name:e.target.value}))}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg border-2"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-mid font-medium text-gray-700">
                        NFT价格(ETH)
                      </label>
                      <input
                        ref={c=>this.price = c}
                        onChange={(e)=>(this.setState({price:e.target.value}))}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg border-2"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-mid font-medium text-gray-700">
                        NFT 数量
                      </label>
                      <input
                        ref={c=>this.count = c}
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg border-2"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-mid font-medium text-gray-700">
                        限制信誉分
                      </label>
                      <input
                        ref={c=>this.needReputation = c}
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg border-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-mid font-medium text-gray-700">
                      描述
                    </label>
                    <div className="mt-1">
                      <textarea
                        ref={c=>this.description = c}
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-mid border-2"
                        placeholder="  对您的NFT进行简单描述"
                        defaultValue={''}
                      />
                    </div>
                  </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={this.mint}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    铸造
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    

      </>
    )
  }
}
