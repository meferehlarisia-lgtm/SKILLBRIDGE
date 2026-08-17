document.addEventListener("DOMContentLoaded", function () {

    console.log("SkillBridge Projects Loaded");


    /* =====================================================
       STUDENT SKILLS
       ===================================================== */

    const studentSkills =
        JSON.parse(
            localStorage.getItem(
                "skillbridgeSkills"
            )
        ) || [
            {
                name: "HTML",
                level: "Intermediate"
            },
            {
                name: "CSS",
                level: "Intermediate"
            },
            {
                name: "Photoshop",
                level: "Intermediate"
            }
        ];


    /* =====================================================
       PROJECT DATABASE
       ===================================================== */

    const projects = [

        {
            id: 1,

            title:
                "Yaoundé Student Marketplace",

            description:
                "Build a digital marketplace where students can sell services, products and skills to other students across Yaoundé.",

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
                "fa-store",

            status:
                "Open",

            created:
                "2026-08-10"

        },


        {
            id: 2,

            title:
                "TerraClean Community Platform",

            description:
                "Create a digital platform that connects young people with environmental projects, clean-up activities and waste awareness campaigns.",

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
                "fa-leaf",

            status:
                "Open",

            created:
                "2026-08-09"

        },


        {
            id: 3,

            title:
                "Student Skill Portfolio",

            description:
                "Build a modern portfolio system that helps students showcase skills, projects, certificates and practical experience.",

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
                "fa-id-card",

            status:
                "Open",

            created:
                "2026-08-08"

        },


        {
            id: 4,

            title:
                "Youth Brand Design Lab",

            description:
                "Create visual identities and digital campaigns for youth-led organizations and community initiatives.",

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
                "fa-palette",

            status:
                "Open",

            created:
                "2026-08-07"

        },


        {
            id: 5,

            title:
                "Campus Opportunity Finder",

            description:
                "Build a platform that helps students discover internships, volunteering opportunities, competitions and training programs.",

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
                "fa-compass",

            status:
                "Open",

            created:
                "2026-08-06"

        },


        {
            id: 6,

            title:
                "Student Data Insights",

            description:
                "Analyze student participation, skills and project activity to identify emerging talents and skill gaps.",

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
                "fa-chart-line",

            status:
                "Open",

            created:
                "2026-08-05"

        }

    ];


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const container =
        document.getElementById(
            "projectsContainer"
        );


    const searchInput =
        document.getElementById(
            "projectSearch"
        );


    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );


    const projectCount =
        document.getElementById(
            "projectCount"
        );


    const sortSelect =
        document.getElementById(
            "sortProjects"
        );


    const topMatchScore =
        document.getElementById(
            "topMatchScore"
        );


    let currentCategory =
        "All";


    let currentSearch =
        "";


    /* =====================================================
       CALCULATE MATCH
       ===================================================== */

    function calculateMatch(project) {

        if (
            !project.skills ||
            project.skills.length === 0
        ) {

            return 0;

        }


        const studentSkillNames =
            studentSkills.map(
                function (skill) {

                    return skill.name
                        .toLowerCase();

                }
            );


        let matches = 0;


        project.skills.forEach(
            function (requiredSkill) {

                if (
                    studentSkillNames.includes(
                        requiredSkill.toLowerCase()
                    )
                ) {

                    matches++;

                }

            }
        );


        return Math.round(
            (
                matches /
                project.skills.length
            ) * 100
        );

    }


    /* =====================================================
       GET MATCHED SKILLS
       ===================================================== */

    function getMatchedSkills(project) {

        const studentSkillNames =
            studentSkills.map(
                function (skill) {

                    return skill.name
                        .toLowerCase();

                }
            );


        return project.skills.filter(
            function (skill) {

                return studentSkillNames.includes(
                    skill.toLowerCase()
                );

            }
        );

    }


    /* =====================================================
       RENDER PROJECTS
       ===================================================== */

    function renderProjects() {

        if (!container) return;


        let filteredProjects =
            projects.filter(
                function (project) {

                    const matchesCategory =
                        currentCategory === "All" ||
                        project.category ===
                        currentCategory;


                    const searchableText =
                        (
                            project.title +
                            " " +
                            project.description +
                            " " +
                            project.category
                        ).toLowerCase();


                    const matchesSearch =
                        searchableText.includes(
                            currentSearch.toLowerCase()
                        );


                    return (
                        matchesCategory &&
                        matchesSearch
                    );

                }
            );


        /* SORT */

        const sortValue =
            sortSelect
                ? sortSelect.value
                : "match";


        if (sortValue === "match") {

            filteredProjects.sort(
                function (a, b) {

                    return (
                        calculateMatch(b) -
                        calculateMatch(a)
                    );

                }
            );

        }


        if (sortValue === "newest") {

            filteredProjects.sort(
                function (a, b) {

                    return (
                        new Date(b.created) -
                        new Date(a.created)
                    );

                }
            );

        }


        if (sortValue === "members") {

            filteredProjects.sort(
                function (a, b) {

                    return (
                        b.needed -
                        a.needed
                    );

                }
            );

        }


        container.innerHTML = "";


        if (
            filteredProjects.length === 0
        ) {

            container.innerHTML = `

                <div class="no-projects">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <h3>
                        No projects found
                    </h3>

                    <p>
                        Try another search or category.
                    </p>

                </div>

            `;


            if (projectCount) {

                projectCount.textContent =
                    "No matching projects";

            }


            return;

        }


        filteredProjects.forEach(
            function (project) {

                const match =
                    calculateMatch(project);


                const matchedSkills =
                    getMatchedSkills(project);


                const card =
                    document.createElement("article");


                card.className =
                    "project-card";


                card.innerHTML = `

                    <div class="project-card-top">

                        <div class="project-icon">

                            <i class="fa-solid ${project.icon}"></i>

                        </div>

                        <span class="project-status">
                            ${project.status}
                        </span>

                    </div>


                    <div class="project-card-body">

                        <span class="project-category">
                            ${project.category}
                        </span>


                        <h3>
                            ${project.title}
                        </h3>


                        <p>
                            ${project.description}
                        </p>


                        <div class="project-location">

                            <i class="fa-solid fa-location-dot"></i>

                            ${project.location}

                        </div>


                        <div class="required-skills">

                            <strong>
                                Skills needed
                            </strong>

                            <div class="skill-tags">

                                ${project.skills.map(
                                    function (skill) {

                                        const matched =
                                            matchedSkills.includes(
                                                skill
                                            );

                                        return `

                                            <span class="
                                                ${matched
                                                    ? "matched"
                                                    : ""
                                                }
                                            ">

                                                ${matched
                                                    ? "✓ "
                                                    : ""
                                                }

                                                ${skill}

                                            </span>

                                        `;

                                    }
                                ).join("")}

                            </div>

                        </div>

                    </div>


                    <div class="project-card-footer">

                        <div class="project-members">

                            <i class="fa-solid fa-users"></i>

                            ${project.members}
                            members

                            <span>
                                ${project.needed}
                                needed
                            </span>

                        </div>


                        <div class="match-score">

                            <strong>
                                ${match}%
                            </strong>

                            <small>
                                MATCH
                            </small>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="view-project-btn"
                        data-id="${project.id}"
                    >

                        View Project

                        <i class="fa-solid fa-arrow-right"></i>

                    </button>

                `;


                container.appendChild(card);

            }
        );


        if (projectCount) {

            projectCount.textContent =
                `${filteredProjects.length} projects available`;

        }


        updateTopMatch(filteredProjects);

    }


    /* =====================================================
       TOP MATCH
       ===================================================== */

    function updateTopMatch(projectList) {

        if (!topMatchScore) return;


        if (
            !projectList ||
            projectList.length === 0
        ) {

            topMatchScore.textContent =
                "0%";

            return;

        }


        let highest =
            Math.max.apply(
                null,
                projectList.map(
                    function (project) {

                        return calculateMatch(
                            project
                        );

                    }
                )
            );


        topMatchScore.textContent =
            highest + "%";

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentSearch =
                    searchInput.value.trim();

                renderProjects();

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    categoryButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category;


                    renderProjects();

                }
            );

        }
    );


    /* =====================================================
       SORT
       ===================================================== */

    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function () {

                renderProjects();

            }
        );

    }


    /* =====================================================
       VIEW PROJECT
       ===================================================== */

    if (container) {

        container.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".view-project-btn"
                    );


                if (!button) return;


                const projectId =
                    Number(
                        button.dataset.id
                    );


                const project =
                    projects.find(
                        function (item) {

                            return (
                                item.id ===
                                projectId
                            );

                        }
                    );


                if (!project) return;


                const match =
                    calculateMatch(project);


                const matchedSkills =
                    getMatchedSkills(project);


               window.location.href =
    "project-details.html?id=" +
    project.id;

            }
        );

    }


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    renderProjects();

});