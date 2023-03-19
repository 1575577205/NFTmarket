
import { Component } from 'react'
import { marketContract } from '../contract'
import {ethers} from "../ethersv5"
import { Link } from 'react-router-dom'

export default class Regist extends Component {

  componentDidMount(){
    marketContract.on("registSuccess",()=>{
      alert("注册成功！")
    })
  }
    
  registBeBuyer = async ()=>{
    const{id_num,name} = this;
      await marketContract.registBeBuyer(id_num.value,name.value).then(res=>{
      
    },(eroor=>{
      
      console.log(eroor.data.message)
      
    }))
  }

  
  registBeSeller = async ()=>{
    const{id_num,name} = this;
    
      await marketContract.registBeSeller(id_num.value,name.value,{ value: ethers.utils.parseEther("5.0") }).then(res=>{
       
    },(eroor=>{
      
      console.log(eroor.data.message)
      
    }))
  }

  
  
      render(){

      
        return (
            <>
             
              <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div>
                    <img
                      className="mx-auto h-12 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      使用身份ID注册您的账户
                    </h2>
                    <p className='text-center text-gray-400 font-sans pt-2'>Use your ID number to register your account</p>
                    
                  </div>
                  <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        
                        <input
                          ref={(c)=>this.id_num = c}
                          id="id-number"
                          name="id-number"
                          type="text"
                          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder=" 请输入您的身份证号"
                        />

                        <input
                        ref={c=>this.name = c}
                          id="id-name"
                          name="id-name"
                          type="text"
                          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder=" 请输入您的姓名"
                        /> 
                      </div>
                      
                    </div>
        
                    <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <Link to="/login" 
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                          返回登录
                        </Link>
                      </div>
        
                      
                    </div>
        
                    <div className='flex'>
                      <button
                        type="button"
                        onClick={this.registBeBuyer}
                        className="group relative flex w-2/5 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500  focus-visible:outline-indigo-600"
                      >
                        
                        注册成为买家
                      </button>
                      <div className='flex w-1/5'></div>
                      <button
                        type="button"
                        onClick={this.registBeSeller}
                        className="group relative flex w-2/5 justify-center  rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500  focus-visible:outline-indigo-600"
                      >
                        
                        注册成为卖家
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )
    }
  
}
