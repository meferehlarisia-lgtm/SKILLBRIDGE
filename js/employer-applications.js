document.addEventListener("DOMContentLoaded", function () {

    console.log("SkillBridge Employer Applications Loaded");


    /* =====================================================
       STORAGE
    ===================================================== */

    let applications =
        JSON.parse(
            localStorage.getItem("skillbridgeApplications")
        ) || [];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const container =
        document.getElementById("applicationsContainer");

    const statusFilter =
        document.getElementById("statusFilter");

    const searchInput =
        document.getElementById("applicationSearch");

    const totalApplications =
        document.getElementById("totalApplications");

    const pendingApplications =
        document.getElementById("pendingApplications");

    const acceptedApplications =
        document.getElementById("acceptedApplications");


    /* =====================================================
       SAFETY HELPERS
       Prevent old/broken localStorage data from crashing
       the application.
    ===================================================== */

    function safeText(value, fallback = "") {

        if (
            value === null ||
            value === undefined
        ) {
            return fallback;
        }

        return String(value);

    }


    function safeArray(value) {

        return Array.isArray(value)
            ? value
            : [];

    }


    function normalizeApplication(application) {

        return {

            ...application,

            id:
                application.id ||
                Date.now(),

            studentName:
                safeText(
                    application.studentName,
                    "Unknown Student"
                ),

            opportunityTitle:
                safeText(
                    application.opportunityTitle,
                    "Opportunity"
                ),

            company:
                safeText(
                    application.company,
                    "SkillBridge Employer"
                ),

            status:
                safeText(
                    application.status,
                    "Pending"
                ),

            matchScore:
                Number(
                    application.matchScore
                ) || 0,

            matchedSkills:
                safeArray(
                    application.matchedSkills
                ),

            missingSkills:
                safeArray(
                    application.missingSkills
                ),

            appliedAt:
                safeText(
                    application.appliedAt,
                    "Recently"
                )

        };

    }


    applications =
        applications.map(
            normalizeApplication
        );


    /* =====================================================
       SAVE APPLICATIONS
    ===================================================== */

    function saveApplications() {

        localStorage.setItem(
            "skillbridgeApplications",
            JSON.stringify(applications)
        );

    }


    /* =====================================================
       SUMMARY
    ===================================================== */

    function updateSummary() {

        const pending =
            applications.filter(
                function (application) {

                    return (
                        application.status ===
                        "Pending"
                    );

                }
            ).length;


        const accepted =
            applications.filter(
                function (application) {

                    return (
                        application.status ===
                        "Accepted"
                    );

                }
            ).length;


        if (totalApplications) {

            totalApplications.textContent =
                applications.length;

        }


        if (pendingApplications) {

            pendingApplications.textContent =
                pending;

        }


        if (acceptedApplications) {

            acceptedApplications.textContent =
                accepted;

        }

    }


    /* =====================================================
       MATCH COLOR
    ===================================================== */

    function getMatchClass(score) {

        score = Number(score) || 0;


        if (score >= 90) {

            return "match-excellent";

        }


        if (score >= 75) {

            return "match-strong";

        }


        if (score >= 60) {

            return "match-good";

        }


        return "match-low";

    }


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    function getStatusClass(status) {

        return safeText(
            status,
            "Pending"
        )
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );

    }


    /* =====================================================
       RENDER APPLICATIONS
    ===================================================== */

    function renderApplications() {

        if (!container) {

            console.error(
                "applicationsContainer was not found."
            );

            return;

        }


        container.innerHTML = "";


        const filter =
            statusFilter
                ? statusFilter.value
                : "All";


        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let filtered =
            applications.filter(
                function (application) {

                    const studentName =
                        safeText(
                            application.studentName
                        ).toLowerCase();


                    const opportunityTitle =
                        safeText(
                            application.opportunityTitle
                        ).toLowerCase();


                    const company =
                        safeText(
                            application.company
                        ).toLowerCase();


                    const status =
                        safeText(
                            application.status,
                            "Pending"
                        );


                    const matchesStatus =
                        filter === "All" ||
                        status === filter;


                    const matchesSearch =
                        !search ||
                        studentName.includes(search) ||
                        opportunityTitle.includes(search) ||
                        company.includes(search);


                    return (
                        matchesStatus &&
                        matchesSearch
                    );

                }
            );


        /* =================================================
           SORT BY MATCH SCORE
        ================================================= */

        filtered.sort(
            function (a, b) {

                return (
                    Number(b.matchScore) -
                    Number(a.matchScore)
                );

            }
        );


        /* =================================================
           EMPTY STATE
        ================================================= */

        if (filtered.length === 0) {

            container.innerHTML = `

                <div class="empty-applications">

                    <i class="
                        fa-solid
                        fa-user-group
                    "></i>

                    <h2>
                        No applications found
                    </h2>

                    <p>
                        Applications from students
                        will appear here.
                    </p>

                </div>

            `;

            return;

        }


        /* =================================================
           APPLICATION CARDS
        ================================================= */

        filtered.forEach(
            function (application) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "application-card";


                const status =
                    safeText(
                        application.status,
                        "Pending"
                    );


                const studentName =
                    safeText(
                        application.studentName,
                        "Unknown Student"
                    );


                const opportunityTitle =
                    safeText(
                        application.opportunityTitle,
                        "Opportunity"
                    );


                const matchedSkills =
                    safeArray(
                        application.matchedSkills
                    );


                const missingSkills =
                    safeArray(
                        application.missingSkills
                    );


                const matchScore =
                    Number(
                        application.matchScore
                    ) || 0;


                const avatar =
                    studentName
                        .substring(0, 2)
                        .toUpperCase();


                /* -----------------------------------------
                   MATCHED SKILLS
                ----------------------------------------- */

                const matchedSkillsHTML =
                    matchedSkills.length

                        ? matchedSkills
                            .map(
                                function (skill) {

                                    return `

                                        <span
                                            class="
                                                mini-tag
                                                matched
                                            "
                                        >

                                            ✓
                                            ${safeText(skill)}

                                        </span>

                                    `;

                                }
                            )
                            .join("")

                        : `

                            <span class="
                                mini-tag
                            ">
                                None
                            </span>

                          `;


                /* -----------------------------------------
                   MISSING SKILLS
                ----------------------------------------- */

                const missingSkillsHTML =
                    missingSkills.length

                        ? missingSkills
                            .map(
                                function (skill) {

                                    return `

                                        <span
                                            class="
                                                mini-tag
                                                missing
                                            "
                                        >

                                            ○
                                            ${safeText(skill)}

                                        </span>

                                    `;

                                }
                            )
                            .join("")

                        : `

                            <span class="
                                mini-tag
                            ">
                                None
                            </span>

                          `;


                /* -----------------------------------------
                   ACTION BUTTONS
                ----------------------------------------- */

                let actionButtons = `

                    <button
                        type="button"
                        class="
                            view-applicant-btn
                        "
                        data-id="${application.id}"
                    >

                        <i class="
                            fa-solid
                            fa-eye
                        "></i>

                        View

                    </button>

                `;


                if (status === "Pending") {

                    actionButtons += `

                        <button
                            type="button"
                            class="
                                accept-btn
                            "
                            data-id="${application.id}"
                        >

                            <i class="
                                fa-solid
                                fa-check
                            "></i>

                            Accept

                        </button>


                        <button
                            type="button"
                            class="
                                reject-btn
                            "
                            data-id="${application.id}"
                        >

                            <i class="
                                fa-solid
                                fa-xmark
                            "></i>

                            Reject

                        </button>

                    `;

                }


                /* -----------------------------------------
                   CARD
                ----------------------------------------- */

                card.innerHTML = `

                    <div class="
                        applicant-main
                    ">


                        <div class="
                            applicant-avatar
                        ">

                            ${avatar}

                        </div>


                        <div class="
                            applicant-info
                        ">

                            <h3>
                                ${studentName}
                            </h3>


                            <p>

                                Applied for:

                                <strong>
                                    ${opportunityTitle}
                                </strong>

                            </p>


                            <small>

                                Applied:

                                ${safeText(
                                    application.appliedAt,
                                    "Recently"
                                )}

                            </small>

                        </div>


                        <div class="
                            applicant-match
                            ${getMatchClass(
                                matchScore
                            )}
                        ">

                            <strong>

                                ${matchScore}%

                            </strong>

                            <span>
                                Match
                            </span>

                        </div>


                    </div>



                    <div class="
                        applicant-details
                    ">


                        <div class="
                            detail-block
                        ">

                            <span>
                                Matched Skills
                            </span>


                            <div class="
                                mini-tags
                            ">

                                ${matchedSkillsHTML}

                            </div>

                        </div>



                        <div class="
                            detail-block
                        ">

                            <span>
                                Skills to Develop
                            </span>


                            <div class="
                                mini-tags
                            ">

                                ${missingSkillsHTML}

                            </div>

                        </div>


                    </div>



                    <div class="
                        application-footer
                    ">


                        <span class="
                            application-status
                            ${getStatusClass(
                                status
                            )}
                        ">

                            ${status}

                        </span>


                        <div class="
                            application-actions
                        ">

                            ${actionButtons}

                        </div>


                    </div>

                `;


                container.appendChild(card);

            }
        );

    }


    /* =====================================================
       UPDATE STATUS
    ===================================================== */

    function updateApplicationStatus(
        id,
        newStatus
    ) {

        const application =
            applications.find(
                function (item) {

                    return (
                        String(item.id) ===
                        String(id)
                    );

                }
            );


        if (!application) {

            console.error(
                "Application not found:",
                id
            );

            return;

        }


        application.status =
            newStatus;


        saveApplications();

        updateSummary();

        renderApplications();

    }


    /* =====================================================
       BUTTON ACTIONS
    ===================================================== */

    if (container) {

        container.addEventListener(
            "click",
            function (event) {


                /* -----------------------------------------
                   ACCEPT
                ----------------------------------------- */

                const accept =
                    event.target.closest(
                        ".accept-btn"
                    );


                if (accept) {

                    const confirmed =
                        confirm(
                            "Accept this student?"
                        );


                    if (confirmed) {

                        updateApplicationStatus(
                            accept.dataset.id,
                            "Accepted"
                        );

                    }


                    return;

                }


                /* -----------------------------------------
                   REJECT
                ----------------------------------------- */

                const reject =
                    event.target.closest(
                        ".reject-btn"
                    );


                if (reject) {

                    const confirmed =
                        confirm(
                            "Reject this application?"
                        );


                    if (confirmed) {

                        updateApplicationStatus(
                            reject.dataset.id,
                            "Rejected"
                        );

                    }


                    return;

                }


                /* -----------------------------------------
                   VIEW APPLICANT
                ----------------------------------------- */

                const view =
                    event.target.closest(
                        ".view-applicant-btn"
                    );


                if (view) {

                    const application =
                        applications.find(
                            function (item) {

                                return (
                                    String(item.id) ===
                                    String(
                                        view.dataset.id
                                    )
                                );

                            }
                        );


                    if (!application) {

                        alert(
                            "Applicant information could not be found."
                        );

                        return;

                    }


                    /* -------------------------------------
                       SAVE SELECTED APPLICATION
                    ------------------------------------- */

                    localStorage.setItem(
                        "skillbridgeSelectedApplication",
                        JSON.stringify(
                            application
                        )
                    );


                    /* -------------------------------------
                       OPEN REAL PROFILE
                    ------------------------------------- */

                    window.location.href =
                        "applicant-profile.html";

                }

            }
        );

    }


    /* =====================================================
       FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderApplications
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderApplications
        );

    }


    /* =====================================================
       SAVE NORMALIZED DATA
    ===================================================== */

    saveApplications();


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSummary();

    renderApplications();

});