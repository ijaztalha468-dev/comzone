import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../../services/profileservice";

const fieldClass = "p-2.5 border border-[var(--border)] rounded-lg";
const labelClass = "text-[13px] text-[var(--text-muted)] mt-2";
const btnClass = "mt-3.5 p-2.5";

export default function Settings() {
  const [loading, setLoading] = useState(true);

  // Profile (Name/Email) form
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await getProfile();
        setProfileForm({
          name: result.user.Name,
          email: result.user.Email,
        });
      } catch (error) {
        console.error("Load Profile Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleProfileChange(e) {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");

    try {
      await updateProfile(profileForm);
      setProfileMsg("Profile updated successfully.");
    } catch (error) {
      console.error("Update Profile Error:", error);
      setProfileMsg(error.response?.data?.message || "Update nahi ho saka.");
    } finally {
      setSavingProfile(false);
    }
  }

  function handlePasswordChange(e) {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    setPasswordMsg("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg("New password aur Confirm password match nahi karte.");
      return;
    }

    setSavingPassword(true);

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordMsg("Password changed successfully.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Change Password Error:", error);
      setPasswordMsg(error.response?.data?.message || "Password change nahi ho saka.");
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) {
    return <h2 className="h-[60vh] flex justify-center items-center text-[var(--red)]">Loading...</h2>;
  }

  return (
    <div className="max-w-[450px]">
      <h1>Settings</h1>

      {/* Name / Email */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 mb-6">
        <h2>Account Information</h2>

        <form className="flex flex-col gap-1.5" onSubmit={handleProfileSubmit}>
          <label className={labelClass}>Username</label>
          <input
            className={fieldClass}
            type="text"
            name="name"
            placeholder="Name"
            value={profileForm.name}
            onChange={handleProfileChange}
          />

          <label className={labelClass}>Email</label>
          <input
            className={fieldClass}
            type="email"
            name="email"
            placeholder="Email"
            value={profileForm.email}
            onChange={handleProfileChange}
          />

          <button className={btnClass} type="submit" disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {profileMsg && <p className="mt-2.5 text-[var(--success)]">{profileMsg}</p>}
      </div>

      {/* Password Change */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 mb-6">
        <h2>Change Password</h2>

        <form className="flex flex-col gap-1.5" onSubmit={handlePasswordSubmit}>
          <label className={labelClass}>Current Password</label>
          <input
            className={fieldClass}
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
          />

          <label className={labelClass}>New Password</label>
          <input
            className={fieldClass}
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
          />

          <label className={labelClass}>Confirm New Password</label>
          <input
            className={fieldClass}
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
          />

          <button className={btnClass} type="submit" disabled={savingPassword}>
            {savingPassword ? "Saving..." : "Change Password"}
          </button>
        </form>

        {passwordMsg && <p className="mt-2.5 text-[var(--success)]">{passwordMsg}</p>}
      </div>
    </div>
  );
}
