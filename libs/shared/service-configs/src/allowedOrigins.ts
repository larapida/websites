const domainName = process.env.DOMAIN_NAME as string;
const domainParts = domainName.split('.');
const baseDomainPattern = `.${domainParts.slice(-2).join('\\.')}$`;

/**
 * List of allowed CORS origins (full domains + regex for subdomains).
 */
export const allowedOrigins: (string | RegExp)[] = [
  `http://${domainName}`,
  `https://${domainName}`,
  new RegExp(baseDomainPattern),
];
