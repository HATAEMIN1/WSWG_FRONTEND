import React from 'react'
import styled from 'styled-components'
const SectionFull = styled.div `
`
const Section = styled.div `
 padding: 0;
`
function SectionFullWrap({children}) {
  return (
    <SectionFull className="w-full">{children}</SectionFull>
  )
}
function SectionWrap({children}) {
  return (
    <Section className="container m-auto">{children}</Section>
  )
}

export {SectionWrap, SectionFullWrap}