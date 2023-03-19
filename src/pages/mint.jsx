import React, { Component } from 'react'
import { MintNFT } from '../components'
import BaseLayout from '../components/BaseLayout'
export default class Mint extends Component {
  render() {
    return (
        <>
            <BaseLayout>
                <MintNFT/>
            </BaseLayout>

        </>
    )
  }
}
