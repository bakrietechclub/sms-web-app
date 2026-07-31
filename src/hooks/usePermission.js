import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Fail-closed: kosong/absen -> false. Pola identik we-app-hol-admin.
export function usePermission() {
  const rawPermissions = useSelector((state) => state.authUser.user?.permissions);

  const permissions = useMemo(() => new Set(rawPermissions || []), [rawPermissions]);

  const can = (code) => permissions.has(code);
  const canAny = (codes) => codes.some((code) => permissions.has(code));
  const canAll = (codes) => codes.every((code) => permissions.has(code));

  return { can, canAny, canAll, permissions };
}
