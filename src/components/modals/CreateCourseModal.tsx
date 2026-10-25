import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const CreateCourseModal: React.FC = () => {
  const { isCreateCourseOpen, setIsCreateCourseOpen } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreateCourseOpen) {
      setIsCreateCourseOpen(false);
      navigate('/admin/courses/new');
    }
  }, [isCreateCourseOpen, setIsCreateCourseOpen, navigate]);

  return null;
};
