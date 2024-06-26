export type ENVConfiguration = ReturnType<typeof config>;

export const config = () => ({
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  jwt: {
    secert: 'secret',
  },
  hash: {
    time: 10,
  },
});
