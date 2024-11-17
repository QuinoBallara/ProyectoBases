import React from 'react'
import { TopBar } from '../../components/TopBar'
import Dropdown from '../../components/DropdownPolenta'
import { ClassCardsContainer } from '../../components/ClassCardsContainer'
import './styles.scss'
import { useClasses } from '../../contexts/classesContext'

export const Home = () => {
  const { filters, setFilters } = useClasses();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, filterName: keyof typeof filters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: e.target.value,
    }));
  };

  return (
    <div className='homePage'>
      <div className='top-bar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='filters'>
          <Dropdown
            label="Instructor"
            options={[
              { value: "any", label: 'Any' },
              { value: "1", label: 'Instructor 1' },
              { value: "2", label: 'Instructor 2' },
              { value: "3", label: 'Instructor 3' }
            ]}
            value={filters.instructor}
            onChange={(e) => handleFilterChange(e, 'instructor')}
            name="instructor"
          />
          <Dropdown
            label="Shift"
            options={[
              { value: "any", label: 'Any' },
              { value: "morning", label: 'Morning' },
              { value: "afternoon", label: 'Afternoon' },
              { value: "night", label: 'Night' }
            ]}
            value={filters.shift}
            onChange={(e) => handleFilterChange(e, 'shift')}
            name="shift"
          />
          <Dropdown
            label="Activity"
            options={[
              { value: "any", label: 'Any' },
              { value: "yoga", label: 'Yoga' },
              { value: "pilates", label: 'Pilates' },
              { value: "crossfit", label: 'Crossfit' }
            ]}
            value={filters.activity}
            onChange={(e) => handleFilterChange(e, 'activity')}
            name="activity"
          />
        </div>
        <div className='cards'>
          <ClassCardsContainer />
        </div>
      </div>
    </div>
  )
}
