import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'confirm@retainer.cloud',
        to: email,
        subject: 'Confirm your email on Cloud Retainer',
        html: `<div style='text-align: center'>
                  <img src='https://content.retainer.cloud/common/xianyun-confirmation.png' alt='Xianyun'/>
                  <h1>Confirm your E-Mail on Cloud Retainer! Click <a href='${confirmLink}'>here</a></h1>
                  <div>
                    <h3>E-Mail: <a href='mailto:cloud.retainer.dev@gmail.com'>cloud.retainer.dev@gmail.com</a></h3>
                    <h3>Telegram chanel: <a href='https://t.me/cloud_retainer_community'>Cloud Retainer | Community</a></h3>
                  </div>
              </div>`,
    });
};
