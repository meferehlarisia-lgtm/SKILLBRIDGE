document.addEventListener("DOMContentLoaded", function () {

    console.log("SkillBridge Project Workspace Loaded");


    /* =====================================================
       GET PROJECT ID
    ===================================================== */

    const params = new URLSearchParams(window.location.search);
    const projectId = Number(params.get("id"));


    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projects = [

        {
            id: 1,
            title: "Yaoundé Student Marketplace",
            category: "Web Development",
            icon: "fa-store",
            role: "Frontend Developer"
        },

        {
            id: 2,
            title: "TerraClean Community Platform",
            category: "Community",
            icon: "fa-leaf",
            role: "Frontend Developer"
        },

        {
            id: 3,
            title: "Student Skill Portfolio",
            category: "Web Development",
            icon: "fa-id-card",
            role: "UI Developer"
        },

        {
            id: 4,
            title: "Youth Brand Design Lab",
            category: "Graphic Design",
            icon: "fa-palette",
            role: "Graphic Designer"
        },

        {
            id: 5,
            title: "Campus Opportunity Finder",
            category: "Web Development",
            icon: "fa-compass",
            role: "Frontend Developer"
        },

        {
            id: 6,
            title: "Student Data Insights",
            category: "Data",
            icon: "fa-chart-line",
            role: "Data Analyst"
        }

    ];


    const project = projects.find(function (item) {
        return item.id === projectId;
    });


    if (!project) {

        alert("Project not found.");

        window.location.href = "my-projects.html";

        return;

    }


    /* =====================================================
       JOINED PROJECTS
    ===================================================== */

    let joinedProjects = JSON.parse(
        localStorage.getItem("skillbridgeJoinedProjects")
    ) || [];


    const membership = joinedProjects.find(function (item) {

        return Number(item.projectId) === project.id;

    });


    if (!membership) {

        alert("You have not joined this project yet.");

        window.location.href =
            "project-details.html?id=" + project.id;

        return;

    }


    /* =====================================================
       ACTIVITY STORAGE
    ===================================================== */

    const activityKey =
        "skillbridgeProjectActivities_" + project.id;


    let activities = JSON.parse(
        localStorage.getItem(activityKey)
    ) || [];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const hero =
        document.getElementById("workspaceHero");

    const role =
        document.getElementById("workspaceRole");

    const activitiesContainer =
        document.getElementById("workspaceActivities");

    const progressNumber =
        document.getElementById("workspaceProgressNumber");

    const progressFill =
        document.getElementById("workspaceProgressFill");

    const progressText =
        document.getElementById("workspaceProgressText");

    const teamContainer =
        document.getElementById("workspaceTeam");

    const activityForm =
        document.getElementById("workspaceActivityForm");

    const activityTitle =
        document.getElementById("workspaceActivityTitle");

    const activityDescription =
        document.getElementById("workspaceActivityDescription");

    const addActivityButton =
        document.getElementById("addWorkspaceActivityBtn");

    const cancelActivityButton =
        document.getElementById("cancelWorkspaceActivityBtn");

    const saveActivityButton =
        document.getElementById("saveWorkspaceActivityBtn");


    /* =====================================================
       EVIDENCE ELEMENTS
    ===================================================== */

    const evidenceModal =
        document.getElementById("evidenceModal");

    const evidenceName =
        document.getElementById("evidenceName");

    const evidenceLink =
        document.getElementById("evidenceLink");

    const evidenceNote =
        document.getElementById("evidenceNote");

    const saveEvidenceButton =
        document.getElementById("saveEvidenceBtn");

    const cancelEvidenceButton =
        document.getElementById("cancelEvidenceBtn");

    const closeEvidenceButton =
        document.getElementById("closeEvidenceModal");


    let selectedEvidenceActivityId = null;


    /* =====================================================
       HERO
    ===================================================== */

    if (hero) {

        hero.innerHTML = `

            <div class="workspace-project-icon">

                <i class="fa-solid ${project.icon}"></i>

            </div>


            <div class="workspace-project-info">

                <span class="project-category">
                    ${project.category}
                </span>

                <h2>
                    ${project.title}
                </h2>

                <p>
                    Work with other students,
                    complete activities and build
                    verifiable experience.
                </p>

            </div>


            <div class="workspace-active">

                <i class="fa-solid fa-circle"></i>

                Active

            </div>

        `;

    }


    /* =====================================================
       ROLE
    ===================================================== */

    if (role) {

        role.textContent =
            membership.role || project.role;

    }


    /* =====================================================
       TEAM
    ===================================================== */

    if (teamContainer) {

        teamContainer.innerHTML = `

            <div class="workspace-team-member">

                <div class="workspace-member-avatar">
                    FL
                </div>

                <div>

                    <strong>
                        Larisia
                    </strong>

                    <small>
                        ${membership.role || project.role}
                    </small>

                </div>

            </div>


            <div class="workspace-team-member">

                <div class="workspace-member-avatar">
                    ST
                </div>

                <div>

                    <strong>
                        Student Team Member
                    </strong>

                    <small>
                        UI/UX Designer
                    </small>

                </div>

            </div>


            <div class="workspace-team-member">

                <div class="workspace-member-avatar">
                    BK
                </div>

                <div>

                    <strong>
                        Backend Member
                    </strong>

                    <small>
                        Backend Developer
                    </small>

                </div>

            </div>

        `;

    }


    /* =====================================================
       SAVE ACTIVITIES
    ===================================================== */

    function saveActivities() {

        localStorage.setItem(
            activityKey,
            JSON.stringify(activities)
        );

    }


    /* =====================================================
       UPDATE PROJECT PROGRESS
    ===================================================== */

    function updateProgress() {

        const total = activities.length;


        const completed = activities.filter(function (activity) {

            return activity.completed === true;

        }).length;


        const progress =
            total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                );


        if (progressNumber) {

            progressNumber.textContent =
                progress + "%";

        }


        if (progressFill) {

            progressFill.style.width =
                progress + "%";

        }


        if (progressText) {

            if (total === 0) {

                progressText.textContent =
                    "No completed activities yet.";

            } else {

                progressText.textContent =
                    completed +
                    " of " +
                    total +
                    " activities completed.";

            }

        }


        /* UPDATE JOINED PROJECT */

        joinedProjects = joinedProjects.map(function (item) {

            if (Number(item.projectId) === project.id) {

                return {

                    ...item,

                    contributions: progress,

                    completedActivities: completed

                };

            }

            return item;

        });


        localStorage.setItem(
            "skillbridgeJoinedProjects",
            JSON.stringify(joinedProjects)
        );

    }


    /* =====================================================
       RENDER ACTIVITIES
    ===================================================== */

    function renderActivities() {

        if (!activitiesContainer) {
            return;
        }


        activitiesContainer.innerHTML = "";


        /* EMPTY STATE */

        if (activities.length === 0) {

            activitiesContainer.innerHTML = `

                <div class="workspace-empty">

                    <i class="fa-solid fa-list-check"></i>

                    <h3>
                        No activities yet
                    </h3>

                    <p>
                        Add your first project
                        activity to start tracking
                        your contribution.
                    </p>

                </div>

            `;

            updateProgress();

            return;

        }


        /* ACTIVITIES */

        activities
            .slice()
            .reverse()
            .forEach(function (activity) {

                const item =
                    document.createElement("div");


                item.className =
                    "workspace-activity";


                const statusClass =
                    activity.completed
                        ? "completed"
                        : "pending";


                const statusText =
                    activity.completed
                        ? "Completed"
                        : "In Progress";


                /*
                 * EVIDENCE STATUS
                 */

                let evidenceStatus = "";


                if (activity.completed) {

                    if (activity.evidence) {

                        evidenceStatus = `

                            <span class="verified-status evidence-submitted">

                                <i class="fa-solid fa-paperclip"></i>

                                Evidence Submitted

                            </span>

                        `;

                    } else {

                        evidenceStatus = `

                            <span class="verified-status evidence-missing">

                                <i class="fa-solid fa-triangle-exclamation"></i>

                                Evidence Required

                            </span>

                        `;

                    }

                }


                /*
                 * ACTION BUTTONS
                 */

                let actionButtons = "";


                if (!activity.completed) {

                    actionButtons = `

                        <button
                            type="button"
                            class="activity-action-btn complete-btn"
                            data-action="complete"
                            data-id="${activity.id}"
                        >

                            <i class="fa-solid fa-check"></i>

                            Mark Complete

                        </button>

                    `;

                } else {

                    actionButtons = `

                        <button
                            type="button"
                            class="activity-action-btn"
                            data-action="undo"
                            data-id="${activity.id}"
                        >

                            <i class="fa-solid fa-rotate-left"></i>

                            Mark Incomplete

                        </button>

                    `;


                    if (!activity.evidence) {

                        actionButtons += `

                            <button
                                type="button"
                                class="evidence-btn"
                                data-action="evidence"
                                data-id="${activity.id}"
                            >

                                <i class="fa-solid fa-paperclip"></i>

                                Submit Evidence

                            </button>

                        `;

                    }


                    if (activity.evidence) {

                        actionButtons += `

                            <button
                                type="button"
                                class="view-evidence-btn"
                                data-action="viewEvidence"
                                data-id="${activity.id}"
                            >

                                <i class="fa-solid fa-eye"></i>

                                View Evidence

                            </button>

                        `;

                    }

                }


                actionButtons += `

                    <button
                        type="button"
                        class="activity-delete-btn"
                        data-action="delete"
                        data-id="${activity.id}"
                        title="Delete activity"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                `;


                /*
                 * ACTIVITY HTML
                 */

                item.innerHTML = `

                    <div class="workspace-activity-check ${statusClass}">

                        <i class="fa-solid ${
                            activity.completed
                                ? "fa-check"
                                : "fa-clock"
                        }"></i>

                    </div>


                    <div class="workspace-activity-content">

                        <h3>
                            ${activity.title}
                        </h3>


                        <p>
                            ${activity.description}
                        </p>


                        <div class="workspace-activity-meta">

                            <span class="${statusClass}">
                                ${statusText}
                            </span>


                            <span>
                                ${activity.date}
                            </span>


                            ${evidenceStatus}

                        </div>


                        <div class="workspace-activity-actions">

                            ${actionButtons}

                        </div>

                    </div>

                `;


                activitiesContainer.appendChild(item);

            });


        updateProgress();

    }


    /* =====================================================
       OPEN ADD ACTIVITY FORM
    ===================================================== */

    if (addActivityButton) {

        addActivityButton.addEventListener(
            "click",
            function () {

                if (!activityForm) return;


                activityForm.style.display =
                    "block";


                if (activityTitle) {

                    activityTitle.focus();

                }

            }
        );

    }


    /* =====================================================
       CANCEL ADD ACTIVITY
    ===================================================== */

    if (cancelActivityButton) {

        cancelActivityButton.addEventListener(
            "click",
            function () {

                clearActivityForm();

                if (activityForm) {

                    activityForm.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       CLEAR ACTIVITY FORM
    ===================================================== */

    function clearActivityForm() {

        if (activityTitle) {

            activityTitle.value = "";

        }


        if (activityDescription) {

            activityDescription.value = "";

        }

    }


    /* =====================================================
       SAVE NEW ACTIVITY
    ===================================================== */

    if (saveActivityButton) {

        saveActivityButton.addEventListener(
            "click",
            function () {

                const title =
                    activityTitle
                        ? activityTitle.value.trim()
                        : "";


                const description =
                    activityDescription
                        ? activityDescription.value.trim()
                        : "";


                if (!title) {

                    alert(
                        "Please enter an activity title."
                    );

                    if (activityTitle) {

                        activityTitle.focus();

                    }

                    return;

                }


                if (!description) {

                    alert(
                        "Please describe the activity."
                    );

                    if (activityDescription) {

                        activityDescription.focus();

                    }

                    return;

                }


                activities.push({

                    id: Date.now(),

                    title: title,

                    description: description,

                    completed: false,

                    evidence: null,

                    date:
                        new Date()
                            .toLocaleDateString()

                });


                saveActivities();

                renderActivities();

                clearActivityForm();


                if (activityForm) {

                    activityForm.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       ACTIVITY ACTIONS
    ===================================================== */

    if (activitiesContainer) {

        activitiesContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest("button");


                if (!button) return;


                const action =
                    button.dataset.action;


                const id =
                    Number(button.dataset.id);


                const activity =
                    activities.find(function (item) {

                        return item.id === id;

                    });


                if (!activity) return;


                /* -----------------------------------------
                   COMPLETE
                ----------------------------------------- */

                if (action === "complete") {

                    activity.completed = true;

                    saveActivities();

                    renderActivities();

                    return;

                }


                /* -----------------------------------------
                   UNDO
                ----------------------------------------- */

                if (action === "undo") {

                    activity.completed = false;

                    /*
                     * Evidence is removed when activity
                     * becomes incomplete.
                     */

                    activity.evidence = null;

                    saveActivities();

                    renderActivities();

                    return;

                }


                /* -----------------------------------------
                   DELETE
                ----------------------------------------- */

                if (action === "delete") {

                    const confirmed =
                        confirm(
                            "Delete this activity?"
                        );


                    if (!confirmed) return;


                    activities =
                        activities.filter(function (item) {

                            return item.id !== id;

                        });


                    saveActivities();

                    renderActivities();

                    return;

                }


                /* -----------------------------------------
                   SUBMIT EVIDENCE
                ----------------------------------------- */

                if (action === "evidence") {

                    if (!evidenceModal) {

                        alert(
                            "Evidence form is not available on this page."
                        );

                        return;

                    }


                    selectedEvidenceActivityId =
                        id;


                    if (evidenceName) {

                        evidenceName.value = "";

                    }


                    if (evidenceLink) {

                        evidenceLink.value = "";

                    }


                    if (evidenceNote) {

                        evidenceNote.value = "";

                    }


                    evidenceModal.style.display =
                        "flex";


                    if (evidenceName) {

                        evidenceName.focus();

                    }


                    return;

                }


                /* -----------------------------------------
                   VIEW EVIDENCE
                ----------------------------------------- */

                if (action === "viewEvidence") {

                    if (!activity.evidence) {

                        alert(
                            "No evidence has been submitted for this activity."
                        );

                        return;

                    }


                    const evidence =
                        activity.evidence;


                    alert(

                        "Evidence: " +
                        evidence.name +

                        "\n\nLink: " +
                        evidence.link +

                        "\n\nNote: " +
                        evidence.note +

                        "\n\nStatus: " +
                        evidence.status

                    );


                    return;

                }

            }
        );

    }


    /* =====================================================
       SAVE EVIDENCE
    ===================================================== */

    if (saveEvidenceButton) {

        saveEvidenceButton.addEventListener(
            "click",
            function () {

                if (
                    selectedEvidenceActivityId === null
                ) {

                    return;

                }


                const name =
                    evidenceName
                        ? evidenceName.value.trim()
                        : "";


                const link =
                    evidenceLink
                        ? evidenceLink.value.trim()
                        : "";


                const note =
                    evidenceNote
                        ? evidenceNote.value.trim()
                        : "";


                if (!name) {

                    alert(
                        "Please enter an evidence name."
                    );

                    if (evidenceName) {

                        evidenceName.focus();

                    }

                    return;

                }


                if (!link) {

                    alert(
                        "Please provide an evidence link."
                    );

                    if (evidenceLink) {

                        evidenceLink.focus();

                    }

                    return;

                }


                const activity =
                    activities.find(function (item) {

                        return (
                            item.id ===
                            selectedEvidenceActivityId
                        );

                    });


                if (!activity) {

                    return;

                }


                activity.evidence = {

                    name: name,

                    link: link,

                    note:
                        note ||
                        "No additional note.",

                    status:
                        "Pending Review",

                    submittedAt:
                        new Date()
                            .toLocaleDateString()

                };


                saveActivities();

                closeEvidenceModal();

                renderActivities();

                selectedEvidenceActivityId =
                    null;


                alert(
                    "Evidence submitted successfully!"
                );

            }
        );

    }


    /* =====================================================
       CLOSE EVIDENCE MODAL
    ===================================================== */

    function closeEvidenceModal() {

        if (evidenceModal) {

            evidenceModal.style.display =
                "none";

        }


        selectedEvidenceActivityId =
            null;

    }


    if (cancelEvidenceButton) {

        cancelEvidenceButton.addEventListener(
            "click",
            function () {

                closeEvidenceModal();

            }
        );

    }


    if (closeEvidenceButton) {

        closeEvidenceButton.addEventListener(
            "click",
            function () {

                closeEvidenceModal();

            }
        );

    }


    /* =====================================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ===================================================== */

    if (evidenceModal) {

        evidenceModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    evidenceModal
                ) {

                    closeEvidenceModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY CLOSES MODAL
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                evidenceModal &&
                evidenceModal.style.display === "flex"
            ) {

                closeEvidenceModal();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderActivities();

});