import React, { Component } from 'react'
import BaseLayout from '../../BaseLayout'
import { Link } from 'react-router-dom'
import { marketContract } from '../../../contract'

export default class Header extends Component {
  state = {
    item1 : true,
    item2: false,
    isGrade:true
  }
  componentDidMount(){
    marketContract.isGraded().then(res=>{
      this.setState({isGrade:res})
    })

    marketContract.on("gradeSuccess",()=>{
      
      this.setState({isGrade:true})
    })
  }

  
  render() {
    return (
      <>
        <BaseLayout>
          <div className="h-full flex">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex">
                    <h1 className="flex-1 text-2xl font-bold text-gray-900">个人中心</h1>
                  </div>
                  <div className="mt-3 sm:mt-2">
                    <div className="hidden sm:block">
                      <div className="flex items-center border-b border-gray-200">
                        <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">                       
                            <Link
                              to="/profile/nfts"
                              id='item1'
                              onClick={()=>(this.state.item1? "": this.setState({item1:true,item2:false}))}
                              aria-current= 'page' 
                              className={(
                                this.state.item1?
                                'border-indigo-500 text-indigo-600':
                                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ')+
                                ' whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                              }
                            >
                              您的NFT
                            </Link>
                            <Link
                            id='item2'
                              to="/profile/reputation"
                              aria-current= 'page' 
                              onClick={()=>(this.state.item2? "": this.setState({item1:false,item2:true}))}
                              className={(
                                this.state.item2?
                                'border-indigo-500 text-indigo-600':
                                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ')+
                                ' whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                              }
                            >
                              信誉中心
                            </Link>
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* NFTList */}
                  {this.props.NFTList}
                  {this.state.isGrade?"": this.props.Grade}
                  {this.props.Reputation}

                  
                </div>
              </main>
              {/* Details */}
              {this.props.Details}
            
            </div>
          </div>
        </div>
        </BaseLayout>
      </>
      
       
    )
  }
}
