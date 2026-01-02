"use client";

import { useState, useEffect } from "react";
import {
    User,
    Phone,
    Linkedin,
    Github,
    Globe,
    IdCard,
    Save,
    Loader2,
    Mail,
    Camera
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface ProfileData {
    full_name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    nexfellow_id: string;
    country: string;
    avatar_url?: string;
}

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
];

const ProfileForm = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState<ProfileData>({
        full_name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        nexfellow_id: "",
        country: "",
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUser(user);
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", user.id)
                        .single();

                    if (profile) {
                        setFormData({
                            full_name: profile.full_name || user.user_metadata?.full_name || "",
                            email: user.email || "",
                            phone: profile.phone || "",
                            linkedin: profile.linkedin || "",
                            github: profile.github || "",
                            nexfellow_id: profile.nexfellow_id || "",
                            country: profile.country || "",
                            avatar_url: profile.avatar_url,
                        });
                    } else {
                        setFormData(prev => ({
                            ...prev,
                            full_name: user.user_metadata?.full_name || "",
                            email: user.email || "",
                        }));
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        try {
            const { error } = await supabase.from("profiles").upsert({
                id: user.id,
                full_name: formData.full_name,
                phone: formData.phone,
                linkedin: formData.linkedin,
                github: formData.github,
                nexfellow_id: formData.nexfellow_id,
                country: formData.country,
                updated_at: new Date().toISOString(),
            });

            if (error) throw error;
            toast.success("Profile updated!");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-[#11D392] animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20">
            <form onSubmit={handleSave} className="space-y-8">
                <div className="bg-[#0B0F17]/50 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">

                    <div className="h-32 bg-linear-to-br from-[#11D392]/10 to-transparent flex items-center px-10 gap-8 border-b border-white/5">
                        <div className="relative group/avatar">
                            <div className="absolute -inset-1 bg-linear-to-r from-[#11D392] to-[#2AAE6F] rounded-full blur opacity-20 group-hover/avatar:opacity-40 transition duration-500" />
                            <Avatar className="w-20 h-20 relative">
                                <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${formData.email}`} />
                                <AvatarFallback className="bg-slate-800 text-xl font-bold text-white uppercase">
                                    {formData.full_name?.[0] || user?.email?.[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-black text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform cursor-default">
                                {formData.full_name || "New User"}
                            </h2>
                            <p className="text-white/40 text-sm font-medium mt-2 flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" />
                                {formData.email}
                            </p>
                        </div>
                    </div>

                    <div className="p-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="full_name" className="text-sm font-medium text-white/80 tracking-tight">Full Name</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors" />
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="bg-transparent border-white/10 pl-11 h-12 text-white focus:border-[#11D392]/50 transition-all rounded-xl [box-shadow:0_0_0_30px_#0B0F17_inset_!important] [text-fill-color:white_!important]"
                                        placeholder="Your display name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-sm font-medium text-white/80 tracking-tight">Phone Number</Label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-transparent border-white/10 pl-11 h-12 text-white focus:border-[#11D392]/50 transition-all rounded-xl [box-shadow:0_0_0_30px_#0B0F17_inset_!important] [text-fill-color:white_!important]"
                                        placeholder="Your contact number"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="country" className="text-sm font-medium text-white/80 tracking-tight">Country</Label>
                                <div className="relative group">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors z-10" />
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full h-12 cursor-pointer bg-transparent border border-white/10 rounded-xl pl-11 pr-4 text-sm font-medium text-white outline-none focus:border-[#11D392]/50 transition-all appearance-none"
                                    >
                                        <option value="" disabled className="bg-[#0B0F17]">Select your country</option>
                                        {COUNTRIES.map(country => (
                                            <option key={country} value={country} className="bg-[#0B0F17]">{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className="space-y-3">
                                <Label htmlFor="linkedin" className="text-sm font-medium text-white/80 tracking-tight">LinkedIn URL</Label>
                                <div className="relative group">
                                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors" />
                                    <Input
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="bg-transparent border-white/10 pl-11 h-12 text-white focus:border-[#11D392]/50 transition-all rounded-xl [box-shadow:0_0_0_30px_#0B0F17_inset_!important] [text-fill-color:white_!important]"
                                        placeholder="linkedin.com/in/username"
                                    />
                                </div>
                            </div>


                            <div className="space-y-3">
                                <Label htmlFor="github" className="text-sm font-medium text-white/80 tracking-tight">GitHub Username</Label>
                                <div className="relative group">
                                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors" />
                                    <Input
                                        id="github"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        className="bg-transparent border-white/10 pl-11 h-12 text-white focus:border-[#11D392]/50 transition-all rounded-xl [box-shadow:0_0_0_30px_#0B0F17_inset_!important] [text-fill-color:white_!important]"
                                        placeholder="Your GitHub handle"
                                    />
                                </div>
                            </div>


                            <div className="space-y-3">
                                <Label htmlFor="nexfellow_id" className="text-sm font-medium text-white/80 tracking-tight">NexFellow ID</Label>
                                <div className="relative group">
                                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#11D392] transition-colors" />
                                    <Input
                                        id="nexfellow_id"
                                        name="nexfellow_id"
                                        value={formData.nexfellow_id}
                                        onChange={handleChange}
                                        className="bg-transparent border-white/10 pl-11 h-12 text-white focus:border-[#11D392]/50 transition-all rounded-xl [box-shadow:0_0_0_30px_#0B0F17_inset_!important] [text-fill-color:white_!important]"
                                        placeholder="Your community ID"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="h-12 px-10 cursor-pointer bg-linear-to-r from-[#11D392] to-[#2AAE6F] hover:from-[#0eb87f] hover:to-[#22925b] text-[#090E1A] font-black text-lg rounded-2xl transition-all shadow-[0_8px_30px_rgba(17,211,146,0.3)] hover:shadow-[0_12px_40px_rgba(17,211,146,0.4)] "
                            >
                                {saving ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Updating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Save className="w-5 h-5" />
                                        <span>Update Profile</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
