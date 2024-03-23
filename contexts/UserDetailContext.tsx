"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

const UserDetailContext = createContext<any>(null);

export const UserDetailProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //! States

  const [followers, setFollowers] = useState([]);
  const [followersCount, setFollowersCount] = useState("");
  const [followings, setFollowings] = useState([]);
  const [followingsCount, setFollowingsCount] = useState("");
  const [intro, setIntro] = useState("");
  const [mainSkills, setMainSkills] = useState([]);
  const [complementarySkills, setComplementarySkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [userId, setUserId] = useState("")
  const [isFollowed, setIsFollowed] = useState<null | Boolean>(null)
  const [location, setLocation] = useState("")
  const [job, setJob] = useState("")

  const values = {
    followers: followers,
    setFollowers: setFollowers,
    followersCount: followersCount,
    setFollowersCount: setFollowersCount,
    followings: followings,
    setFollowings: setFollowings,
    followingsCount: followingsCount,
    setFollowingsCount: setFollowingsCount,
    intro: intro,
    setIntro: setIntro,
    mainSkills: mainSkills,
    setMainSkills: setMainSkills,
    complementarySkills: complementarySkills,
    setComplementarySkills: setComplementarySkills,
    interests: interests,
    setInterests: setInterests,
    experiences: experiences,
    setExperiences: setExperiences,
    educations: educations,
    setEducations: setEducations,
    languages: languages,
    setLanguages: setLanguages,
    firstName: firstName,
    setFirstName: setFirstName,
    lastName: lastName,
    setLastName: setLastName,
    email: email,
    setEmail: setEmail,
    username: username,
    setUsername: setUsername,
    avatar: avatar,
    setAvatar: setAvatar,
    cover: cover,
    setCover: setCover,
    userId: userId,
    setUserId: setUserId,
    isFollowed: isFollowed,
    setIsFollowed: setIsFollowed,
    location: location,
    setLocation: setLocation,
    job: job,
    setJob: setJob
  };

  return (
    <UserDetailContext.Provider value={values}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUserDetail must be used within an UserDetailProvider");
  }
  return context;
};
