import React from 'react'
import classes from './inputContainer.module.css'

export default function InputContainer({label, bgColor, children}) {
  return (
    <div className={classes.input} style={{backgroundColor: bgColor}}>
      <div className={classes.label}>{label}</div>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
