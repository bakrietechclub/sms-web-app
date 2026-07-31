import { getSmsRoleInfo } from '../../utils/roleDisplay';

// Blok "nama + role + Divisi" yang identik di HeaderLandingPg (/home) dan
// HeaderDashboard (/dashboard) -- satu sumber tampilan supaya keduanya
// SELALU konsisten dan sama-sama mencerminkan assignment SMS_* dari SA.
export const RoleIdentity = ({ username, user }) => {
  const { roleName, divisionName, hasAccess } = getSmsRoleInfo(user);

  return (
    <div className='inline-grid leading-tight'>
      <strong className='font-semibold text-base text-[#1f1f1f]'>{username}</strong>
      <span className={`text-xs font-medium ${hasAccess ? 'text-[#28A745]' : 'text-[#DC3545]'}`}>
        {roleName}
      </span>
      {divisionName && (
        <span
          className='text-[11px] text-gray-500 truncate max-w-48'
          title={divisionName}
        >
          {divisionName}
        </span>
      )}
    </div>
  );
};
