"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import api from '../../lib/axios';
import { useAuth } from "@/app/context/AuthContext";
import TextLoader from "../TextLoader/TextLoader";

type Profile = {
  firstName: string;
  photoUrl?: string | null;
  birthdate?: string | null;
};

type User = {
  id: number;
  email: string;
  profile: Profile;
};

type ProfileData = {
  user: User;
};

export default function UserDashboardComponent() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePreview, setProfilePreview] = useState("/SvgSite/defaultProfilePic.png");
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [imageKey, setImageKey] = useState(0);  // ✅ Key unique pour forcer Image re-render
  const { auth, loading: authLoading } = useAuth();

  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      return dateStr.split('T')[0];
    }
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<ProfileData>("/api/me");
        const userData = res.data;
        setProfile(userData);
        setFirstName(userData.user.profile?.firstName || "");
        setBirthDate(formatDate(userData.user.profile?.birthdate));
        setEmail(userData.user.email || "");
        // ✅ Cache-bust + UUID pour image S3/CDN
        const photoUrl = userData.user.profile?.photoUrl;
        setProfilePreview(photoUrl 
          ? `${photoUrl}?v=${crypto.randomUUID()}` 
          : "/SvgSite/defaultProfilePic.png"
        );
      } catch (err: unknown) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        setError(axiosError?.response?.data?.error || "Erreur");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user) {
      fetchProfile();
    }
  }, [auth?.user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProfileFile(file);
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    setImageKey(prev => prev + 1);  // ✅ Incrémente key pour preview
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateRes = await api.put("/api/me", { 
        firstName, 
        email, 
        birthdate: birthDate || null 
      });

      let authToken = localStorage.getItem('token') || '';
      if (updateRes.data.token) {
        localStorage.setItem('token', updateRes.data.token);
        authToken = updateRes.data.token;
      }

      if (newProfileFile) {
        const photoFormData = new FormData();
        photoFormData.append('photo', newProfileFile);
        await api.post("/api/me/photo", photoFormData, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
      }

      // ✅ Refetch + cache-bust AGRESSIF + nouvelle key
      const meRes = await api.get<ProfileData>("/api/me", {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      const userData = meRes.data;
      setProfile(userData);
      setFirstName(userData.user.profile?.firstName || "");
      setBirthDate(formatDate(userData.user.profile?.birthdate));
      setEmail(userData.user.email || "");
      
      const photoUrl = userData.user.profile?.photoUrl;
      setProfilePreview(photoUrl 
        ? `${photoUrl}?v=${crypto.randomUUID()}`  // ✅ UUID unique à CHAQUE refetch
        : "/SvgSite/defaultProfilePic.png"
      );
      setImageKey(prev => prev + 1);  // ✅ Force Image à re-render

      alert("Profil sauvegardé !");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      const errorMsg = axiosError?.response?.data?.error || "Erreur sauvegarde";
      setError(errorMsg);
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="fkb-bg-diagonal min-h-screen flex items-center justify-center">
        <TextLoader text="Profil" className="fade font-main text-3xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fkb-bg-diagonal min-h-screen flex items-center justify-center">
        <p className="text-center text-red-300 text-xl">{error}</p>
      </div>
    );
  }

  const user = profile?.user;

 return (
  <div className="fkb-bg-diagonal min-h-screen flex flex-col">
    {/* ✅ Supprime section + shadow → fond direct */}
    <div className="py-10 my-auto mt-16 md:mt-24">
      <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4 mt-6">
        {/* ✅ Pas de shadow-2xl + transparence subtile */}
        <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto p-8 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 h-fit self-center">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-1 text-white drop-shadow-md">
              Profil de {user?.profile?.firstName || "utilisateur"}
            </h1>
            <p className="text-gray-300 text-sm mb-4 drop-shadow-sm">
              Connecté en tant que : <span className="font-semibold">{user?.profile?.firstName}</span>
            </p>

            <form onSubmit={handleSubmit}>
           <div className="w-full rounded-sm relative h-52 overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center">
                <div key={imageKey} className="relative w-[141px] h-[141px] rounded-full overflow-hidden bg-blue-300/20 cursor-pointer hover:ring-4 hover:ring-blue-500/50 transition-all">
                  <Image 
                    src={profilePreview} 
                    alt="Profile - Cliquez pour changer" 
                    fill 
                    sizes="141px" 
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  
                  {/* ✅ Input + label CACHÉS sur TOUT l'avatar */}
                  <input
                    type="file"
                    id="upload_profile"
                    hidden
                    accept="image/*"
                    onChange={handleProfileChange}
                  />
                  <label 
                    htmlFor="upload_profile" 
                    className="absolute inset-0 cursor-pointer rounded-full"  // ✅ Clic partout sur image
                  />
                </div>
              </div>
            </div>

              {/* ✅ Inputs intégrés sans bordure épaisse */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                  <label htmlFor="firstName" className="mb-2 block text-white text-sm font-medium">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full p-4 border border-white/30 rounded-xl bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="email" className="mb-2 block text-white text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-4 border border-white/30 rounded-xl bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all opacity-70 cursor-not-allowed"
                    value={email}
                    disabled
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="birthdate" className="mb-2 block text-white text-sm font-medium">
                    Date de naissance
                  </label>
                  <input
                    id="birthdate"
                    type="date"
                    className="w-full p-4 border border-white/30 rounded-xl bg-white/5 dark:bg-gray-900/30 backdrop-blur-sm text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 focus:outline-none transition-all"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-4 mt-8 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm border border-white/20"
                disabled={loading}
              >
                {loading ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
 