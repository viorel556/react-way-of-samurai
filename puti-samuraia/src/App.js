import './App.css';
import React from "react";


const App = () =>  {
  return (
    <div className='app-wrapper'>
      <header className="header">
        <img src='https://png.pngtree.com/template/20200426/ourmid/pngtree-initial-letter-hg-logotype-company-name-design-image_366311.jpg'/>
      </header>

      <nav className="nav">
        <div> <a> Profile </a> </div>
        <div> <a> Messages </a> </div>
        <div> <a> News </a> </div>
        <div> <a> Music </a> </div>
        <div> <a> Settings </a> </div>
      </nav>

      <div className="content">

      <img src='https://www.americanoceans.org/wp-content/uploads/2021/04/number-of-oceans.jpg'/>  

        <div> ava + description 
        <div> 
          {/* <img src='https://1fid.com/wp-content/uploads/2022/06/Twitter-profile-picture-4-1024x1024.jpg' />   */}
        </div> 

        </div>
        <div> 
          My posts 
          <div> New Post </div>
          <div> Post 1 </div>
          <div> Post 2 </div> 
          
        </div> 

      </div>

    </div>
  )
}
export default App;
