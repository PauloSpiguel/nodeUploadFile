export const ftpConfig = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  port: Number(process.env.DEFAULT_PORT || 21),
} as const;
