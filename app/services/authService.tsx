import axiosConfig from '@/axios-config';
import axios from 'axios';


class AuthService {
    userProfile: any;

  async signup(signupForm: any) {
    try {
      const response = await axiosConfig.post(`/auth/register`, signupForm);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }

  async emailVerification(OTPForm: any) {
    try {
      const response = await axiosConfig.post(`/auth/confirm-email`, OTPForm);
      return response.data;
    } catch (error) {
      console.error('Error during email verification:', error);
      throw error;
    }
  }

  async resetPassword(email: any) {
    try {
      const response = await axiosConfig.post(`/auth/reset-password`, { email });
      return response.data;
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  async verifyResetRequest(id: any, token: any) {
    try {
      const response = await axiosConfig.get(`/authverify-reset-link`, {
        params: { id, token },
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying reset request:', error);
      throw error;
    }
  }

  async changePassword(password: any, id: any) {
    try {
      const response = await axiosConfig.patch(`/auth/change-password/${id}`, { password });
      return response.data;
    } catch (error) {
      console.error('Error during password change:', error);
      throw error;
    }
  }

  async login(loginFormValue: any) {
    try {
      const response = await axiosConfig.post(`/auth/login`, loginFormValue);
      return response.data;
    } catch (error: any) {
      console.error('Error during login:', error.message);
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await axiosConfig.get(`/auth/profile`);
      this.userProfile = response.data; // Update user profile
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async logout() {
    try {
      const token = localStorage.getItem('token'); // Adjust for your token storage
      const response = await axiosConfig.post(`/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.userProfile = null; // Clear user profile on logout
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async passwordReset(currentPassword: any, newPassword: any) {
    try {
      const response = await axiosConfig.post(`/auth/change-password`, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  async verifyMFA(mfaData: any) {
    try {
      const response = await axiosConfig.post(`/auth/verify-mfa`, mfaData);
      return response.data;
    } catch (error) {
      console.error('Error during MFA verification:', error);
      throw error;
    }
  }

  async resendCode(email: any) {
    try {
      const response = await axiosConfig.get(`/auth/resend-code/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error during code resend:', error);
      throw error;
    }
  }

  async updateMfaSettings(settings: any) {
    try {
      const response = await axiosConfig.post(`/auth/mfa-settings`, settings);
      return response.data;
    } catch (error) {
      console.error('Error updating MFA settings:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const response = await axiosConfig.get(`/auth/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getPlans() {
    try {
      const response = await axiosConfig.get(`/plans`);
      return response.data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }

  async resendInvitation(organizationId: any, recipientId: any) {
    try {
      const response = await axiosConfig.post(`/auth/resend-invitation/${organizationId}/${recipientId}`, {});
      return response.data;
    } catch (error) {
      console.error('Error resending invitation:', error);
      throw error;
    }
  }

  async updateProfile(profile: any) {
    try {
      const response = await axiosConfig.patch(`/auth/profile`, profile);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
}

export default new AuthService();
