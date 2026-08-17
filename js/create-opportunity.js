document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "opportunityForm"
            );


        const skillInput =
            document.getElementById(
                "requiredSkillInput"
            );


        const addSkillBtn =
            document.getElementById(
                "addRequiredSkillBtn"
            );


        const skillsList =
            document.getElementById(
                "requiredSkillsList"
            );


        let requiredSkills = [];


        /* ============================
           DISPLAY SKILLS
        ============================ */

        function renderSkills() {

            skillsList.innerHTML = "";


            requiredSkills.forEach(
                function (skill, index) {

                    const tag =
                        document.createElement(
                            "div"
                        );


                    tag.className =
                        "selected-skill";


                    tag.innerHTML = `

                        <span>
                            ${skill}
                        </span>

                        <button
                            type="button"
                            class="remove-required-skill"
                            data-index="${index}"
                        >
                            ×
                        </button>

                    `;


                    skillsList.appendChild(tag);

                }
            );

        }


        /* ============================
           ADD SKILL
        ============================ */

        function addSkill() {

            const skill =
                skillInput.value.trim();


            if (!skill) {

                alert(
                    "Please enter a skill."
                );

                skillInput.focus();

                return;

            }


            const exists =
                requiredSkills.some(
                    function (item) {

                        return (
                            item.toLowerCase() ===
                            skill.toLowerCase()
                        );

                    }
                );


            if (exists) {

                alert(
                    "This skill has already been added."
                );

                return;

            }


            requiredSkills.push(skill);


            skillInput.value = "";


            renderSkills();


            skillInput.focus();

        }


        if (addSkillBtn) {

            addSkillBtn.addEventListener(
                "click",
                addSkill
            );

        }


        if (skillInput) {

            skillInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        addSkill();

                    }

                }
            );

        }


        /* ============================
           REMOVE SKILL
        ============================ */

        skillsList.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".remove-required-skill"
                    );


                if (!button) return;


                const index =
                    Number(
                        button.dataset.index
                    );


                requiredSkills.splice(
                    index,
                    1
                );


                renderSkills();

            }
        );


        /* ============================
           SUBMIT
        ============================ */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (
                    requiredSkills.length === 0
                ) {

                    alert(
                        "Please add at least one required skill."
                    );

                    return;

                }


                const opportunity = {

                    id: Date.now(),

                    title:
                        document
                            .getElementById(
                                "opportunityTitle"
                            )
                            .value
                            .trim(),

                    company:
                        document
                            .getElementById(
                                "companyName"
                            )
                            .value
                            .trim(),

                    location:
                        document
                            .getElementById(
                                "opportunityLocation"
                            )
                            .value
                            .trim(),

                    type:
                        document
                            .getElementById(
                                "opportunityType"
                            )
                            .value,

                    description:
                        document
                            .getElementById(
                                "opportunityDescription"
                            )
                            .value
                            .trim(),

                    skills:
                        [...requiredSkills],

                    minimumProjects:
                        Number(
                            document
                                .getElementById(
                                    "minimumProjects"
                                )
                                .value
                        ),

                    minimumVerified:
                        Number(
                            document
                                .getElementById(
                                    "minimumVerified"
                                )
                                .value
                        ),

                    status:
                        "Published",

                    createdAt:
                        new Date()
                            .toLocaleDateString()

                };


                /* ============================
                   GET EXISTING OPPORTUNITIES
                ============================ */

                const opportunities =
                    JSON.parse(
                        localStorage.getItem(
                            "skillbridgeEmployerOpportunities"
                        )
                    ) || [];


                opportunities.push(
                    opportunity
                );


                localStorage.setItem(
                    "skillbridgeEmployerOpportunities",
                    JSON.stringify(
                        opportunities
                    )
                );


                /* ============================
                   ALSO MAKE IT AVAILABLE TO
                   STUDENT SIDE
                ============================ */

                const studentOpportunities =
                    JSON.parse(
                        localStorage.getItem(
                            "skillbridgeOpportunities"
                        )
                    ) || [];


                studentOpportunities.push(
                    opportunity
                );


                localStorage.setItem(
                    "skillbridgeOpportunities",
                    JSON.stringify(
                        studentOpportunities
                    )
                );


                alert(
                    "Opportunity published successfully!"
                );


                window.location.href =
                    "employer-opportunities.html";

            }
        );

    }
);