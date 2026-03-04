import { sendMailAsync } from "../utils/sendMail";

export const signUpSubscriberAsync = async (data) => {
  await sendMailAsync({
    email: data?.email,
    subject: "Email verification",
    template: "emailverification.mails.ejs",
    data: {
      user: data.name,
      code: data?.code,
    },
  });
};

export const forgetPasswordSubscriberAsync = async (data) => {
  await sendMailAsync({
    email: data?.email,
    subject: "Password reset code",
    template: "passwordReset.mails.ejs",
    data: {
      user: data.name,
      code: data.code,
      link: data.link,
    },
  });
};
