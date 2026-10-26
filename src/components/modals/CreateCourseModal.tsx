'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';

export const CreateCourseModal: React.FC = () => {
  const { isCreateCourseOpen, setIsCreateCourseOpen } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isCreateCourseOpen) {
      setIsCreateCourseOpen(false);
      router.push('/admin/courses/new');
    }
  }, [isCreateCourseOpen, setIsCreateCourseOpen, router]);

  return null;
};
