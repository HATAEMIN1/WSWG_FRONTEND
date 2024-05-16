import React from 'react'
import styled from 'styled-components'
const SectionFull = styled.div `
`
const Section = styled.div `
 padding: 0;
`
function SectionFullWrap({className,children,...props}) {
  let cssClasses = 'w-full';
  if (className) {
    cssClasses += ' ' + className;
  }
  return (
    <SectionFull  className={cssClasses} {...props}>{children}</SectionFull>
  )
}
function SectionWrap({className,children,...props}) {
  let cssClasses = 'container m-auto';
  if (className) {
    cssClasses += ' ' + className;
  }
  return (
    <Section className={cssClasses} {...props}>{children}</Section>
  )
}

export {SectionWrap, SectionFullWrap}