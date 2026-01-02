import ProfileForm from "@/components/profile/profile-form";
import { User, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your Open Source Connect Global profile.",
};

const ProfilePage = () => {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="max-w-2xl mx-auto mb-16 text-center px-6">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
                    Profile <span className="text-accent-gradient">Settings</span>
                </h1>
            </div>

            <ProfileForm />
        </main>
    );
};

export default ProfilePage;
