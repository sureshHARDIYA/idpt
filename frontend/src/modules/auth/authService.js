import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';
import { AuthToken } from 'modules/auth/authToken';

export default class AuthService {
  static async sendEmailVerification() {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SEND_EMAIL_ADDRESS_VERIFICATION_EMAIL {
          authSendEmailAddressVerificationEmail
        }
      `,
    });

    return response.data
      .authSendEmailAddressVerificationEmail;
  }

  static async sendPasswordResetEmail(email) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SEND_PASSWORD_RESET_EMAIL(
          $email: String!
        ) {
          authSendPasswordResetEmail(email: $email)
        }
      `,
      variables: {
        email,
      },
    });

    return response.data.authSendPasswordResetEmail;
  }

  static async registerWithEmailAndPassword(
    email,
    password,
  ) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SIGN_UP(
          $email: String!
          $password: String!
        ) {
          authSignUp(email: $email, password: $password)
        }
      `,
      variables: {
        email,
        password,
      },
    });

    return response.data.authSignUp;
  }

  static async signinWithEmailAndPassword(email, password) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SIGN_IN(
          $email: String!
          $password: String!
        ) {
          authSignIn(email: $email, password: $password)
        }
      `,
      variables: {
        email,
        password,
      },
    });

    return response.data.authSignIn;
  }

  static async fetchMe() {
    const response = await graphqlClient.query({
      query: gql`
        {
          authMe {
            id
            authenticationUid
            emailVerified
            fullName
            firstName
            lastName
            phoneNumber
            email
            roles
            avatars {
              id
              name
              publicUrl
            }
          }
        }
      `,
    });

    return response.data['authMe'];
  }

  static async isEmailConfigured() {
    const response = await graphqlClient.query({
      query: gql`
        {
          authIsEmailConfigured
        }
      `,
    });

    return response.data['authIsEmailConfigured'];
  }

  static signout() {
    AuthToken.set(null, true);
  }

  static async updateProfile(
    firstName,
    lastName,
    phoneNumber,
    avatars,
  ) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_UPDATE_PROFILE(
          $profile: UserProfileInput!
        ) {
          authUpdateProfile(profile: $profile)
        }
      `,

      variables: {
        profile: {
          firstName,
          lastName,
          phoneNumber,
          avatars,
        },
      },
    });

    return response.data.authUpdateProfile;
  }

  static async passwordReset(token, password) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_PASSWORD_RESET(
          $token: String!
          $password: String!
        ) {
          authPasswordReset(
            token: $token
            password: $password
          )
        }
      `,
      variables: {
        token,
        password,
      },
    });

    return response.data.authPasswordReset;
  }

  static async verifyEmail(token) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_VERIFY_EMAIL($token: String!) {
          authVerifyEmail(token: $token)
        }
      `,
      variables: {
        token,
      },
    });

    return response.data.authPasswordReset;
  }
}
