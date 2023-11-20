import React from 'react'
import CommonDashboard from '../components/CommonDashboard'

const DashboardProfile = () => {
    return (
        
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-lg-3'>
                        <CommonDashboard />
                    </div>

                    <div className='col-lg-9'>
                        <div>
                            <h1>Welcome to Profile</h1>
                        </div>
                    </div>

                </div>
            </div>
       
    )
}

export default DashboardProfile