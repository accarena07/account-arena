declare module "nodemailer" {
  const nodemailer: {
    createTransport: (config: unknown) => {
      sendMail: (message: unknown) => Promise<unknown>;
    };
  };

  export default nodemailer;
}
