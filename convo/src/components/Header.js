import React from 'react'

const Header = () => {
  return (
    <div id="top" className="row" style={{ 
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyItems:'flex-start',
        justifyContent:'flex-start',
        borderBottom: '2px solid black', 
        position: 'absolute', 
        backgroundColor: 'white', 
        height: '10vh',
        width: '100%' ,
        }}>

        <div style={{
            fontSize:'60px',
            marginTop:'-10px',
            position:'relative'
        }} >

                <b>Convo</b>
        </div>
    </div>
  )
}

export default Header