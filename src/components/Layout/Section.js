import React from 'react'
import styled from 'styled-components'
const SectionFull = styled.div `
 
`
const Section = styled.div `
 padding: 20px;
`
function SectionFullWarp({children}) {
  return (
    <SectionFull className="w-full">{children}</SectionFull>
  )
}
function SectionWarp({children}) {
  return (
    <Section className="container m-auto">{children}</Section>
  )
}

export {SectionWarp, SectionFullWarp}