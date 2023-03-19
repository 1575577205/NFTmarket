import React, { Component } from 'react'
import NFTList from '../components/NFTMarket/list'
import BaseLayout from '../components/BaseLayout'

export default class Market extends Component {
  render() {
    return (
      <>
        <BaseLayout>
            <NFTList/>
        </BaseLayout>
      </>
    )
  }
}
