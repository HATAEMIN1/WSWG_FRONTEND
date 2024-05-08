import React from 'react'
import styled from 'styled-components'
const Section = styled.div `
 padding: 20px;
`
function SectionWarp({children}) {
  return (
    <Section className="container m-auto">{children}</Section>
  )
}

export default SectionWarp