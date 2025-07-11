import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, User, Briefcase, MapPin, Mail, Phone, Globe, Award, Calendar } from "lucide-react";
import { BarLoader } from "react-spinners";

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    company: "",
    position: "",
    experience: "",
    skills: "",
    education: "",
    achievements: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        location: user.unsafeMetadata?.location || "",
        website: user.unsafeMetadata?.website || "",
        bio: user.unsafeMetadata?.bio || "",
        company: user.unsafeMetadata?.company || "",
        position: user.unsafeMetadata?.position || "",
        experience: user.unsafeMetadata?.experience || "",
        skills: user.unsafeMetadata?.skills || "",
        education: user.unsafeMetadata?.education || "",
        achievements: user.unsafeMetadata?.achievements || "",
      });
      setImagePreview(user.imageUrl);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Update user metadata
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          location: profileData.location,
          website: profileData.website,
          bio: profileData.bio,
          company: profileData.company,
          position: profileData.position,
          experience: profileData.experience,
          skills: profileData.skills,
          education: profileData.education,
          achievements: profileData.achievements,
        }
      });

      // Update profile image if changed
      if (profileImage) {
        await user.setProfileImage({ file: profileImage });
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  const isRecruiter = user?.unsafeMetadata?.role === "recruiter";

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      <div className="text-center slide-up">
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl mb-2">
          My Profile
        </h1>
        <p className="text-gray-400">Manage your professional information</p>
      </div>

      {/* Profile Header Card */}
      <Card className="glass-effect border-0 hover-lift slide-up stagger-1">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer transition-colors duration-300 group-hover:scale-110">
                  <Camera size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-3xl font-bold text-white">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-blue-400 font-medium">
                {isRecruiter ? "Recruiter" : "Job Seeker"}
              </p>
              {profileData.position && (
                <p className="text-gray-300">{profileData.position}</p>
              )}
              {profileData.company && (
                <p className="text-gray-400">at {profileData.company}</p>
              )}
            </div>

            {/* Action Button */}
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button onClick={handleSave} variant="blue" className="hover-lift">
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)} 
                    variant="outline"
                    className="hover-lift"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="blue"
                  className="hover-lift"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="glass-effect border-0 hover-lift slide-up stagger-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-title">
            <Mail size={20} />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input
                value={profileData.email}
                disabled
                className="glass-effect border-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone size={16} />
                Phone
              </Label>
              <Input
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                placeholder="Your phone number"
                className="glass-effect border-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin size={16} />
                Location
              </Label>
              <Input
                value={profileData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                disabled={!isEditing}
                placeholder="Your location"
                className="glass-effect border-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe size={16} />
                Website
              </Label>
              <Input
                value={profileData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                disabled={!isEditing}
                placeholder="Your website or portfolio"
                className="glass-effect border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="glass-effect border-0 hover-lift slide-up stagger-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-title">
            <Briefcase size={20} />
            Professional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isRecruiter ? (
            <>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={profileData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your company name"
                  className="glass-effect border-0"
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={profileData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your job title"
                  className="glass-effect border-0"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Current Position</Label>
                  <Input
                    value={profileData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Your current job title"
                    className="glass-effect border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar size={16} />
                    Experience
                  </Label>
                  <Input
                    value={profileData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Years of experience"
                    className="glass-effect border-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Skills</Label>
                <Textarea
                  value={profileData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  disabled={!isEditing}
                  placeholder="List your key skills (comma separated)"
                  className="glass-effect border-0 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Education</Label>
                <Input
                  value={profileData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Your highest education"
                  className="glass-effect border-0"
                />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              placeholder={isRecruiter ? "Tell us about your company and recruiting experience..." : "Tell us about yourself and your career goals..."}
              className="glass-effect border-0 min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Achievements (for candidates) */}
      {!isRecruiter && (
        <Card className="glass-effect border-0 hover-lift slide-up stagger-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 gradient-title">
              <Award size={20} />
              Achievements & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Achievements</Label>
              <Textarea
                value={profileData.achievements}
                onChange={(e) => handleInputChange("achievements", e.target.value)}
                disabled={!isEditing}
                placeholder="List your achievements, certifications, awards..."
                className="glass-effect border-0 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;