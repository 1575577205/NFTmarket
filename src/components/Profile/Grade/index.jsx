import React, { Component } from 'react'
import { marketContract } from '../../../contract'
export default class Grade extends Component {
    grade = async (value)=>{
        await marketContract.grade(value).then(res=>{
            
        })        
    }
  render() {
    
    return (
        <div className=' text-center' >
        <div>请为上一次交易评分：</div>
        <span className="rating pt-5" >
          <input onChange={(e)=>this.grade(e.target.value)} type="radio" id="star5" name="rating" value="5" /><label for="star5" title="非常好"></label>
          <input onChange={(e)=>this.grade(e.target.value)} type="radio" id="star4" name="rating" value="4" /><label for="star4" title="还好"></label>
          <input onChange={(e)=>this.grade(e.target.value)} type="radio" id="star3" name="rating" value="3" /><label for="star3" title="中等"></label>
          <input onChange={(e)=>this.grade(e.target.value)} type="radio" id="star2" name="rating" value="2" /><label for="star2" title="差"></label>
          <input onChange={(e)=>this.grade(e.target.value)} type="radio" id="star1" name="rating" value="1" /><label for="star1" title="非常差"></label>
        </span>
    </div>
    )
  }
}
