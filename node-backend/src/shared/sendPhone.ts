import AWS from 'aws-sdk';

const sns = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const sendPhone = async (to: string, message: string) => {
  const params = {
    Message: message,
    PhoneNumber: to,
  };
  return sns.publish(params).promise();
};
