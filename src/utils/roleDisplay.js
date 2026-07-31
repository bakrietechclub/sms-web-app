// Satu sumber format tampilan role SMS -- dipakai HeaderLandingPg (/home)
// DAN HeaderDashboard (/dashboard) supaya konsisten dan benar-benar
// mencerminkan assignment SUNGGUHAN dari SA (Atur Akses -> Akses SMS),
// bukan accessRole/selectedAccess lama.
export const getSmsRoleInfo = (user) => {
  const smsRoles = (user?.roles || []).filter((r) => r.code?.startsWith('SMS_'));

  if (!smsRoles.length) {
    return { roleName: 'Belum ada akses SMS', divisionName: null, hasAccess: false };
  }

  // Satu orang secara desain cuma pegang 1 Divisi untuk SMS, tapi
  // digabung defensif kalau suatu saat lebih dari satu.
  const roleName = smsRoles.map((r) => r.name).join(' & ');
  const divisionName = [...new Set(smsRoles.map((r) => r.firstTierProgramName).filter(Boolean))].join(' & ');

  return { roleName, divisionName: divisionName || null, hasAccess: true };
};
