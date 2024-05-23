import React from 'react'
import styled from 'styled-components'
const SectionFull = styled.div `
 padding-top: 80px;
`
const Section = styled.div `
  padding: 0;
  maging: 0 auto;
  &.defualt {
  padding-top: 0;
  padding-top: 80px;

 }
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
function SectionWrap({className,basicSection,children,...props}) {
  let cssClasses = basicSection ? "" :"defualt";
  if (className) {
    cssClasses += ' ' + className;
  }
  return (
    <Section className={`container m-auto ${cssClasses}`} {...props}>{children}</Section>
  )
}

export {SectionWrap, SectionFullWrap}