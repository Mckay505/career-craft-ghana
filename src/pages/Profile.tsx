import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import Header from "@/components/sections/Header";
import Watermark from "@/components/layout/Watermark";
import { X } from "lucide-react";

interface Profile {
  full_name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  graduation_year: number;
  skills: string[];
  certificates: string[];
  work_experience: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    email: '',
    phone: '',
    university: '',
    degree: '',
    graduation_year: new Date().getFullYear(),
    skills: [],
    certificates: [],
    work_experience: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newCertificate, setNewCertificate] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        loadProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        university: data.university || '',
        degree: data.degree || '',
        graduation_year: data.graduation_year || new Date().getFullYear(),
        skills: data.skills || [],
        certificates: data.certificates || [],
        work_experience: data.work_experience || ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        ...profile
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Saved",
        description: "Your information has been updated successfully.",
      });
    }

    setIsLoading(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addCertificate = () => {
    if (newCertificate.trim() && !profile.certificates.includes(newCertificate.trim())) {
      setProfile(prev => ({
        ...prev,
        certificates: [...prev.certificates, newCertificate.trim()]
      }));
      setNewCertificate('');
    }
  };

  const removeCertificate = (certificate: string) => {
    setProfile(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c !== certificate)
    }));
  };

  const proceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Provide your details so we can create your perfect CV and resume
            </p>
          </div>

          <Card className="shadow-elegant border-0">
            <CardHeader>
              <CardTitle>Personal & Academic Information</CardTitle>
              <CardDescription>
                The more details you provide, the better your CV will be
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+233 24 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University *</Label>
                    <Input
                      id="university"
                      value={profile.university}
                      onChange={(e) => setProfile(prev => ({ ...prev, university: e.target.value }))}
                      placeholder="University of Ghana"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Program *</Label>
                    <Input
                      id="degree"
                      value={profile.degree}
                      onChange={(e) => setProfile(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="Bachelor of Science in Computer Science"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduation">Graduation Year *</Label>
                    <Input
                      id="graduation"
                      type="number"
                      min="2020"
                      max="2030"
                      value={profile.graduation_year}
                      onChange={(e) => setProfile(prev => ({ ...prev, graduation_year: parseInt(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill (e.g., JavaScript, Marketing)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Certificates & Achievements</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newCertificate}
                      onChange={(e) => setNewCertificate(e.target.value)}
                      placeholder="Add a certificate or achievement"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertificate())}
                    />
                    <Button type="button" onClick={addCertificate}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.certificates.map((cert, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {cert}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeCertificate(cert)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Work Experience (Optional)</Label>
                  <Textarea
                    id="experience"
                    value={profile.work_experience}
                    onChange={(e) => setProfile(prev => ({ ...prev, work_experience: e.target.value }))}
                    placeholder="Describe any internships, part-time jobs, or volunteer work..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="outline"
                  >
                    {isLoading ? "Saving..." : "Save Profile"}
                  </Button>
                  <Button
                    type="button"
                    onClick={proceedToPayment}
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Watermark />
    </div>
  );
};

export default Profile;