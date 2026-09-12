export const SITE_IDENTITY = {
  brandName: "펫지기",
  legalEntityLabel: "(주)펫지기",
  contactEmail: "contact@petjigi.kr",
  evidence: {
    legalEntity: {
      status: "UNKNOWN",
      operatorAction: "Confirm the exact registered operating entity before changing the public label.",
    },
    contactMailbox: {
      status: "UNKNOWN",
      operatorAction: "Confirm that the published mailbox is monitored without sending an unauthorized test email.",
    },
  },
} as const;

export const SITE_CONTACT_MAILTO = `mailto:${SITE_IDENTITY.contactEmail}`;
