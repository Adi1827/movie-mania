import { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        avatar: '',
        phone: '',
        location: '',
        website: ''
    });

    // Simulate fetching user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace this with your actual API call
                // const response = await fetch('/api/user/profile');
                // const userData = await response.json();

                // Mock data for demonstration
                const userData = {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    bio: 'Full-stack developer passionate about creating innovative web solutions. Experienced in React, Node.js, and modern web technologies.',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    phone: '+1 (555) 123-4567',
                    location: 'San Francisco, CA',
                    website: 'https://johndoe.dev',
                    joinDate: '2023-01-15',
                    projects: 24,
                    experience: '5+ years'
                };

                setUser(userData);
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    bio: userData.bio,
                    avatar: userData.avatar,
                    phone: userData.phone,
                    location: userData.location,
                    website: userData.website
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Replace with your actual API call
            // const response = await fetch('/api/user/profile', {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // });

            // Mock update
            setUser(prev => ({
                ...prev,
                ...formData
            }));

            setEditing(false);
            // You might want to use a toast notification instead of alert
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            phone: user.phone,
            location: user.location,
            website: user.website
        });
        setEditing(false);
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mx-auto mb-6"></div>
                            <h2 className="text-2xl font-bold text-white mb-2">Loading Profile...</h2>
                            <p className="text-gray-400">Please wait while we fetch your information</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center">
                            <div className="text-red-500 mb-6">
                                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Error Loading Profile</h2>
                            <p className="text-gray-400 mb-6">We couldn't load your profile information.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        User <span className="text-blue-500">Profile</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Manage your personal information and account settings
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 relative">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-8">
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200?text=No+Image';
                                    }}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                                />
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.name}</h2>
                                <p className="text-blue-100 text-lg mb-4">{user.email}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {user.projects} Projects
                                    </span>
                                    <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {user.experience} Experience
                                    </span>
                                </div>
                            </div>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {editing ? (
                            /* Edit Form */
                            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Profile Picture URL
                                            </label>
                                            <input
                                                type="url"
                                                name="avatar"
                                                value={formData.avatar}
                                                onChange={handleInputChange}
                                                placeholder="Enter image URL"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 123-4567"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="City, State/Country"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Website
                                            </label>
                                            <input
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                placeholder="https://yourwebsite.com"
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                rows="6"
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-gray-700">
                                    <button
                                        type="submit"
                                        disabled={loading}



                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex-1 text-center"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex-1 text-center"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Display Mode */
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Full Name</h3>
                                        <p className="text-white text-lg">{user.name}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Email</h3>
                                        <p className="text-white text-lg">{user.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Phone</h3>
                                        <p className="text-white text-lg">{user.phone}</p>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Location</h3>
                                        <p className="text-white text-lg">{user.location}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Website</h3>
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline break-all"
                                        >
                                            {user.website}
                                        </a>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 font-semibold text-sm mb-1">Bio</h3>
                                        <p className="text-white whitespace-pre-line">{user.bio}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
