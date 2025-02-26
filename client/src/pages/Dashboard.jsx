import React from 'react'
import dashboard from '../assets/dashboard.png'

const Dashboard = () => {
  return (
    <div className='relative'>
        <h1>Dashboard</h1>
        <img src={dashboard} alt="" />
        <div className='absolute left-150 top-80 w-50 h-50 align-center bg-orange-50'>

        </div>
        <button>Regenerate</button>
    </div>
  )
}

export default Dashboard