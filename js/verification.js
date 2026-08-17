document.addEventListener(
    "DOMContentLoaded",
    function () {

        const queue =
            document.getElementById(
                "verificationQueue"
            );


        /*
         * Find all project activity
         * storage entries.
         */

        const allActivities = [];


        for (
            let i = 0;
            i < localStorage.length;
            i++
        ) {

            const key =
                localStorage.key(i);


            if (
                key &&
                key.startsWith(
                    "skillbridgeProjectActivities_"
                )
            ) {

                const projectId =
                    Number(
                        key.replace(
                            "skillbridgeProjectActivities_",
                            ""
                        )
                    );


                const activities =
                    JSON.parse(
                        localStorage.getItem(key)
                    ) || [];


                activities.forEach(
                    function (activity) {

                        if (
                            activity.evidence
                        ) {

                            allActivities.push({

                                projectId:
                                    projectId,

                                activity:
                                    activity

                            });

                        }

                    }
                );

            }

        }


        /* =====================================
           STATISTICS
        ===================================== */

        function updateStats() {

            const pending =
                allActivities.filter(
                    function (item) {

                        return (
                            !item.activity.evidence.status ||
                            item.activity.evidence.status ===
                            "Pending Review"
                        );

                    }
                ).length;


            const verified =
                allActivities.filter(
                    function (item) {

                        return (
                            item.activity.evidence.status ===
                            "Verified"
                        );

                    }
                ).length;


            const revision =
                allActivities.filter(
                    function (item) {

                        return (
                            item.activity.evidence.status ===
                            "Needs Revision"
                        );

                    }
                ).length;


            document.getElementById(
                "pendingCount"
            ).textContent = pending;


            document.getElementById(
                "verifiedCount"
            ).textContent = verified;


            document.getElementById(
                "revisionCount"
            ).textContent = revision;

        }


        /* =====================================
           RENDER QUEUE
        ===================================== */

        function renderQueue() {

            queue.innerHTML = "";


            if (
                allActivities.length === 0
            ) {

                queue.innerHTML = `

                    <div class="verification-empty">

                        <i class="fa-solid fa-circle-check"></i>

                        <h3>
                            No evidence submitted
                        </h3>

                        <p>
                            Evidence submitted by students
                            will appear here.
                        </p>

                    </div>

                `;

                return;

            }


            allActivities.forEach(
                function (item, index) {

                    const activity =
                        item.activity;


                    const evidence =
                        activity.evidence;


                    const status =
                        evidence.status ||
                        "Pending Review";


                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "verification-item";


                    card.innerHTML = `

                        <div class="verification-item-icon">

                            <i class="fa-solid fa-file-circle-check"></i>

                        </div>


                        <div class="verification-item-content">

                            <span class="project-category">
                                Project #${item.projectId}
                            </span>


                            <h3>
                                ${activity.title}
                            </h3>


                            <p>
                                ${activity.description}
                            </p>


                            <div class="verification-evidence">

                                <strong>
                                    Evidence
                                </strong>

                                <span>
                                    ${evidence.name}
                                </span>

                            </div>


                            <div class="verification-meta">

                                <span>

                                    <i class="fa-solid fa-calendar"></i>

                                    ${evidence.submittedAt}

                                </span>


                                <span class="verification-status ${getStatusClass(status)}">

                                    ${status}

                                </span>

                            </div>


                            ${
                                status ===
                                "Pending Review"
                                    ? `

                                    <div class="verification-actions">

                                        <button
                                            type="button"
                                            class="verify-btn"
                                            data-index="${index}"
                                            data-action="verify"
                                        >

                                            <i class="fa-solid fa-check"></i>

                                            Verify

                                        </button>


                                        <button
                                            type="button"
                                            class="revision-btn"
                                            data-index="${index}"
                                            data-action="revision"
                                        >

                                            <i class="fa-solid fa-rotate-left"></i>

                                            Request Revision

                                        </button>

                                    </div>

                                    `
                                    : ""
                            }

                        </div>

                    `;


                    queue.appendChild(
                        card
                    );

                }
            );

        }


        function getStatusClass(
            status
        ) {

            if (
                status ===
                "Verified"
            ) {

                return "status-verified";

            }


            if (
                status ===
                "Needs Revision"
            ) {

                return "status-revision";

            }


            return "status-pending";

        }


        /* =====================================
           ACTIONS
        ===================================== */

        queue.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "button"
                    );


                if (!button) return;


                const index =
                    Number(
                        button.dataset.index
                    );


                const action =
                    button.dataset.action;


                const item =
                    allActivities[index];


                if (!item) return;


                const activity =
                    item.activity;


                const storageKey =
                    "skillbridgeProjectActivities_" +
                    item.projectId;


                const projectActivities =
                    JSON.parse(
                        localStorage.getItem(
                            storageKey
                        )
                    ) || [];


                const storedActivity =
                    projectActivities.find(
                        function (entry) {

                            return (
                                entry.id ===
                                activity.id
                            );

                        }
                    );


                if (!storedActivity) return;


                if (
                    action ===
                    "verify"
                ) {

                    storedActivity.evidence.status =
                        "Verified";


                    storedActivity.evidence.verifiedAt =
                        new Date()
                            .toLocaleDateString();


                    storedActivity.evidence.verifiedBy =
                        "SkillBridge Reviewer";

                        storedActivity.verified = true;

storedActivity.verifiedAt =
    new Date().toLocaleDateString();


                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(
                            projectActivities
                        )
                    );


                    activity.evidence.status =
                        "Verified";


                    activity.evidence.verifiedAt =
                        storedActivity
                            .evidence
                            .verifiedAt;


                    alert(
                        "Evidence verified successfully."
                    );

                }


                if (
                    action ===
                    "revision"
                ) {

                    storedActivity.evidence.status =
                        "Needs Revision";


                    localStorage.setItem(
                        storageKey,
                        JSON.stringify(
                            projectActivities
                        )
                    );


                    activity.evidence.status =
                        "Needs Revision";


                    alert(
                        "Revision requested."
                    );

                }


                updateStats();

                renderQueue();

            }
        );


        updateStats();

        renderQueue();

    }
);