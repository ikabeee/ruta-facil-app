// app/MobileTransportApp/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { RoleProtectedRoute } from '../../components/RoleProtectedRoute';

export default function MobileTransportAppLayout() {
  return (
    <RoleProtectedRoute requiredRole={["USER", "ADMIN"]}>
      <Slot />
    </RoleProtectedRoute>
  );
}
