document.addEventListener("DOMContentLoaded", function () {

    console.log("SkillBridge Profile Loaded");


    /* =====================================================
       STORAGE
       ===================================================== */

    let skills = JSON.parse(
        localStorage.getItem("skillbridgeSkills")
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


    let learningSkills = JSON.parse(
        localStorage.getItem("skillbridgeLearningSkills")
    ) || [
        "JavaScript",
        "React",
        "Backend Development"
    ];


    let experiences = JSON.parse(
        localStorage.getItem("skillbridgeExperiences")
    ) || [];


    let activities = JSON.parse(
        localStorage.getItem("skillbridgeActivities")
    ) || [];


    function saveAll() {

        localStorage.setItem(
            "skillbridgeSkills",
            JSON.stringify(skills)
        );

        localStorage.setItem(
            "skillbridgeLearningSkills",
            JSON.stringify(learningSkills)
        );

        localStorage.setItem(
            "skillbridgeExperiences",
            JSON.stringify(experiences)
        );

        localStorage.setItem(
            "skillbridgeActivities",
            JSON.stringify(activities)
        );

    }


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const addSkillBtn =
        document.getElementById("addSkillBtn");

    const skillForm =
        document.getElementById("skillForm");

    const skillInput =
        document.getElementById("skillInput");

    const skillLevel =
        document.getElementById("skillLevel");

    const saveSkillBtn =
        document.getElementById("saveSkillBtn");

    const cancelSkillBtn =
        document.getElementById("cancelSkillBtn");

    const skillsContainer =
        document.getElementById("skillsContainer");


    const addLearningSkillBtn =
        document.getElementById("addLearningSkillBtn");

    const learningSkillForm =
        document.getElementById("learningSkillForm");

    const learningSkillInput =
        document.getElementById("learningSkillInput");

    const saveLearningSkillBtn =
        document.getElementById("saveLearningSkillBtn");

    const cancelLearningSkillBtn =
        document.getElementById("cancelLearningSkillBtn");

    const learningSkillsContainer =
        document.getElementById(
            "learningSkillsContainer"
        );


    const addExperienceBtn =
        document.getElementById("addExperienceBtn");

    const experienceForm =
        document.getElementById("experienceForm");

    const saveExperienceBtn =
        document.getElementById("saveExperienceBtn");

    const cancelExperienceBtn =
        document.getElementById("cancelExperienceBtn");


    const addActivityBtn =
        document.getElementById("addActivityBtn");

    const activityForm =
        document.getElementById("activityForm");

    const saveActivityBtn =
        document.getElementById("saveActivityBtn");

    const cancelActivityBtn =
        document.getElementById("cancelActivityBtn");

    const activityList =
        document.getElementById("activityList");


    /* =====================================================
       HELPERS
       ===================================================== */

    function openForm(form) {

        if (form) {

            form.style.display = "block";

        }

    }


    function closeForm(form) {

        if (form) {

            form.style.display = "none";

        }

    }


    /* =====================================================
       MY SKILLS
       ===================================================== */

    function renderSkills() {

        if (!skillsContainer) {

            console.error(
                "SkillBridge: skillsContainer not found."
            );

            return;

        }


        skillsContainer.innerHTML = "";


        if (skills.length === 0) {

            skillsContainer.innerHTML = `
                
                <p class="empty-skills">
                    No skills added yet.
                </p>

            `;

            return;

        }


        skills.forEach(function (skill, index) {

            const skillItem =
                document.createElement("div");

            skillItem.className =
                "skill-item";


            skillItem.innerHTML = `

                <div class="skill-info">

                    <strong>
                        ${skill.name}
                    </strong>

                    <small>
                        ${skill.level}
                    </small>

                </div>

                <button
                    type="button"
                    class="remove-skill"
                    data-index="${index}"
                    title="Remove skill"
                >
                    ×
                </button>

            `;


            skillsContainer.appendChild(
                skillItem
            );

        });

    }


    /* OPEN ADD SKILL FORM */

    if (addSkillBtn) {

        addSkillBtn.addEventListener(
            "click",
            function () {

                openForm(skillForm);

                if (skillInput) {

                    skillInput.focus();

                }

            }
        );

    }


    /* SAVE SKILL */

    if (saveSkillBtn) {

        saveSkillBtn.addEventListener(
            "click",
            function () {

                const name =
                    skillInput
                        ? skillInput.value.trim()
                        : "";


                const level =
                    skillLevel
                        ? skillLevel.value
                        : "";


                if (!name) {

                    alert(
                        "Please enter a skill name."
                    );

                    if (skillInput) {

                        skillInput.focus();

                    }

                    return;

                }


                if (!level) {

                    alert(
                        "Please select your proficiency level."
                    );

                    if (skillLevel) {

                        skillLevel.focus();

                    }

                    return;

                }


                const exists =
                    skills.some(
                        function (skill) {

                            return (
                                skill.name.toLowerCase() ===
                                name.toLowerCase()
                            );

                        }
                    );


                if (exists) {

                    alert(
                        "This skill has already been added."
                    );

                    return;

                }


                skills.push({

                    name: name,

                    level: level

                });


                saveAll();

                renderSkills();

                loadActivitySkills();

                updateStats();


                if (skillInput) {

                    skillInput.value = "";

                }


                if (skillLevel) {

                    skillLevel.value = "";

                }


                closeForm(skillForm);

            }
        );

    }


    /* CANCEL SKILL */

    if (cancelSkillBtn) {

        cancelSkillBtn.addEventListener(
            "click",
            function () {

                if (skillInput) {

                    skillInput.value = "";

                }


                if (skillLevel) {

                    skillLevel.value = "";

                }


                closeForm(skillForm);

            }
        );

    }


    /* REMOVE SKILL */

    if (skillsContainer) {

        skillsContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".remove-skill"
                    );


                if (!button) return;


                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    !Number.isNaN(index) &&
                    index >= 0 &&
                    index < skills.length
                ) {

                    skills.splice(
                        index,
                        1
                    );


                    saveAll();

                    renderSkills();

                    loadActivitySkills();

                    updateStats();

                }

            }
        );

    }


    /* =====================================================
       SKILLS I WANT TO LEARN
       ===================================================== */

    function renderLearningSkills() {

        if (!learningSkillsContainer) {

            console.error(
                "SkillBridge: learningSkillsContainer not found."
            );

            return;

        }


        learningSkillsContainer.innerHTML = "";


        if (learningSkills.length === 0) {

            learningSkillsContainer.innerHTML = `

                <p class="empty-skills">
                    No learning goals added yet.
                </p>

            `;

            return;

        }


        learningSkills.forEach(
            function (skill, index) {

                const tag =
                    document.createElement("div");

                tag.className =
                    "learning-item";


                tag.innerHTML = `

                    <span>
                        ${skill}
                    </span>

                    <button
                        type="button"
                        class="remove-learning-skill"
                        data-index="${index}"
                        title="Remove skill"
                    >
                        ×
                    </button>

                `;


                learningSkillsContainer.appendChild(
                    tag
                );

            }
        );

    }


    /* OPEN LEARNING SKILL FORM */

    if (addLearningSkillBtn) {

        addLearningSkillBtn.addEventListener(
            "click",
            function () {

                openForm(
                    learningSkillForm
                );


                if (learningSkillInput) {

                    learningSkillInput.focus();

                }

            }
        );

    }


    /* SAVE LEARNING SKILL */

    if (saveLearningSkillBtn) {

        saveLearningSkillBtn.addEventListener(
            "click",
            function () {

                const name =
                    learningSkillInput
                        ? learningSkillInput.value.trim()
                        : "";


                if (!name) {

                    alert(
                        "Please enter a skill you want to learn."
                    );

                    return;

                }


                const exists =
                    learningSkills.some(
                        function (skill) {

                            return (
                                skill.toLowerCase() ===
                                name.toLowerCase()
                            );

                        }
                    );


                if (exists) {

                    alert(
                        "This skill is already on your learning list."
                    );

                    return;

                }


                learningSkills.push(name);

                saveAll();

                renderLearningSkills();


                if (learningSkillInput) {

                    learningSkillInput.value = "";

                }


                closeForm(
                    learningSkillForm
                );

            }
        );

    }


    /* CANCEL LEARNING SKILL */

    if (cancelLearningSkillBtn) {

        cancelLearningSkillBtn.addEventListener(
            "click",
            function () {

                if (learningSkillInput) {

                    learningSkillInput.value = "";

                }


                closeForm(
                    learningSkillForm
                );

            }
        );

    }


    /* REMOVE LEARNING SKILL */

    if (learningSkillsContainer) {

        learningSkillsContainer.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".remove-learning-skill"
                    );


                if (!button) return;


                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    !Number.isNaN(index) &&
                    index >= 0 &&
                    index < learningSkills.length
                ) {

                    learningSkills.splice(
                        index,
                        1
                    );


                    saveAll();

                    renderLearningSkills();

                }

            }
        );

    }


    /* =====================================================
       EXPERIENCE
       ===================================================== */

    function clearExperienceForm() {

        const fields = [

            "experienceTitle",

            "experienceOrganization",

            "experienceDescription",

            "experienceStart",

            "experienceEnd"

        ];


        fields.forEach(
            function (id) {

                const field =
                    document.getElementById(id);


                if (field) {

                    field.value = "";

                }

            }
        );

    }


    if (addExperienceBtn) {

        addExperienceBtn.addEventListener(
            "click",
            function () {

                openForm(
                    experienceForm
                );

            }
        );

    }


    if (cancelExperienceBtn) {

        cancelExperienceBtn.addEventListener(
            "click",
            function () {

                clearExperienceForm();

                closeForm(
                    experienceForm
                );

            }
        );

    }


    if (saveExperienceBtn) {

        saveExperienceBtn.addEventListener(
            "click",
            function () {

                const titleField =
                    document.getElementById(
                        "experienceTitle"
                    );

                const organizationField =
                    document.getElementById(
                        "experienceOrganization"
                    );

                const descriptionField =
                    document.getElementById(
                        "experienceDescription"
                    );

                const startField =
                    document.getElementById(
                        "experienceStart"
                    );

                const endField =
                    document.getElementById(
                        "experienceEnd"
                    );


                const title =
                    titleField
                        ? titleField.value.trim()
                        : "";


                const organization =
                    organizationField
                        ? organizationField.value.trim()
                        : "";


                const description =
                    descriptionField
                        ? descriptionField.value.trim()
                        : "";


                const start =
                    startField
                        ? startField.value.trim()
                        : "";


                const end =
                    endField
                        ? endField.value.trim()
                        : "";


                if (
                    !title ||
                    !organization ||
                    !description ||
                    !start
                ) {

                    alert(
                        "Please complete the required experience fields."
                    );

                    return;

                }


                experiences.push({

                    id: Date.now(),

                    title: title,

                    organization:
                        organization,

                    description:
                        description,

                    start: start,

                    end:
                        end || "Present"

                });


                saveAll();

                renderExperiences();

                clearExperienceForm();

                closeForm(
                    experienceForm
                );

            }
        );

    }


    function renderExperiences() {

        if (!experienceForm) return;


        let container =
            document.getElementById(
                "dynamicExperiences"
            );


        if (!container) {

            container =
                document.createElement("div");

            container.id =
                "dynamicExperiences";


            experienceForm.parentNode.insertBefore(
                container,
                experienceForm
            );

        }


        container.innerHTML = "";


        experiences.forEach(
            function (experience, index) {

                const item =
                    document.createElement("div");

                item.className =
                    "experience-item";


                item.innerHTML = `

                    <div class="experience-icon">
                        💼
                    </div>

                    <div class="experience-content">

                        <h3>
                            ${experience.title}
                        </h3>

                        <strong>
                            ${experience.organization}
                        </strong>

                        <p>
                            ${experience.description}
                        </p>

                        <small>
                            ${experience.start}
                            -
                            ${experience.end}
                        </small>

                    </div>

                    <button
                        type="button"
                        class="remove-experience"
                        data-index="${index}"
                        title="Remove experience"
                    >
                        ×
                    </button>

                `;


                container.appendChild(
                    item
                );

            }
        );

    }


    if (experienceForm) {

        experienceForm.parentElement.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".remove-experience"
                    );


                if (!button) return;


                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    !Number.isNaN(index) &&
                    index >= 0 &&
                    index < experiences.length
                ) {

                    experiences.splice(
                        index,
                        1
                    );


                    saveAll();

                    renderExperiences();

                }

            }
        );

    }


    /* =====================================================
       ACTIVITIES
       ===================================================== */

    function loadActivitySkills() {

        const select =
            document.getElementById(
                "activitySkill"
            );


        if (!select) return;


        select.innerHTML = `

            <option value="">
                Select a skill
            </option>

        `;


        skills.forEach(
            function (skill) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    skill.name;


                option.textContent =
                    skill.name;


                select.appendChild(
                    option
                );

            }
        );

    }


    function clearActivityForm() {

        const fields = [

            "activityTitle",

            "activitySkill",

            "activityResult",

            "activityEvidence"

        ];


        fields.forEach(
            function (id) {

                const field =
                    document.getElementById(id);


                if (field) {

                    field.value = "";

                }

            }
        );

    }


    /* OPEN ACTIVITY FORM */

    if (addActivityBtn) {

        addActivityBtn.addEventListener(
            "click",
            function () {

                openForm(
                    activityForm
                );


                loadActivitySkills();

            }
        );

    }


    /* CANCEL ACTIVITY */

    if (cancelActivityBtn) {

        cancelActivityBtn.addEventListener(
            "click",
            function () {

                clearActivityForm();

                closeForm(
                    activityForm
                );

            }
        );

    }


    /* SAVE ACTIVITY */

    if (saveActivityBtn) {

        saveActivityBtn.addEventListener(
            "click",
            function () {

                const titleField =
                    document.getElementById(
                        "activityTitle"
                    );

                const skillField =
                    document.getElementById(
                        "activitySkill"
                    );

                const resultField =
                    document.getElementById(
                        "activityResult"
                    );

                const evidenceField =
                    document.getElementById(
                        "activityEvidence"
                    );


                const title =
                    titleField
                        ? titleField.value.trim()
                        : "";


                const skill =
                    skillField
                        ? skillField.value
                        : "";


                const result =
                    resultField
                        ? resultField.value
                        : "";


                const evidence =
                    evidenceField
                        ? evidenceField.value.trim()
                        : "";


                if (
                    !title ||
                    !skill ||
                    !result
                ) {

                    alert(
                        "Please complete the activity form."
                    );

                    return;

                }


                activities.push({

                    id: Date.now(),

                    title: title,

                    skill: skill,

                    result: result,

                    evidence:
                        evidence ||
                        "No evidence",

                    date:
                        new Date()
                            .toLocaleDateString()

                });


                saveAll();

                renderActivities();

                clearActivityForm();

                closeForm(
                    activityForm
                );

                updateStats();

            }
        );

    }


    /* DISPLAY ACTIVITIES */

    function renderActivities() {

        if (!activityList) return;


        activityList.innerHTML = "";


        if (activities.length === 0) {

            activityList.innerHTML = `

                <div class="empty-activity">

                    <div class="empty-activity-icon">
                        🎯
                    </div>

                    <h3>
                        No activities yet
                    </h3>

                    <p>
                        Add activities to show
                        what you have accomplished.
                    </p>

                </div>

            `;

            return;

        }


        activities
            .slice()
            .reverse()
            .forEach(
                function (activity) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "activity-item";


                    item.innerHTML = `

                        <div class="activity-icon">
                            ✓
                        </div>

                        <div class="activity-content">

                            <h3>
                                ${activity.title}
                            </h3>

                            <p>
                                ${activity.date}
                            </p>

                            <div class="activity-meta">

                                <span class="activity-badge">
                                    ${activity.skill}
                                </span>

                                <span class="success-badge">
                                    ✓ ${activity.result}
                                </span>

                                <span class="evidence-badge">
                                    📎 ${activity.evidence}
                                </span>

                            </div>

                        </div>

                    `;


                    activityList.appendChild(
                        item
                    );

                }
            );

    }


    /* =====================================================
       PROFILE STATISTICS
       ===================================================== */

    function updateStats() {

        const stats =
            document.querySelectorAll(
                ".journey-stat strong"
            );


        /*
            0 = Projects
            1 = Activities
            2 = Certificates
            3 = Skills
        */


        if (stats[1]) {

            stats[1].textContent =
                activities.length;

        }


        if (stats[3]) {

            stats[3].textContent =
                skills.length;

        }

    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    renderSkills();

    renderLearningSkills();

    renderExperiences();

    renderActivities();

    loadActivitySkills();

    updateStats();


});


