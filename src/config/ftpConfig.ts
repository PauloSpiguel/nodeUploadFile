const ftpConfig = {
  port: process.env.FTP_PORT || 21,
  host: process.env.FTP_HOST,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
} as const;

export { ftpConfig };
