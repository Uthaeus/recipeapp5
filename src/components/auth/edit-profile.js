import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { updateDoc, doc } from "firebase/firestore";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

import { auth, db, storage } from "../../firebase";

import { UserContext } from "../../store/user-context";

import defaultAvatar from '../../assets/images/guest-icon-add.png';

export default function EditProfile() {
    const { user, updateUser } = useContext(UserContext);
    const [enteredAvatar,  setEnteredAvatar] = useState(null);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

    const avatar = enteredAvatar?.url ? enteredAvatar.url : defaultAvatar;

    useEffect(() => {
        reset(user);
        if (user.avatar?.url && user.avatar?.url !== null) {
            setEnteredAvatar({ url: user.avatar.url, file: null });
        }
    }, [user, reset]);

    const avatarChangeHandler = (event) => {
        const file = event.target.files[0];
        // create url object
        const url = URL.createObjectURL(file);
        setEnteredAvatar({ url, file });
    }

    const resetAvatarHandler = () => {
        if (user.avatar?.url && user.avatar?.url !== null) {
            setEnteredAvatar({ url: user.avatar.url, file: null });
        }
    }

    const deleteAvatarHandler = () => {
        setEnteredAvatar(null);
    }

    const reauthenticateUser = async (password) => {
        const credential = EmailAuthProvider.credential(user.email, password);
        try {
            await reauthenticateWithCredential(auth.currentUser, credential);

            return true;
        } catch (error) {
            console.log('reauthenticate user error:', error);
            setError('password', { type: 'custom', message: 'Incorrect password' });

            return false;
        }
    }

    const onSubmit = async (data) => {
        console.log('editing profile', data);

        try {
            let newAvatarUrl = null;
            let newAvatarFileName = null;

            const isAuthorized = await reauthenticateUser(data.password);

            if (!isAuthorized) {
                setError('password', { type: 'custom', message: 'Incorrect password' });

                return;
            }

            if (data.newPassword !== "") {
                
                if (data.newPassword !== data.confirmNewPassword) {
                    setError('confirmNewPassword', { type: 'custom', message: 'Passwords do not match' });
                    return;
                }
                if (data.newPassword.length < 6) {
                    setError('newPassword', { type: 'custom', message: 'Password must be at least 6 characters' });
                    return;
                }

                try {
                    await updatePassword(auth.currentUser, data.newPassword);
                } catch (error) {
                    console.error('update password error:', error);
                }
            }

            if (enteredAvatar?.url && enteredAvatar?.url !== user.avatar?.url) {

                if (user.avatar?.url && user.avatar.url !== null) {
                    console.log('current avatar:', user.avatar.url);

                    const oldAvatarFileName = user.avatar.fileName;

                    const oldAvatarRef = ref(storage, `avatars/${oldAvatarFileName}`);
                    await deleteObject(oldAvatarRef);
                }

                newAvatarFileName = enteredAvatar.file.name + Date.now();
                const avatarRef = ref(storage, `avatars/${newAvatarFileName}`);
                await uploadBytes(avatarRef, enteredAvatar.file);
                newAvatarUrl = await getDownloadURL(avatarRef);
            }

            if (user.username !== data.username || user.email !== data.email) {
                await updateProfile(auth.currentUser, {
                    displayName: data.username,
                    email: data.email
                });
            }

            const userObj = {
                username: data.username,
                email: data.email,
                avatar: {
                    url: newAvatarUrl,
                    fileName: newAvatarFileName
                }
            };

            await updateDoc(doc(db, "users", user.id), userObj);

            updateUser({ ...user, ...userObj });

            console.log('end of edit profile submit');

            navigate('/');

        } catch (error) {
            console.error('edit profile error:', error);
        }
        
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Edit Profile</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="row">
                    <div className="col-9">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            className="auth-input"
                            autoFocus={true}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="text-danger">Email is required</p>}

                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="auth-input"
                            {...register("username", { required: true })}
                        />
                        {errors.username && <p className="text-danger">Username is required</p>}

                    </div>
                    <div className="col-3">
                        <div className="auth-form-avatar-input-container" onClick={() => document.getElementById("avatar-input").click()}>
                            <img src={avatar} alt="avatar" className="auth-form-avatar" />
                            <input
                                type="file"
                                id="avatar-input"
                                className="d-none"
                                onChange={avatarChangeHandler}
                            />
                        </div>

                        <p className="reset-avatar-btn" onClick={resetAvatarHandler}>Reset Avatar</p>
                        <p className="reset-avatar-btn delete-avatar" onClick={deleteAvatarHandler}>Delete Avatar</p>
                    </div>
                </div>

                <input
                    type="password"
                    id="newPassword"
                    placeholder="New Password (leave blank if you don't want to change it)"
                    className="auth-input"
                    {...register("newPassword")}
                />
                {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}

                <input
                    type="password"
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    className="auth-input"
                    {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && <p className="text-danger">{errors.confirmNewPassword.message}</p>}

                <input 
                    type="password"
                    id="password"
                    placeholder="Enter Current Password to Update Profile"
                    className="auth-input"
                    {...register("password", { required: true })}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <button type="submit" className="auth-btn">Update Profile</button>
            </form>

            <Link to='/' className="auth-home-link">Return Home</Link>
        </div>
    )
}