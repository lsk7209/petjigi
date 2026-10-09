export const SITE_IDENTITY = {
  brandName: "펫지기",
  legalEntityLabel: "펫지기",
  contactEmail: "contact@petjigi.kr",
  evidence: {
    legalEntity: {
      status: "OPERATOR_STATED_NOT_A_CORPORATION",
      operatorAction: "Operator stated 2026-10-10 that 펫지기 is a brand, not a corporation. Do not use (주) or other corporate labels; add registration details only if the operator provides them.",
    },
    contactMailbox: {
      status: "UNKNOWN",
      operatorAction: "Confirm that the published mailbox is monitored without sending an unauthorized test email.",
    },
  },
} as const;

export const SITE_CONTACT_MAILTO = `mailto:${SITE_IDENTITY.contactEmail}`;
