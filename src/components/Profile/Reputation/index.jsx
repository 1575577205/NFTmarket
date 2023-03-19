import React, { Component } from 'react'
import { marketContract } from '../../../contract'
export default class Reputation extends Component {
    state={
        reputation:0
    }

    componentDidMount(){
        marketContract.getReputation().then(res=>{
            this.setState({reputation:res.toNumber()})
            console.log(res.toNumber())
        })
    }
  render() {
    return (
      <div className=' pt-10'>
        <div className="wrap">
        <h1>您的信誉分展示</h1>
        <div className="content">
            <p>您当前的信誉等级：<span className="level">V{parseInt(this.state.reputation/100)}</span></p>
            <p>您当前的信誉分：<span className="credit">{this.state.reputation}</span></p>
            <p>您当前的信誉度：</p>
            <div className="progress">
                <div className="percent" style={{width:`${this.state.reputation/5}%`}}></div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}
