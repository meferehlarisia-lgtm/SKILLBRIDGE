document.addEventListener(
    "DOMContentLoaded",
    function () {

        const application =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeSelectedApplication"
                )
            );


        const container =
            document.getElementById(
                "applicantProfile"
            );


        if (!application) {

            container.innerHTML = `

                <div class="empty-applications">

                    <i class="fa-solid fa-user-slash"></i>

                    <h2>
                        Applicant not found
                    </h2>

                    <p>
                        Return to applications and
                        select an applicant.
                    </p>

                </div>

            `;

            return;

        }


        /* ==========================================
           STUDENT DATA
        ========================================== */

        const skills =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeSkills"
                )
            ) || [];


        const experiences =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeExperiences"
                )
            ) || [];


        const activities =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeActivities"
                )
            ) || [];


        const projects =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeProjects"
                )
            ) || [];


        const certificates =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeCertificates"
                )
            ) || [];


        const learningSkills =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeLearningSkills"
                )
            ) || [];


        /* ==========================================
           SKILL HTML
        ========================================== */

        const skillsHTML =
            skills.length

                ? skills.map(
                    function (skill) {

                        const name =
                            typeof skill === "string"
                                ? skill
                                : skill.name;

                        const level =
                            typeof skill === "string"
                                ? ""
                                : skill.level;


                        return `

                            <div class="talent-skill">

                                <strong>
                                    ${name}
                                </strong>

                                <span>
                                    ${level}
                                </span>

                            </div>

                        `;

                    }
                ).join("")

                : `

                    <p class="empty-text">
                        No skills added yet.
                    </p>

                  `;


        /* ==========================================
           EXPERIENCE HTML
        ========================================== */

        const experienceHTML =
            experiences.length

                ? experiences.map(
                    function (experience) {

                        return `

                            <div class="talent-experience">

                                <div class="
                                    talent-experience-icon
                                ">

                                    <i class="
                                        fa-solid
                                        fa-briefcase
                                    "></i>

                                </div>


                                <div>

                                    <h4>
                                        ${
                                            experience.title ||
                                            "Experience"
                                        }
                                    </h4>

                                    <strong>
                                        ${
                                            experience.organization ||
                                            ""
                                        }
                                    </strong>

                                    <p>
                                        ${
                                            experience.description ||
                                            ""
                                        }
                                    </p>

                                    <small>

                                        ${
                                            experience.start ||
                                            ""
                                        }

                                        -

                                        ${
                                            experience.end ||
                                            "Present"
                                        }

                                    </small>

                                </div>

                            </div>

                        `;

                    }
                ).join("")

                : `

                    <p class="empty-text">
                        No experience recorded yet.
                    </p>

                  `;


        /* ==========================================
           ACTIVITY HTML
        ========================================== */

        const activityHTML =
            activities.length

                ? activities
                    .slice()
                    .reverse()
                    .map(
                        function (activity) {

                            return `

                                <div class="
                                    talent-activity
                                ">

                                    <div class="
                                        talent-activity-icon
                                    ">

                                        <i class="
                                            fa-solid
                                            fa-check
                                        "></i>

                                    </div>


                                    <div>

                                        <strong>
                                            ${
                                                activity.title
                                            }
                                        </strong>

                                        <p>

                                            ${
                                                activity.skill
                                            }

                                            ·

                                            ${
                                                activity.result
                                            }

                                        </p>

                                        <small>

                                            ${
                                                activity.date ||
                                                ""
                                            }

                                        </small>

                                    </div>

                                </div>

                            `;

                        }
                    ).join("")

                : `

                    <p class="empty-text">
                        No activities recorded yet.
                    </p>

                  `;


        /* ==========================================
           PROJECT HTML
        ========================================== */

        const projectHTML =
            projects.length

                ? projects.map(
                    function (project) {

                        return `

                            <div class="
                                talent-project
                            ">

                                <div>

                                    <h4>

                                        ${
                                            project.title ||
                                            project.name ||
                                            "Student Project"
                                        }

                                    </h4>

                                    <p>

                                        ${
                                            project.description ||
                                            "Project completed by the student."
                                        }

                                    </p>

                                </div>

                            </div>

                        `;

                    }
                ).join("")

                : `

                    <p class="empty-text">
                        No projects recorded yet.
                    </p>

                  `;


        /* ==========================================
           CERTIFICATE HTML
        ========================================== */

        const certificateHTML =
            certificates.length

                ? certificates.map(
                    function (certificate) {

                        return `

                            <div class="
                                talent-certificate
                            ">

                                <i class="
                                    fa-solid
                                    fa-certificate
                                "></i>


                                <div>

                                    <strong>

                                        ${
                                            certificate.name ||
                                            certificate.title ||
                                            "Certificate"
                                        }

                                    </strong>

                                    <small>

                                        ${
                                            certificate.issuer ||
                                            "Verified Achievement"
                                        }

                                    </small>

                                </div>

                            </div>

                        `;

                    }
                ).join("")

                : `

                    <p class="empty-text">
                        No certificates recorded yet.
                    </p>

                  `;


        /* ==========================================
           LEARNING HTML
        ========================================== */

        const learningHTML =
            learningSkills.length

                ? learningSkills.map(
                    function (skill) {

                        return `

                            <span class="
                                learning-tag
                            ">

                                ${skill}

                            </span>

                        `;

                    }
                ).join("")

                : `

                    <p class="empty-text">
                        No learning goals recorded.
                    </p>

                  `;


        /* ==========================================
           RENDER PROFILE
        ========================================== */

        container.innerHTML = `

            <div class="
                applicant-profile-header
            ">


                <div class="
                    applicant-large-avatar
                ">

                    ${
                        application.studentName
                            .substring(0, 2)
                            .toUpperCase()
                    }

                </div>


                <div class="
                    applicant-header-info
                ">

                    <span class="
                        profile-role
                    ">

                        STUDENT TALENT

                    </span>


                    <h2>

                        ${
                            application.studentName
                        }

                    </h2>


                    <p>

                        Applicant for

                        <strong>

                            ${
                                application.opportunityTitle
                            }

                        </strong>

                    </p>


                    <span class="
                        profile-date
                    ">

                        Applied
                        ${
                            application.appliedAt ||
                            "Recently"
                        }

                    </span>

                </div>


                <div class="
                    profile-match-card
                ">

                    <span>
                        MATCH SCORE
                    </span>

                    <strong>

                        ${
                            application.matchScore
                        }%

                    </strong>

                    <small>
                        SkillBridge Match
                    </small>

                </div>

            </div>



            <div class="
                talent-overview
            ">

                <div>

                    <strong>
                        ${skills.length}
                    </strong>

                    <span>
                        Skills
                    </span>

                </div>


                <div>

                    <strong>
                        ${projects.length}
                    </strong>

                    <span>
                        Projects
                    </span>

                </div>


                <div>

                    <strong>
                        ${experiences.length}
                    </strong>

                    <span>
                        Experiences
                    </span>

                </div>


                <div>

                    <strong>
                        ${activities.length}
                    </strong>

                    <span>
                        Activities
                    </span>

                </div>


                <div>

                    <strong>
                        ${certificates.length}
                    </strong>

                    <span>
                        Certificates
                    </span>

                </div>

            </div>



            <div class="
                talent-grid
            ">


                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>
                            <i class="
                                fa-solid
                                fa-bolt
                            "></i>

                            Match Analysis
                        </h3>

                    </div>


                    <div class="
                        talent-match-analysis
                    ">


                        <div class="
                            match-analysis-item
                            positive
                        ">

                            <i class="
                                fa-solid
                                fa-check
                            "></i>


                            <div>

                                <strong>
                                    Matched Skills
                                </strong>

                                <p>

                                    ${
                                        (
                                            application
                                                .matchedSkills ||
                                            []
                                        ).join(", ") ||
                                        "No matched skills"
                                    }

                                </p>

                            </div>

                        </div>


                        <div class="
                            match-analysis-item
                            warning
                        ">

                            <i class="
                                fa-solid
                                fa-arrow-up
                            "></i>


                            <div>

                                <strong>
                                    Skills to Develop
                                </strong>

                                <p>

                                    ${
                                        (
                                            application
                                                .missingSkills ||
                                            []
                                        ).join(", ") ||
                                        "None"
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-code
                            "></i>

                            Skills

                        </h3>

                    </div>


                    <div class="
                        talent-skills-grid
                    ">

                        ${skillsHTML}

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-briefcase
                            "></i>

                            Experience

                        </h3>

                    </div>


                    <div>

                        ${experienceHTML}

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-diagram-project
                            "></i>

                            Projects

                        </h3>

                    </div>


                    <div>

                        ${projectHTML}

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-circle-check
                            "></i>

                            Verified Activities

                        </h3>

                    </div>


                    <div>

                        ${activityHTML}

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-certificate
                            "></i>

                            Certificates

                        </h3>

                    </div>


                    <div>

                        ${certificateHTML}

                    </div>

                </section>



                <section class="
                    talent-section
                ">

                    <div class="
                        talent-section-heading
                    ">

                        <h3>

                            <i class="
                                fa-solid
                                fa-graduation-cap
                            "></i>

                            Currently Learning

                        </h3>

                    </div>


                    <div class="
                        learning-tags
                    ">

                        ${learningHTML}

                    </div>

                </section>

            </div>



            <div class="
                applicant-profile-actions
            ">

                <a
                    href="employer-applications.html"
                    class="back-applications-btn"
                >

                    <i class="
                        fa-solid
                        fa-arrow-left
                    "></i>

                    Back to Applications

                </a>


                <button
                    type="button"
                    id="profileAcceptBtn"
                    class="profile-accept-btn"
                >

                    <i class="
                        fa-solid
                        fa-check
                    "></i>

                    Accept Student

                </button>


                <button
                    type="button"
                    id="profileRejectBtn"
                    class="profile-reject-btn"
                >

                    <i class="
                        fa-solid
                        fa-xmark
                    "></i>

                    Reject

                </button>

            </div>

        `;


        /* ==========================================
           ACTIONS
        ========================================== */

        const acceptBtn =
            document.getElementById(
                "profileAcceptBtn"
            );


        const rejectBtn =
            document.getElementById(
                "profileRejectBtn"
            );


        function updateStatus(
            newStatus
        ) {

            const applications =
                JSON.parse(
                    localStorage.getItem(
                        "skillbridgeApplications"
                    )
                ) || [];


            const target =
                applications.find(
                    function (item) {

                        return String(
                            item.id
                        ) === String(
                            application.id
                        );

                    }
                );


            if (!target) return;


            target.status =
                newStatus;


            localStorage.setItem(
                "skillbridgeApplications",
                JSON.stringify(
                    applications
                )
            );


            application.status =
                newStatus;


            if (
                newStatus === "Accepted"
            ) {

                alert(
                    "Student accepted successfully."
                );

            } else {

                alert(
                    "Application rejected."
                );

            }


            window.location.href =
                "employer-applications.html";

        }


        acceptBtn.addEventListener(
            "click",
            function () {

                if (
                    confirm(
                        "Accept this student?"
                    )
                ) {

                    updateStatus(
                        "Accepted"
                    );

                }

            }
        );


        rejectBtn.addEventListener(
            "click",
            function () {

                if (
                    confirm(
                        "Reject this application?"
                    )
                ) {

                    updateStatus(
                        "Rejected"
                    );

                }

            }
        );

    }
);