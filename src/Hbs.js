import React from 'react'
import Dropzone from 'react-dropzone'
import style from './style'

const Hbs = ({onFileUpload}) => {
  return(
    <Dropzone
      accept='text/html'
      style={style.fileUpload}
      onDrop={onFileUpload} >
      <p>drop lander file(s) here to add products/images</p>
    </Dropzone>

  )
}
export default Hbs
