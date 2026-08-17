document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SkillBridge Project Details Loaded"
        );


        /* =========================================
           PROJECT DATA
        ========================================= */

        const projects = [

            {
                id: 1,

                title:
                    "Yaoundé Student Marketplace",

                description:
                    "Build a digital marketplace where students can sell services, products and skills to other students across Yaoundé.",

                problem:
                    "Many students have useful skills, products and services but lack a trusted digital environment where they can showcase and exchange them with other students.",

                objective:
                    "Create a student-focused marketplace that makes it easier for students to discover, offer and exchange skills and services.",

                category:
                    "Web Development",

                location:
                    "Yaoundé",

                members:
                    5,

                needed:
                    4,

                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "PHP",
                    "MySQL"
                ],

                icon:
                    "fa-store"

            },


            {
                id: 2,

                title:
                    "TerraClean Community Platform",

                description:
                    "Create a digital platform connecting young people with environmental projects, clean-up activities and waste awareness campaigns.",

                problem:
                    "Environmental activities often happen without a proper system for recording participation, contributions, skills and achievements.",

                objective:
                    "Build a platform where young people can discover environmental activities, participate in projects and build verifiable experience.",

                category:
                    "Community",

                location:
                    "Yaoundé",

                members:
                    6,

                needed:
                    3,

                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Photoshop",
                    "Communication"
                ],

                icon:
                    "fa-leaf"

            },


            {
                id: 3,

                title:
                    "Student Skill Portfolio",

                description:
                    "Build a modern portfolio system that helps students showcase skills, projects, certificates and practical experience.",

                problem:
                    "Students often have skills and experiences that are scattered across certificates, documents and social media profiles.",

                objective:
                    "Create a centralized digital profile where students can demonstrate what they know and what they have actually done.",

                category:
                    "Web Development",

                location:
                    "Yaoundé",

                members:
                    4,

                needed:
                    2,

                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "UI/UX"
                ],

                icon:
                    "fa-id-card"

            },


            {
                id: 4,

                title:
                    "Youth Brand Design Lab",

                description:
                    "Create visual identities and digital campaigns for youth-led organizations and community initiatives.",

                problem:
                    "Many youth organizations have strong ideas but lack the design resources needed to communicate their work professionally.",

                objective:
                    "Create a collaborative design environment where young designers can work on real organizational branding challenges.",

                category:
                    "Graphic Design",

                location:
                    "Yaoundé",

                members:
                    5,

                needed:
                    3,

                skills: [
                    "Photoshop",
                    "Graphic Design",
                    "Branding",
                    "Communication"
                ],

                icon:
                    "fa-palette"

            },


            {
                id: 5,

                title:
                    "Campus Opportunity Finder",

                description:
                    "Build a platform that helps students discover internships, volunteering opportunities, competitions and training programs.",

                problem:
                    "Students often miss valuable opportunities because information about internships, competitions and training programs is scattered across different platforms.",

                objective:
                    "Create one environment where students can discover opportunities relevant to their skills and interests.",

                category:
                    "Web Development",

                location:
                    "Yaoundé",

                members:
                    6,

                needed:
                    4,

                skills: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Node.js"
                ],

                icon:
                    "fa-compass"

            },


            {
                id: 6,

                title:
                    "Student Data Insights",

                description:
                    "Analyze student participation, skills and project activity to identify emerging talents and skill gaps.",

                problem:
                    "Organizations often lack reliable information about the skills students possess and the practical activities they have completed.",

                objective:
                    "Use student activity data to identify talent, understand skill gaps and support better project and opportunity matching.",

                category:
                    "Data",

                location:
                    "Yaoundé",

                members:
                    4,

                needed:
                    2,

                skills: [
                    "Python",
                    "Data Analysis",
                    "Excel",
                    "SQL"
                ],

                icon:
                    "fa-chart-line"

            }

        ];


        /* =========================================
           GET PROJECT ID
        ========================================= */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const projectId =
            Number(
                params.get("id")
            );


        const project =
            projects.find(
                function (item) {

                    return item.id === projectId;

                }
            );


        const container =
            document.getElementById(
                "projectDetails"
            );


        /* =========================================
           INVALID PROJECT
        ========================================= */

        if (!project) {

            container.innerHTML = `

                <div class="project-not-found">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <h2>
                        Project not found
                    </h2>

                    <p>
                        The project you are looking for does not exist.
                    </p>

                    <a href="projects.html">
                        Return to Projects
                    </a>

                </div>

            `;

            return;

        }


        /* =========================================
           GET STUDENT SKILLS
        ========================================= */

        const studentSkills =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeSkills"
                )
            ) || [];


        const studentSkillNames =
            studentSkills.map(
                function (skill) {

                    return skill.name.toLowerCase();

                }
            );


        const matchedSkills =
            project.skills.filter(
                function (skill) {

                    return studentSkillNames.includes(
                        skill.toLowerCase()
                    );

                }
            );


        const match =
            project.skills.length === 0
                ? 0
                : Math.round(
                    (
                        matchedSkills.length /
                        project.skills.length
                    ) * 100
                );


        /* =========================================
           RENDER PROJECT
        ========================================= */

        container.innerHTML = `

            <div class="project-detail-hero">


                <div class="detail-icon">

                    <i class="fa-solid ${project.icon}"></i>

                </div>


                <div class="detail-heading">

                    <span class="project-category">
                        ${project.category}
                    </span>

                    <h2>
                        ${project.title}
                    </h2>

                    <p>
                        ${project.description}
                    </p>


                    <div class="detail-meta">

                        <span>

                            <i class="fa-solid fa-location-dot"></i>

                            ${project.location}

                        </span>


                        <span>

                            <i class="fa-solid fa-users"></i>

                            ${project.members}
                            members

                        </span>


                        <span>

                            <i class="fa-solid fa-user-plus"></i>

                            ${project.needed}
                            positions available

                        </span>

                    </div>

                </div>


                <div class="detail-match">

                    <strong>
                        ${match}%
                    </strong>

                    <span>
                        Skill Match
                    </span>

                </div>

            </div>



            <div class="project-detail-layout">


                <div class="project-detail-main">


                    <section class="detail-section">

                        <div class="section-title">

                            <i class="fa-solid fa-triangle-exclamation"></i>

                            <h3>
                                The Problem
                            </h3>

                        </div>

                        <p>
                            ${project.problem}
                        </p>

                    </section>



                    <section class="detail-section">

                        <div class="section-title">

                            <i class="fa-solid fa-bullseye"></i>

                            <h3>
                                Project Objective
                            </h3>

                        </div>

                        <p>
                            ${project.objective}
                        </p>

                    </section>



                    <section class="detail-section">

                        <div class="section-title">

                            <i class="fa-solid fa-code"></i>

                            <h3>
                                Skills Required
                            </h3>

                        </div>


                        <div class="detail-skills">

                            ${project.skills.map(
                                function (skill) {

                                    const matched =
                                        studentSkillNames.includes(
                                            skill.toLowerCase()
                                        );

                                    return `

                                        <span class="
                                            detail-skill
                                            ${matched ? "matched" : ""}
                                        ">

                                            ${matched ? "✓ " : ""}

                                            ${skill}

                                        </span>

                                    `;

                                }
                            ).join("")}

                        </div>

                    </section>



                    <section class="detail-section">

                        <div class="section-title">

                            <i class="fa-solid fa-user-group"></i>

                            <h3>
                                Who Can Join?
                            </h3>

                        </div>

                        <p>

                            This project is open to students
                            who have relevant skills or who
                            want to gain practical experience
                            while working with other students.

                        </p>

                    </section>


                </div>



                <aside class="project-detail-sidebar">


                    <div class="join-card">

                        <div class="join-card-icon">

                            <i class="fa-solid fa-rocket"></i>

                        </div>


                        <h3>
                            Ready to contribute?
                        </h3>


                        <p>

                            Join this project and turn your
                            skills into real-world experience.

                        </p>


                        <button
                            type="button"
                            id="joinProjectBtn"
                            class="join-project-btn"
                        >

                            <i class="fa-solid fa-plus"></i>

                            Join Project

                        </button>


                        <small>

                            Your ${match}% skill match makes
                            you a potential contributor.

                        </small>

                    </div>



                    <div class="match-card">

                        <h3>
                            Your Skill Match
                        </h3>


                        <div class="match-number">

                            ${match}%

                        </div>


                        <p>

                            You currently match

                            <strong>
                                ${matchedSkills.length}
                            </strong>

                            of

                            <strong>
                                ${project.skills.length}
                            </strong>

                            required skills.

                        </p>


                    </div>


                </aside>

            </div>

        `;


        /* =========================================
           JOIN PROJECT
        ========================================= */

        const joinButton =
            document.getElementById(
                "joinProjectBtn"
            );


        if (joinButton) {

            joinButton.addEventListener(
                "click",
                function () {

                    joinButton.addEventListener(
    "click",
    function () {

        let joinedProjects =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeJoinedProjects"
                )
            ) || [];


        const alreadyJoined =
            joinedProjects.some(
                function (item) {

                    return item.projectId === project.id;

                }
            );


        if (alreadyJoined) {

            alert(
                "You have already joined this project."
            );

            return;

        }


        const newProject = {

            projectId: project.id,

            role:
                matchedSkills.length > 0
                    ? matchedSkills[0]
                    : "Project Contributor",

            contributions: 0,

            completedActivities: 0,

            joinedAt:
                new Date()
                    .toLocaleDateString()

        };


        joinedProjects.push(
            newProject
        );


        localStorage.setItem(
            "skillbridgeJoinedProjects",
            JSON.stringify(
                joinedProjects
            )
        );


        joinButton.innerHTML = `

            <i class="fa-solid fa-check"></i>

            Project Joined

        `;


        joinButton.disabled = true;


        joinButton.style.opacity = "0.7";


        alert(
            "🎉 You have successfully joined " +
            project.title +
            "!"
        );

    }
);

                }
            );

        }

    }
);