// app/Drivers/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { RoleProtectedRoute } from '../../components/RoleProtectedRoute';

export default function DriversLayout() {
  return (
    <RoleProtectedRoute requiredRole="DRIVER">
      <Slot />
    </RoleProtectedRoute>
  );
}
