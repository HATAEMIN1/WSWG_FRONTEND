import React from 'react';
import styled from 'styled-components';
const Icon = styled.div `

`

function Icons({children,basicButton,className, ...props}) {
    let classNames = "";
    classNames+= ' ' +className
  return (
    <Icon className={classNames} {...props}>{children}</Icon>
  )
}

export default Icons