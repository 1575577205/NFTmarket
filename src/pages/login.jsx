
import { Component } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import {marketContract} from "../contract"
export default class Login extends Component {
  
    
    login = ()=> {
      const {id_input} = this;
      
       marketContract.getID().then(res=>{
        
        if(res===id_input.value&&res!==""){
          window.location.href ="/market"
        }else{
          alert("账户信息有误!")
        }
      }
       )
      
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
                      使用身份ID登录您的账户
                    </h2>
                    <p className='text-center text-gray-400 font-sans pt-2'>Log in to your account with your ID number</p>
                    
                  </div>
                  <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        
                        <input
                          id="id-number"
                          name="id-number"
                          type="text"
                          ref={c=>{this.id_input = c}}
                          className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder=" 请输入您注册时的身份证号"
                        />
                      </div>
                      
                    </div>
        
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        
                        
                      </div>
        
                      <div className="text-sm">
                        <Link to="/regist" 
                        className="font-medium text-indigo-600 hover:text-indigo-500">
                          注册账号
                        </Link>
                      </div>
                    </div>
        
                    <div>
                      <button
                        type="button"
                        onClick={this.login}
                        className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500  focus-visible:outline-indigo-600"
                      >
                        
                        登录
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )
    }
  
}
