document.addEventListener(
    "DOMContentLoaded",
    function () {

        const container =
            document.getElementById(
                "myProjectsGrid"
            );


        const joinedProjects =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeJoinedProjects"
                )
            ) || [];


        /* =========================================
           PROJECT DATA
        ========================================= */

        const projects = [

            {
                id: 1,
                title: "Yaoundé Student Marketplace",
                category: "Web Development",
                icon: "fa-store"
            },

            {
                id: 2,
                title: "TerraClean Community Platform",
                category: "Community",
                icon: "fa-leaf"
            },

            {
                id: 3,
                title: "Student Skill Portfolio",
                category: "Web Development",
                icon: "fa-id-card"
            },

            {
                id: 4,
                title: "Youth Brand Design Lab",
                category: "Graphic Design",
                icon: "fa-palette"
            },

            {
                id: 5,
                title: "Campus Opportunity Finder",
                category: "Web Development",
                icon: "fa-compass"
            },

            {
                id: 6,
                title: "Student Data Insights",
                category: "Data",
                icon: "fa-chart-line"
            }

        ];


        /* =========================================
           EMPTY STATE
        ========================================= */

        if (joinedProjects.length === 0) {

            container.innerHTML = `

                <div class="my-projects-empty">

                    <div class="empty-project-icon">

                        <i class="fa-solid fa-folder-open"></i>

                    </div>

                    <h3>
                        You haven't joined a project yet
                    </h3>

                    <p>
                        Explore available projects and
                        find one where your skills can make
                        a real contribution.
                    </p>

                    <a
                        href="projects.html"
                        class="browse-projects-btn"
                    >

                        <i class="fa-solid fa-compass"></i>

                        Explore Projects

                    </a>

                </div>

            `;

            return;

        }


        /* =========================================
           DISPLAY PROJECTS
        ========================================= */

        joinedProjects.forEach(
            function (joinedProject) {

                const project =
                    projects.find(
                        function (item) {

                            return item.id ===
                                joinedProject.projectId;

                        }
                    );


                if (!project) return;


                const card =
                    document.createElement("article");

                card.className =
                    "my-project-card";


                card.innerHTML = `

                    <div class="my-project-card-top">

                        <div class="my-project-icon">

                            <i class="fa-solid ${project.icon}"></i>

                        </div>

                        <span class="project-status">

                            <i class="fa-solid fa-circle"></i>

                            Active

                        </span>

                    </div>


                    <span class="project-category">
                        ${project.category}
                    </span>


                    <h3>
                        ${project.title}
                    </h3>


                    <div class="project-role">

                        <i class="fa-solid fa-user"></i>

                        <span>
                            ${joinedProject.role}
                        </span>

                    </div>


                    <div class="project-progress">

                        <div class="progress-header">

                            <span>
                                Contribution
                            </span>

                            <strong>
                                ${joinedProject.contributions}%
                            </strong>

                        </div>


                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${joinedProject.contributions}%"
                            ></div>

                        </div>

                    </div>


                    <div class="project-card-footer">

                        <span>

                            <i class="fa-solid fa-calendar"></i>

                            Joined
                            ${joinedProject.joinedAt}

                        </span>


                       <a
    href="project-workspace.html?id=${project.id}"
>

                            Open Project

                            <i class="fa-solid fa-arrow-right"></i>

                        </a>

                    </div>

                `;


                container.appendChild(card);

            }
        );

    }
);