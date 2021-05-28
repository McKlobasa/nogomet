import React from 'react'
import styled from 'styled-components'
import Imports from './Imports'
import Sub from './Sub'

const StyledFooter = styled.div`
  grid-area: footer;
`


const Footer = props => {
  return (
    <StyledFooter>
      <span>
        <Sub />
        <Sub />
        <Sub />
        <Sub />
      </span>
      <span>
        <Imports />
      </span>
    </StyledFooter>
  )
}

export default Footer
