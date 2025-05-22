'use client'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  .cl-userButtonPopoverFooter {
    ${tw`hidden`}
  }
.ReactModal__Overlay {
  ${tw`z-50`}
}
`


const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
