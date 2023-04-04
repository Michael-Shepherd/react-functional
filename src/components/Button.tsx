import React from 'react'

interface ButtonProps {
    children: string;
    colour?: 'primary' | 'secondary' | 'danger' | 'success';
    onClicked: () => void;
}



const Button = ({children, colour = 'primary', onClicked}: ButtonProps) => {
  return (
    <button type="button" className={"btn btn-" + colour} onClick={onClicked}>{children}</button>
  )
}

export default Button