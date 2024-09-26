/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Container,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const AccountVerificationEmail = ({ username, verificationLink }) => {
  return (
    <Tailwind>
      <Html>
        <Container className="max-w-xl mx-auto p-4 bg-gray-50 my-24">
          <Section className="text-center">
            <Img
              src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/mayq4hjctoaebnzsvejm.jpg"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto mb-4 py-2"
            />
          </Section>

          <Section className="bg-white shadow-md rounded-lg p-6  px-4">
            <Text className="text-2xl font-bold text-gray-900 mb-4 px-2">
              Welcome to
            </Text>
            <Text className="text-gray-700 mb-4  px-2">
              Dear {`[${username}]`},
            </Text>
            <Text className="text-gray-700 mb-4 px-2">
              Thank you for signing up with Aidroo! To complete your
              registration please verify your email address by clicking the link
              below:
            </Text>
            <Section className="text-center my-6 px-2">
              <Button
                href={verificationLink}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow hover:bg-blue-700"
              >
                Confirm Email
              </Button>
            </Section>
            <Text className="text-gray-700 mb-4 px-2">
              If you didn’t sign up for this account, please ignore this email.
              This verification link will be automatically expire in 24 day
            </Text>
            <Text className="text-gray-700 px-2">Best regards,</Text>
            <Text className="text-gray-700 px-2">The Aidroo Team</Text>
          </Section>

          <Section className="text-center mt-6 text-gray-500 text-xs">
            <Text className="text-lg font-semibold">Follow on us</Text>
            <Button
              href="https://www.facebook.com/Fb.Aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/rlesrpaejk5hjvofaqq4.jpg"
                alt="Facebook"
                width="30"
                height="30"
              />
            </Button>

            <Button
              href="https://twitter.com/aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/f1siznfd88v8achoj30u.jpg"
                alt="Twitter"
                width="30"
                height="30"
              />
            </Button>

            <Button
              href="https://www.instagram.com/aidroo_ig/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/vwzfoau1zza9usbgyuly.jpg"
                alt="Instagram"
                width="30"
                height="30"
              />
            </Button>

            <Button
              href="https://youtube.com/@aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/xf1xhpephfgorktt6uik.jpg"
                alt="YouTube"
                width="30"
                height="30"
              />
            </Button>

            <Button
              href="https://www.linkedin.com/company/aidroo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src="http://res.cloudinary.com/dtwhrzfwy/image/upload/v1724245453/qikvxrqvmlffarqt9ruv.jpg"
                alt="LinkedIn"
                width="30"
                height="30"
              />
            </Button>
          </Section>
          <Text className="text-center">
            © {new Date().getFullYear()} Aidroo. All rights reserved.
          </Text>
        </Container>
      </Html>
    </Tailwind>
  );
};

export default AccountVerificationEmail;
