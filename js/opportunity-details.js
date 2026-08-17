document.addEventListener(
    "DOMContentLoaded",
    function () {

        const container =
            document.getElementById(
                "opportunityDetails"
            );


        const stored =
            localStorage.getItem(
                "selectedOpportunity"
            );


        if (!stored) {

            container.innerHTML = `

                <div class="verified-empty">

                    <i class="fa-solid fa-briefcase"></i>

                    <h3>
                        Opportunity not found
                    </h3>

                    <p>
                        Please return to the opportunities page.
                    </p>

                    <a
                        href="opportunities.html"
                        class="view-opportunity-btn"
                    >
                        Back to Opportunities
                    </a>

                </div>

            `;

            return;

        }


        const opportunity =
            JSON.parse(stored);


        const studentSkills =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeSkills"
                )
            ) || [];


        const skillNames =
            studentSkills.map(
                function (skill) {

                    return skill.name
                        .toLowerCase();

                }
            );


        const matchedSkills =
            opportunity.skills.filter(
                function (skill) {

                    return skillNames.includes(
                        skill.toLowerCase()
                    );

                }
            );


        const missingSkills =
            opportunity.skills.filter(
                function (skill) {

                    return !skillNames.includes(
                        skill.toLowerCase()
                    );

                }
            );


        const skillPercentage =
            opportunity.skills.length > 0
                ? Math.round(
                    (
                        matchedSkills.length /
                        opportunity.skills.length
                    ) * 100
                )
                : 0;


        const applications =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeApplications"
                )
            ) || [];


        const alreadyApplied =
            applications.some(
                function (application) {

                    return (
                        application.opportunityId ===
                        opportunity.id
                    );

                }
            );


        container.innerHTML = `

            <div class="opportunity-detail-header">

                <div>

                    <span class="opportunity-type">

                        ${opportunity.type}

                    </span>


                    <h1>
                        ${opportunity.title}
                    </h1>


                    <h3>
                        ${opportunity.company}
                    </h3>


                    <p>

                        <i class="fa-solid fa-location-dot"></i>

                        ${opportunity.location}

                    </p>

                </div>


                <div class="detail-match-score">

                    <strong>
                        ${calculateOverallMatch()}
                    </strong>

                    <span>
                        Overall Match
                    </span>

                </div>

            </div>


            <div class="opportunity-detail-grid">


                <div class="opportunity-detail-main">

                    <section class="detail-card">

                        <h2>
                            About this opportunity
                        </h2>

                        <p>

                            This opportunity is looking
                            for students with practical
                            skills and demonstrated
                            experience.

                            SkillBridge evaluates your
                            profile using your skills,
                            projects and verified work.

                        </p>

                    </section>


                    <section class="detail-card">

                        <h2>
                            Required Skills
                        </h2>


                        <div class="detail-skills">

                            ${opportunity.skills
                                .map(
                                    function (skill) {

                                        const matched =
                                            skillNames.includes(
                                                skill.toLowerCase()
                                            );

                                        return `

                                            <span class="${
                                                matched
                                                    ? "skill-matched"
                                                    : "skill-missing"
                                            }">

                                                <i class="fa-solid ${
                                                    matched
                                                        ? "fa-check"
                                                        : "fa-circle"
                                                }"></i>

                                                ${skill}

                                            </span>

                                        `;

                                    }
                                )
                                .join("")}

                        </div>

                    </section>


                    <section class="detail-card">

                        <h2>
                            Your Skill Analysis
                        </h2>


                        <div class="analysis-row">

                            <div>

                                <strong>
                                    ${matchedSkills.length}
                                </strong>

                                <span>
                                    Matching skills
                                </span>

                            </div>


                            <div>

                                <strong>
                                    ${missingSkills.length}
                                </strong>

                                <span>
                                    Skills to develop
                                </span>

                            </div>


                            <div>

                                <strong>
                                    ${opportunity.minimumProjects}
                                </strong>

                                <span>
                                    Projects required
                                </span>

                            </div>

                        </div>


                        ${
                            missingSkills.length > 0
                                ? `
                                    <div class="skill-warning">

                                        <i class="fa-solid fa-lightbulb"></i>

                                        <div>

                                            <strong>
                                                Improve your match
                                            </strong>

                                            <p>
                                                Add or develop:
                                                ${missingSkills.join(", ")}
                                            </p>

                                        </div>

                                    </div>
                                `
                                : `
                                    <div class="skill-success">

                                        <i class="fa-solid fa-circle-check"></i>

                                        <div>

                                            <strong>
                                                You have all required skills
                                            </strong>

                                            <p>
                                                Your skill profile matches
                                                every listed requirement.
                                            </p>

                                        </div>

                                    </div>
                                `

                        }

                    </section>

                </div>


                <aside class="opportunity-detail-side">

                    <div class="apply-card">

                        <h2>
                            Interested?
                        </h2>

                        <p>
                            Express your interest and
                            let the opportunity owner
                            review your verified profile.
                        </p>


                        <button
                            id="applyBtn"
                            class="apply-opportunity-btn"
                            type="button"
                            ${alreadyApplied ? "disabled" : ""}
                        >

                            ${
                                alreadyApplied
                                    ? "✓ Application Submitted"
                                    : "Express Interest"
                            }

                        </button>


                        <div class="apply-note">

                            <i class="fa-solid fa-shield-halved"></i>

                            Your verified SkillBridge
                            record will be visible to
                            the opportunity owner.

                        </div>

                    </div>


                    <div class="detail-card">

                        <h3>
                            Opportunity Requirements
                        </h3>


                        <div class="requirement">

                            <i class="fa-solid fa-code"></i>

                            <span>
                                ${opportunity.skills.length}
                                required skills
                            </span>

                        </div>


                        <div class="requirement">

                            <i class="fa-solid fa-diagram-project"></i>

                            <span>
                                ${opportunity.minimumProjects}
                                minimum projects
                            </span>

                        </div>


                        <div class="requirement">

                            <i class="fa-solid fa-shield-halved"></i>

                            <span>
                                ${opportunity.minimumVerified}
                                verified activities
                            </span>

                        </div>

                    </div>

                </aside>

            </div>

        `;


        function calculateOverallMatch() {

            let score = 0;


            score +=
                (
                    matchedSkills.length /
                    opportunity.skills.length
                ) * 60;


            const verifiedCount =
                getVerifiedCount();


            if (
                verifiedCount >=
                opportunity.minimumVerified
            ) {

                score += 25;

            } else {

                score +=
                    (
                        verifiedCount /
                        opportunity.minimumVerified
                    ) * 25;

            }


            const projects =
                JSON.parse(
                    localStorage.getItem(
                        "skillbridgeJoinedProjects"
                    )
                ) || [];


            if (
                projects.length >=
                opportunity.minimumProjects
            ) {

                score += 15;

            } else {

                score +=
                    (
                        projects.length /
                        opportunity.minimumProjects
                    ) * 15;

            }


            return Math.round(
                Math.min(
                    score,
                    100
                )
            ) + "%";

        }


        function getVerifiedCount() {

            let count = 0;


            for (
                let i = 0;
                i < localStorage.length;
                i++
            ) {

                const key =
                    localStorage.key(i);


                if (
                    !key ||
                    !key.startsWith(
                        "skillbridgeProjectActivities_"
                    )
                ) {

                    continue;

                }


                const activities =
                    JSON.parse(
                        localStorage.getItem(key)
                    ) || [];


                activities.forEach(
                    function (activity) {

                        if (
                            activity.verified === true
                        ) {

                            count++;

                        }

                    }
                );

            }


            return count;

        }


        const applyBtn =
            document.getElementById(
                "applyBtn"
            );


        if (applyBtn) {

            applyBtn.addEventListener(
                "click",
                function () {

                    const currentApplications =
                        JSON.parse(
                            localStorage.getItem(
                                "skillbridgeApplications"
                            )
                        ) || [];


                    const exists =
                        currentApplications.some(
                            function (application) {

                                return (
                                    application.opportunityId ===
                                    opportunity.id
                                );

                            }
                        );


                    if (exists) {

                        return;

                    }


                    currentApplications.push({

                        id: Date.now(),

                        opportunityId:
                            opportunity.id,

                        opportunityTitle:
                            opportunity.title,

                        company:
                            opportunity.company,

                        status:
                            "Submitted",

                        date:
                            new Date()
                                .toLocaleDateString()

                    });


                    localStorage.setItem(
                        "skillbridgeApplications",
                        JSON.stringify(
                            currentApplications
                        )
                    );


                    applyBtn.disabled =
                        true;


                    applyBtn.textContent =
                        "✓ Application Submitted";


                    alert(
                        "Your interest has been submitted successfully."
                    );

                }
            );

        }

    }
);