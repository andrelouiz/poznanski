import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import axiosPublic from 'axios'; // Assuming you have axios configured for public requests

const UserProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // image hosting keys
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // on submit form
    const onSubmit = async (data) => {
        try {
            // image upload to imgbb and then get an URL
            const imageFile = { image: data.photoURL[0] };
            const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });

            // Assuming hostingImg.data contains the uploaded image URL
            const uploadedPhotoURL = hostingImg.data.data.url;

            // Update user profile with the uploaded photo URL
            await updateUserProfile(data.name, uploadedPhotoURL);

            // Profile updated successfully
            alert('Profile updated successfully');
        } catch (error) {
            // An error occurred
            alert('Failed to update profile. Please try again later.');
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="h-screen max-w-md mx-auto flex items-center justify-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name')} placeholder="Your name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input type="file" {...register('photoURL')} className="file-input w-full mt-1" />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Update" className="btn bg-red text-white" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
