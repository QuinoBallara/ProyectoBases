import React from 'react'
import { ActivityCardsContainer } from '../../components/ActivityCardsContainer'

export const Activities = () => {
    return (
        <div className='activities' style={{ width: '100%' }}>
            <div className='content'>
                <div className='cards'>
                    <ActivityCardsContainer />
                </div>
            </div>
        </div>
    )
}
