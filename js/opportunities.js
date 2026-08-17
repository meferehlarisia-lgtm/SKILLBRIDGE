document.addEventListener("DOMContentLoaded", function () {

    console.log("SkillBridge Opportunities Loaded");

    const opportunityList =
        document.getElementById("opportunityList");

    if (!opportunityList) {
        console.error("opportunityList not found.");
        return;
    }


    /* =====================================================
       STUDENT DATA
    ===================================================== */

    const skills =
        JSON.parse(
            localStorage.getItem("skillbridgeSkills")
        ) || [];

    const learningSkills =
        JSON.parse(
            localStorage.getItem(
                "skillbridgeLearningSkills"
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

    const certificates =
        JSON.parse(
            localStorage.getItem(
                "skillbridgeCertificates"
            )
        ) || [];

    const projects =
        JSON.parse(
            localStorage.getItem(
                "skillbridgeProjects"
            )
        ) || [];


    /* =====================================================
       BUILD STUDENT PROFILE
    ===================================================== */

    const student = {

        name: "Larisia",

        skills: skills,

        learningSkills:
            learningSkills,

        experiences:
            experiences,

        activities:
            activities,

        certificates:
            certificates,

        projects:
            projects

    };


    /* =====================================================
       SAMPLE OPPORTUNITIES
       Later these will come from the employer system.
    ===================================================== */

    const opportunities = [

        {
            id: "opp-001",

            title:
                "Frontend Developer Intern",

            company:
                "Tech Innovation Hub",

            location:
                "Yaoundé",

            type:
                "Internship",

            category:
                "Web Development",

            description:
                "Work with a development team to build modern responsive web applications.",

            requiredSkills: [

                "HTML",
                "CSS",
                "JavaScript",
                "Git"

            ],

            deadline:
                "September 15, 2026"

        },


        {
            id: "opp-002",

            title:
                "UI/UX Design Intern",

            company:
                "Digital Creators Cameroon",

            location:
                "Yaoundé",

            type:
                "Internship",

            category:
                "Design",

            description:
                "Design intuitive digital experiences and interfaces for web and mobile products.",

            requiredSkills: [

                "Photoshop",
                "UI/UX",
                "Figma"

            ],

            deadline:
                "September 20, 2026"

        },


        {
            id: "opp-003",

            title:
                "Junior Web Developer",

            company:
                "Startup Cameroon",

            location:
                "Yaoundé",

            type:
                "Part-time",

            category:
                "Web Development",

            description:
                "Help develop and maintain websites and web-based systems.",

            requiredSkills: [

                "HTML",
                "CSS",
                "JavaScript"

            ],

            deadline:
                "October 1, 2026"

        },


        {
            id: "opp-004",

            title:
                "Digital Product Designer",

            company:
                "Creative Tech Africa",

            location:
                "Yaoundé",

            type:
                "Project",

            category:
                "Product Design",

            description:
                "Create visual concepts and digital product interfaces for emerging technology products.",

            requiredSkills: [

                "Photoshop",
                "UI/UX",
                "Graphic Design"

            ],

            deadline:
                "October 10, 2026"

        }

    ];


    /* =====================================================
       CALCULATE MATCHES
    ===================================================== */

    const matchedOpportunities =
        opportunities.map(
            function (opportunity) {

                const match =
                    SkillBridgeMatching.calculateMatch(
                        student,
                        opportunity
                    );

                return {

                    ...opportunity,

                    match: match

                };

            }
        );


    /* =====================================================
       SORT BEST MATCH FIRST
    ===================================================== */

    matchedOpportunities.sort(
        function (a, b) {

            return (
                b.match.score -
                a.match.score
            );

        }
    );


    /* =====================================================
       RENDER
    ===================================================== */

    opportunityList.innerHTML = "";


    matchedOpportunities.forEach(
        function (opportunity) {

            const card =
                document.createElement("article");

            card.className =
                "opportunity-card";


            const score =
                opportunity.match.score;


            let scoreClass =
                "low-match";


            if (score >= 90) {

                scoreClass =
                    "excellent-match";

            } else if (score >= 75) {

                scoreClass =
                    "strong-match";

            } else if (score >= 60) {

                scoreClass =
                    "good-match";

            }


            const matchedSkills =
                opportunity.match.matchedSkills
                    .map(
                        function (skill) {

                            return `
                                <span class="
                                    opportunity-skill
                                    matched
                                ">
                                    ✓ ${skill}
                                </span>
                            `;

                        }
                    )
                    .join("");


            const missingSkills =
                opportunity.match.missingSkills
                    .map(
                        function (skill) {

                            return `
                                <span class="
                                    opportunity-skill
                                    missing
                                ">
                                    ○ ${skill}
                                </span>
                            `;

                        }
                    )
                    .join("");


            card.innerHTML = `

                <div class="
                    opportunity-card-header
                ">

                    <div>

                        <span class="
                            opportunity-type
                        ">

                            ${opportunity.type}

                        </span>

                        <h3>
                            ${opportunity.title}
                        </h3>

                        <p>
                            ${opportunity.company}
                        </p>

                    </div>


                    <div class="
                        opportunity-match
                        ${scoreClass}
                    ">

                        <strong>
                            ${score}%
                        </strong>

                        <span>
                            ${opportunity.match.rating}
                        </span>

                    </div>

                </div>


                <div class="
                    opportunity-info
                ">

                    <span>

                        <i class="
                            fa-solid
                            fa-location-dot
                        "></i>

                        ${opportunity.location}

                    </span>


                    <span>

                        <i class="
                            fa-solid
                            fa-layer-group
                        "></i>

                        ${opportunity.category}

                    </span>


                    <span>

                        <i class="
                            fa-solid
                            fa-calendar
                        "></i>

                        Deadline:
                        ${opportunity.deadline}

                    </span>

                </div>


                <p class="
                    opportunity-description
                ">

                    ${opportunity.description}

                </p>


                <div class="
                    opportunity-match-details
                ">

                    <div>

                        <strong>
                            Skills you match
                        </strong>

                        <div class="
                            opportunity-skills
                        ">

                            ${
                                matchedSkills ||
                                "<span>None yet</span>"
                            }

                        </div>

                    </div>


                    <div>

                        <strong>
                            Skills to develop
                        </strong>

                        <div class="
                            opportunity-skills
                        ">

                            ${
                                missingSkills ||
                                "<span>None</span>"
                            }

                        </div>

                    </div>

                </div>


                <div class="
                    opportunity-card-footer
                ">

                    <button
                        type="button"
                        class="view-opportunity-btn"
                        data-id="${opportunity.id}"
                    >

                        <i class="
                            fa-solid
                            fa-eye
                        "></i>

                        View Details

                    </button>


                    <button
                        type="button"
                        class="apply-opportunity-btn"
                        data-id="${opportunity.id}"
                    >

                        <i class="
                            fa-solid
                            fa-paper-plane
                        "></i>

                        Apply Now

                    </button>

                </div>

            `;


            opportunityList.appendChild(card);

        }
    );


    /* =====================================================
       BUTTON ACTIONS
    ===================================================== */

    opportunityList.addEventListener(
        "click",
        function (event) {

            const applyButton =
                event.target.closest(
                    ".apply-opportunity-btn"
                );


            const viewButton =
                event.target.closest(
                    ".view-opportunity-btn"
                );


            /* =============================================
               APPLY
            ============================================= */

            if (applyButton) {

                const opportunity =
                    matchedOpportunities.find(
                        function (item) {

                            return (
                                item.id ===
                                applyButton.dataset.id
                            );

                        }
                    );


                if (!opportunity) {
                    return;
                }


                const existingApplications =
                    JSON.parse(
                        localStorage.getItem(
                            "skillbridgeApplications"
                        )
                    ) || [];


                const alreadyApplied =
                    existingApplications.some(
                        function (application) {

                            return (
                                String(
                                    application.opportunityId
                                ) ===
                                String(
                                    opportunity.id
                                )
                            );

                        }
                    );


                if (alreadyApplied) {

                    alert(
                        "You have already applied for this opportunity."
                    );

                    return;

                }


                const application = {

                    id:
                        "APP-" +
                        Date.now(),

                    opportunityId:
                        opportunity.id,

                    studentName:
                        student.name,

                    opportunityTitle:
                        opportunity.title,

                    company:
                        opportunity.company,

                    matchScore:
                        opportunity.match.score,

                    matchedSkills:
                        opportunity.match
                            .matchedSkills,

                    missingSkills:
                        opportunity.match
                            .missingSkills,

                    status:
                        "Pending",

                    appliedAt:
                        new Date()
                            .toLocaleDateString()

                };


                existingApplications.push(
                    application
                );


                localStorage.setItem(
                    "skillbridgeApplications",
                    JSON.stringify(
                        existingApplications
                    )
                );


                alert(
                    `Application submitted!\n\n` +
                    `${opportunity.title}\n` +
                    `Match: ${opportunity.match.score}%`
                );


                applyButton.textContent =
                    "Applied ✓";


                applyButton.disabled =
                    true;

            }


            /* =============================================
               VIEW DETAILS
            ============================================= */

            if (viewButton) {

                const opportunity =
                    matchedOpportunities.find(
                        function (item) {

                            return (
                                item.id ===
                                viewButton.dataset.id
                            );

                        }
                    );


                if (!opportunity) {
                    return;
                }


                localStorage.setItem(
                    "skillbridgeSelectedOpportunity",
                    JSON.stringify(
                        opportunity
                    )
                );


                window.location.href =
                    "opportunity-details.html";

            }

        }
    );

});