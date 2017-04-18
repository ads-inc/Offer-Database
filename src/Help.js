import React from 'react'
import Done from './doneselecting.png'
import Product from './productselect.png'
import Lander from './uploadlander.png'

const Help = () => {
  return (
    <div className='help-container'>
      <h3>Help Docs</h3>
      <ul className='list-parent'>Formatting your lander
        <li className='list-child'>Every reference to a product in the text of your lander needs to be replaced with {" {{step1}} and {{step2}} "}</li>
        <li className='list-child'> {"for every bottle image, replace the entire src url with {{step1ImageUrl}} or {{step2ImageUrl}}"} </li>
        <ul>
          <li className='list-child-child'>Besure to include double curly braces {"{{ }}"}</li>
        </ul>

      </ul>
      <ol className='list-parent'>Creating Product Versions of Your Landers
        <li className='list-child'>First, select a product category from the menu on the left</li>
        <li className='list-child'>Then select the products you wish to make lander versions of</li>
        <img src={Product} alt=''/>
        <li className='list-child'>Click "done selecting"</li>
        <img src={Done} alt='' />
        <li className='list-child'>Upload your lander by dragging and droping within the dashed border area, or click the box to select a lander on your hard drive</li>
        <img src={Lander} alt='' />
        <ul>
          <li className='list-child-child'>the lander versions will download automatically</li>
        </ul>
        <li className='list-child'>upload to your ftp and you are done</li>
      </ol>


    </div>
  )
}
export default Help
