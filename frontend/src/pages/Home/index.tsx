import React, { useEffect, useState } from 'react';
import { TopBar } from '../../components/TopBar';
import Dropdown from '../../components/DropdownPolenta';
import { ClassCardsContainer } from '../../components/ClassCardsContainer';
import './styles.scss';
import { useClasses } from '../../contexts/classesContext';
import Button from '../../components/Button';
import ClassModal from '../ClassModal';
import { useModal } from '../../contexts/modalContext';
import { getClasses } from '../../api/class';

export const Home = () => {

  const { filters, setFilters, setAllClasses, instructors, shifts, activities } = useClasses();

  const { isClassModalUp, setIsClassModalUp, setClassEditMode } = useModal();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterName: keyof typeof filters
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchClasses = async () => {
      if (!isClassModalUp) {
        setAllClasses(await getClasses());
      }
    }
    fetchClasses();
  }, [isClassModalUp])

  return (
    <div className="homePage">
      <div className="home-container">
        <div className="filters">
          <Dropdown
            label="Instructor"
            options={[
              { value: 'any', label: 'Any' },
              ...instructors.map((instructor) => ({
                value: instructor.id.toString(),
                label: instructor.first_name + ' ' + instructor.last_name,
              })),
            ]}
            value={filters.instructor}
            onChange={(e) => handleFilterChange(e, 'instructor')}
            name="instructor"
          />
          <Dropdown
            label="Shift"
            options={[
              { value: 'any', label: 'Any' },
              ...shifts.map((shift) => ({
                value: shift.id.toString(),
                label: shift.name,
              })),
            ]}
            value={filters.shift}
            onChange={(e) => handleFilterChange(e, 'shift')}
            name="shift"
          />
          <Dropdown
            label="Activity"
            options={[
              { value: 'any', label: 'Any' },
              ...activities.map((activity) => ({
                value: activity.id.toString(),
                label: activity.description,
              })),
            ]}
            value={filters.activity}
            onChange={(e) => handleFilterChange(e, 'activity')}
            name="activity"
          />
          <Button
            className="add-class-button"
            label="Add Class"
            onClick={() => {
              setClassEditMode(false);
              setIsClassModalUp(true)
            }}
          />
        </div>
        <div className="cards">
          <ClassCardsContainer />
        </div>

        <ClassModal />
      </div>
    </div>
  );
};
