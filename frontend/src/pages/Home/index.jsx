import React from 'react'
import { TopBar } from '../../components/TopBar'
import Dropdown from '../../components/DropdownPolenta'
import { ClassCard } from '../../components/CassCard'

export const Home = () => {
    return (
        <div>
            <div className='top-bar'>
                <TopBar />
            </div>
            <div className='content'>
                <div className='filters'>
                    <Dropdown label="age" options={[
                        { value: "1", label: '1' },
                    ]} value="1" onChange={() => { }} name="hola" />
                    <Dropdown label="age" options={[
                        { value: "1", label: '1' },
                    ]} value="1" onChange={() => { }} name="hola" />
                    <Dropdown label="age" options={[
                        { value: "1", label: '1' },
                    ]} value="1" onChange={() => { }} name="hola" />
                </div>
                <div className='cards'>
                    <ClassCard />
                </div>
            </div>
        </div>
    )
}
