import { getAboutUser } from "@/config/redux/action/authAction";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { BASE_URL, clientServer } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";

export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.posts);
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const [inputData, setInputData] = useState({
    company: "",
    position: "",
    years: "",
  });
  const [educationInputData, setEducationInputData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
  });

  const handleWorkInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleEducationInputChange = (e) => {
    const { name, value } = e.target;
    setEducationInputData({ ...educationInputData, [name]: value });
  };

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (authState.user) {
      setUserProfile(authState.user.userProfile);
      let post = postReducer.posts.filter((post) => {
        return (
          post.userId.username === authState.user.userProfile.userId.username
        );
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      "/update_profile_picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    if (response.status === 200) {
      alert("Profile picture updated successfully");
    } else {
      alert("Failed to update profile picture");
    }
  };

  const updateProfileData = async () => {
    const request = await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    });

    const response = await clientServer.post("/update_profile_data", {
      token: localStorage.getItem("token"),
      bio: userProfile.bio,
      currentPost: userProfile.currentPost,
      pastWork: userProfile.pastWork,
      education: userProfile.education,
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    if (request.status === 200 && response.status === 200) {
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId && (
          <div className={styles.container}>
            <div className={styles.backDropContainer}>
              <label
                htmlFor="profilePictureUpload"
                className={styles.backDrop_overlay}
              >
                <p style={{ fontSize: "20px" }}>Edit</p>
              </label>
              <input
                onChange={(e) => {
                  updateProfilePicture(e.target.files[0]);
                }}
                hidden
                type="file"
                id="profilePictureUpload"
              ></input>
              <img
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt="Profile"
              ></img>
            </div>

            <div className={styles.profileContainer_deatails}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <input
                      className={styles.nameEdit}
                      type="text"
                      value={userProfile.userId.name}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          userId: {
                            ...userProfile.userId,
                            name: e.target.value,
                          },
                        });
                      }}
                    ></input>
                    <p style={{ color: "gray" }}>
                      @{userProfile.userId.username}
                    </p>
                  </div>

                  <div>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => {
                        setUserProfile({ ...userProfile, bio: e.target.value });
                      }}
                      rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                      style={{ width: "100%" }}
                    ></textarea>
                  </div>
                </div>

                <div style={{ flex: "0.2" }}>
                  <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return (
                      <div key={post.id} className={styles.postcard}>
                        <div className={styles.card}>
                          <div className={styles.card_profileContainer}>
                            {post.media !== "" ? (
                              <img
                                src={`${BASE_URL}/${post.media}`}
                                alt=""
                              ></img>
                            ) : (
                              <div
                                style={{ width: "3.4rem", height: "3.4rem" }}
                              ></div>
                            )}
                            <div className={styles.card_body}>
                              <p>{post.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="workHistory">
              <h4>Work History</h4>

              <div className={styles.workHistoryContainer}>
                {userProfile.pastWork.map((work, index) => {
                  return (
                    <div key={index} className={styles.workHistoryCard}>
                      <p
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {work.company} - {work.position}
                      </p>
                      <p>{work.years}</p>
                    </div>
                  );
                })}

                <button
                  className={styles.addWorkButton}
                  onClick={() => {
                    setIsWorkModalOpen(true);
                  }}
                >
                  Add Work
                </button>
              </div>
            </div>

            <div className="educationHistory">
              <h4>Education History</h4>

              <div className={styles.educationHistoryContainer}>
                {userProfile.education.map((edu, index) => {
                  return (
                    <div key={index} className={styles.educationHistoryCard}>
                      <p
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {edu.school} - {edu.degree}
                      </p>
                      <p>{edu.fieldOfStudy}</p>
                    </div>
                  );
                })}

                <button
                  className={styles.addEducationButton}
                  onClick={() => {
                    setIsEducationModalOpen(true);
                  }}
                >
                  Add Education
                </button>
              </div>
            </div>

            {userProfile != authState.user && (
              <div
                onClick={() => {
                  updateProfileData();
                }}
                className={styles.updateProfileBtn}
              >
                Update Profile
              </div>
            )}
          </div>
        )}

        {isWorkModalOpen && (
          <div
            onClick={() => {
              setIsWorkModalOpen(false);
            }}
            className={styles.commentContainer}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={styles.allCommentsContainer}
            >
              <input
                onChange={handleWorkInputChange}
                name="company"
                className={styles.inputField}
                type="text"
                placeholder="Enter Company"
              />
              <input
                onChange={handleWorkInputChange}
                name="position"
                className={styles.inputField}
                type="text"
                placeholder="Enter Position"
              />
              <input
                onChange={handleWorkInputChange}
                name="years"
                className={styles.inputField}
                type="number"
                placeholder="Years"
              />
              <div
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    pastWork: [
                      ...userProfile.pastWork,
                      {
                        company: inputData.company,
                        position: inputData.position,
                        years: inputData.years,
                      },
                    ],
                  });
                  setIsWorkModalOpen(false);
                }}
                className={styles.updateProfileBtn}
              >
                Add Work
              </div>
            </div>
          </div>
        )}

        {isEducationModalOpen && (
          <div
            onClick={() => {
              setIsEducationModalOpen(false);
            }}
            className={styles.commentContainer}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={styles.allCommentsContainer}
            >
              <input
                onChange={handleEducationInputChange}
                name="school"
                className={styles.inputField}
                type="text"
                placeholder="Enter School"
              />
              <input
                onChange={handleEducationInputChange}
                name="degree"
                className={styles.inputField}
                type="text"
                placeholder="Enter Degree"
              />
              <input
                onChange={handleEducationInputChange}
                name="fieldOfStudy"
                className={styles.inputField}
                type="text"
                placeholder="Enter Field of Study"
              />
              <div
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    education: [
                      ...userProfile.education,
                      {
                        school: educationInputData.school,
                        degree: educationInputData.degree,
                        fieldOfStudy: educationInputData.fieldOfStudy,
                      },
                    ],
                  });
                  setIsEducationModalOpen(false);
                }}
                className={styles.updateProfileBtn}
              >
                Add Education
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}