function renderVerifiedWork() {

    const container =
        document.getElementById(
            "verifiedWorkContainer"
        );

    const counter =
        document.getElementById(
            "verifiedWorkCount"
        );


    if (!container) return;


    const verifiedActivities = [];


    /*
     * Search project activity storage.
     */

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


        const projectId =
            key.replace(
                "skillbridgeProjectActivities_",
                ""
            );


        const activities =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];


        activities.forEach(
            function (activity) {

                if (
                    activity.verified === true
                ) {

                    verifiedActivities.push({

                        projectId:
                            projectId,

                        activity:
                            activity

                    });

                }

            }
        );

    }


    if (counter) {

        counter.textContent =
            verifiedActivities.length;

    }


    if (
        verifiedActivities.length === 0
    ) {

        container.innerHTML = `

            <div class="verified-empty">

                <i class="fa-solid fa-shield-halved"></i>

                <h3>
                    No verified work yet
                </h3>

                <p>
                    Complete projects and submit evidence
                    to build your verified record.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    verifiedActivities
        .slice()
        .reverse()
        .forEach(
            function (item) {

                const activity =
                    item.activity;


                const evidence =
                    activity.evidence;


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "verified-work-item";


                card.innerHTML = `

                    <div class="verified-work-icon">

                        <i class="fa-solid fa-check"></i>

                    </div>


                    <div class="verified-work-content">

                        <h3>
                            ${activity.title}
                        </h3>


                        <p>
                            ${activity.description || "Verified project contribution."}
                        </p>


                        <div class="verified-work-meta">

                            <span class="verified-work-tag">

                                Project #${item.projectId}

                            </span>


                            ${
                                activity.skill
                                    ? `
                                    <span class="verified-work-tag">

                                        ${activity.skill}

                                    </span>
                                    `
                                    : ""
                            }


                            <span class="verified-badge">

                                ✓ Verified

                            </span>

                        </div>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );

}