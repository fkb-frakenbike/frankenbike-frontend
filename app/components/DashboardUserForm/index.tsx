"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import api from '../../lib/axios';
import { useAuth } from "@/app/context/AuthContext";
import TextLoader from "../TextLoader/TextLoader";

type Profile = {
  firstName: string;
  photoUrl?: string | null;
  coverPhotoUrl?: string | null;
  birthdate?: string | null;  // ✅ minuscule comme entity
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
  const [birthDate, setBirthDate] = useState("");  // YYYY-MM-DD pour <input type="date">
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePreview, setProfilePreview] = useState("/SvgSite/defaultProfilePic.png");
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("/bikeCustom.png");
  const { auth, loading: authLoading } = useAuth();

  // ✅ formatDate : transforme n'importe quel format → YYYY-MM-DD
  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "";
    
    console.log("formatDate input:", dateStr);
    
    // Si déjà YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const result = dateStr.split('T')[0];  // enlève l'heure si présente
      console.log("→ déjà bon format:", result);
      return result;
    }
    
    // Fallback universel
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      const result = date.toISOString().split('T')[0];
      console.log("→ new Date() →", result);
      return result;
    }
    
    console.warn("Format inconnu:", dateStr);
    return "";
  };

  // Fetch profil
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<ProfileData>("/api/me");
        const userData = res.data;
        setProfile(userData);

        console.log("RAW birthdate:", userData.user.profile?.birthdate);

        // Initialise ✅
        setFirstName(userData.user.profile?.firstName || "");
        setBirthDate(formatDate(userData.user.profile?.birthdate));  // ✅
        setEmail(userData.user.email || "");
        setProfilePreview(userData.user.profile?.photoUrl || "/SvgSite/defaultProfilePic.png");
        setCoverPreview(userData.user.profile?.coverPhotoUrl || "/bikeCustom.png");
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
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
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

    let photoTimestamp = Date.now();
    if (newProfileFile) {
      const photoFormData = new FormData();
      photoFormData.append('photo', newProfileFile);
      await api.post("/api/me/photo", photoFormData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      photoTimestamp = Date.now();
    }

    // ✅ Refetch avec token
    const meRes = await api.get<ProfileData>("/api/me", {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    const userData = meRes.data;
    setProfile(userData);

    setFirstName(userData.user.profile?.firstName || "");
    setBirthDate(formatDate(userData.user.profile?.birthdate));
    setEmail(userData.user.email || "");
    
    const finalPhotoUrl = (userData.user.profile?.photoUrl || "/SvgSite/defaultProfilePic.png") + `?t=${photoTimestamp}`;
    setProfilePreview(finalPhotoUrl);

    alert("Profil sauvegardé !");
  } catch (err: unknown) {  // ✅ unknown au lieu de any
    // Type guard pour AxiosError
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
      <section className="py-10 my-auto dark:bg-gray-900 mt-16 md:mt-24">
        <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4 mt-6">
          <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div>
              <h1 className="lg:text-3xl md:text-2xl text-xl font-serif font-extrabold mb-1 text-white">
                Profil de {user?.profile?.firstName || "utilisateur"}
              </h1>
              <p className="text-gray-300 text-sm mb-4">
                Connecté en tant que : <span className="font-semibold">{user?.profile?.firstName}</span>
              </p>

              <form onSubmit={handleSubmit}>
                {/* Cover + Avatar */}
                <div className="w-full rounded-sm relative h-52 overflow-hidden">
                  <Image src={coverPreview} alt="Cover" fill sizes="100vw" style={{ objectFit: "cover" }} />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="relative w-[141px] h-[141px] rounded-full overflow-hidden bg-blue-300/20">
                      <Image  key={profilePreview} src={profilePreview} alt="Profile" fill sizes="141px" style={{ objectFit: "cover" }} />
                      <div className="bg-white/90 rounded-full w-6 h-6 absolute top-2 right-2">
                        <input
                          type="file"
                          id="upload_profile"
                          hidden
                          accept="image/*"
                          onChange={handleProfileChange}
                        />
                        <label htmlFor="upload_profile" className="cursor-pointer inline-flex items-center justify-center w-full h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <input type="file" id="upload_cover" hidden accept="image/*" onChange={handleCoverChange} />
                    <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 font-semibold cursor-pointer">
                      <label htmlFor="upload_cover" className="inline-flex items-center gap-1">Cover</label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                  <div className="w-full mb-4 mt-6">
                    <label htmlFor="firstName" className="mb-2 block text-white">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="email" className="mb-2 block text-white">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      value={email}
                      disabled
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="birthdate" className="mb-2 block text-white">Date de naissance</label>
                    <input
                      id="birthdate"
                      type="date"
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full p-4 mt-4 rounded-lg bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
