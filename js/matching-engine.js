/* ============================================================
   SKILLBRIDGE MATCHING ENGINE
   ------------------------------------------------------------
   Calculates how well a student matches an opportunity.
============================================================ */

const SkillBridgeMatching = {

    /* ========================================================
       NORMALIZE TEXT
    ======================================================== */

    normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    },


    /* ========================================================
       NORMALIZE ARRAY
    ======================================================== */

    normalizeArray(value) {

        if (!Array.isArray(value)) {
            return [];
        }

        return value.map(
            item => this.normalize(
                typeof item === "object"
                    ? item.name
                    : item
            )
        );

    },


    /* ========================================================
       SKILL MATCH
       Weight: 40%
    ======================================================== */

    calculateSkillMatch(student, opportunity) {

        const studentSkills =
            this.normalizeArray(
                student.skills
            );


        const requiredSkills =
            this.normalizeArray(
                opportunity.requiredSkills
            );


        if (requiredSkills.length === 0) {

            return {
                score: 40,
                matched: [],
                missing: []
            };

        }


        const matched =
            requiredSkills.filter(
                skill =>
                    studentSkills.includes(skill)
            );


        const missing =
            requiredSkills.filter(
                skill =>
                    !studentSkills.includes(skill)
            );


        const percentage =
            matched.length /
            requiredSkills.length;


        return {

            score:
                percentage * 40,

            matched,

            missing

        };

    },


    /* ========================================================
       PROJECT MATCH
       Weight: 20%
    ======================================================== */

    calculateProjectMatch(
        student,
        opportunity
    ) {

        const projects =
            Array.isArray(student.projects)
                ? student.projects
                : [];


        if (
            projects.length === 0
        ) {

            return 0;

        }


        const opportunityText =
            this.normalize(
                `
                ${opportunity.title || ""}
                ${opportunity.description || ""}
                ${opportunity.category || ""}
                `
            );


        let relatedProjects = 0;


        projects.forEach(
            project => {

                const projectText =
                    this.normalize(
                        `
                        ${project.title || ""}
                        ${project.description || ""}
                        ${project.category || ""}
                        `
                    );


                const words =
                    opportunityText
                        .split(/\s+/)
                        .filter(
                            word =>
                                word.length > 3
                        );


                const related =
                    words.some(
                        word =>
                            projectText.includes(
                                word
                            )
                    );


                if (related) {
                    relatedProjects++;
                }

            }
        );


        if (
            relatedProjects === 0
        ) {

            return 0;

        }


        return Math.min(
            relatedProjects * 10,
            20
        );

    },


    /* ========================================================
       EXPERIENCE MATCH
       Weight: 15%
    ======================================================== */

    calculateExperienceMatch(
        student,
        opportunity
    ) {

        const experiences =
            Array.isArray(
                student.experiences
            )
                ? student.experiences
                : [];


        if (
            experiences.length === 0
        ) {

            return 0;

        }


        const opportunityText =
            this.normalize(
                `
                ${opportunity.title || ""}
                ${opportunity.description || ""}
                ${opportunity.category || ""}
                `
            );


        let relevant = 0;


        experiences.forEach(
            experience => {

                const experienceText =
                    this.normalize(
                        `
                        ${experience.title || ""}
                        ${experience.organization || ""}
                        ${experience.description || ""}
                        `
                    );


                if (
                    experienceText
                        .split(/\s+/)
                        .some(
                            word =>
                                word.length > 3 &&
                                opportunityText.includes(
                                    word
                                )
                        )
                ) {

                    relevant++;

                }

            }
        );


        if (!relevant) {

            return 0;

        }


        return Math.min(
            relevant * 7.5,
            15
        );

    },


    /* ========================================================
       VERIFIED ACTIVITIES
       Weight: 10%
    ======================================================== */

    calculateActivityMatch(
        student,
        opportunity
    ) {

        const activities =
            Array.isArray(
                student.activities
            )
                ? student.activities
                : [];


        if (
            activities.length === 0
        ) {

            return 0;

        }


        const requiredSkills =
            this.normalizeArray(
                opportunity.requiredSkills
            );


        const relevantActivities =
            activities.filter(
                activity => {

                    const skill =
                        this.normalize(
                            activity.skill
                        );


                    return requiredSkills.includes(
                        skill
                    );

                }
            );


        return Math.min(
            relevantActivities.length * 2.5,
            10
        );

    },


    /* ========================================================
       CERTIFICATE MATCH
       Weight: 10%
    ======================================================== */

    calculateCertificateMatch(
        student,
        opportunity
    ) {

        const certificates =
            Array.isArray(
                student.certificates
            )
                ? student.certificates
                : [];


        if (
            certificates.length === 0
        ) {

            return 0;

        }


        const requiredSkills =
            this.normalizeArray(
                opportunity.requiredSkills
            );


        let matches = 0;


        certificates.forEach(
            certificate => {

                const certificateText =
                    this.normalize(
                        `
                        ${certificate.name || ""}
                        ${certificate.title || ""}
                        ${certificate.skill || ""}
                        ${certificate.issuer || ""}
                        `
                    );


                if (
                    requiredSkills.some(
                        skill =>
                            certificateText.includes(
                                skill
                            )
                    )
                ) {

                    matches++;

                }

            }
        );


        return Math.min(
            matches * 5,
            10
        );

    },


    /* ========================================================
       LEARNING DIRECTION
       Weight: 5%
    ======================================================== */

    calculateLearningMatch(
        student,
        opportunity
    ) {

        const learning =
            this.normalizeArray(
                student.learningSkills
            );


        const requiredSkills =
            this.normalizeArray(
                opportunity.requiredSkills
            );


        if (
            learning.length === 0 ||
            requiredSkills.length === 0
        ) {

            return 0;

        }


        const matches =
            learning.filter(
                skill =>
                    requiredSkills.includes(
                        skill
                    )
            );


        if (
            matches.length === 0
        ) {

            return 0;

        }


        return Math.min(
            matches.length * 2.5,
            5
        );

    },


    /* ========================================================
       FINAL MATCH
    ======================================================== */

    calculateMatch(
        student,
        opportunity
    ) {

        const skills =
            this.calculateSkillMatch(
                student,
                opportunity
            );


        const projects =
            this.calculateProjectMatch(
                student,
                opportunity
            );


        const experience =
            this.calculateExperienceMatch(
                student,
                opportunity
            );


        const activities =
            this.calculateActivityMatch(
                student,
                opportunity
            );


        const certificates =
            this.calculateCertificateMatch(
                student,
                opportunity
            );


        const learning =
            this.calculateLearningMatch(
                student,
                opportunity
            );


        const total =
            Math.round(
                skills.score +
                projects +
                experience +
                activities +
                certificates +
                learning
            );


        let rating;


        if (total >= 90) {

            rating = "Excellent Match";

        } else if (total >= 75) {

            rating = "Strong Match";

        } else if (total >= 60) {

            rating = "Good Match";

        } else if (total >= 40) {

            rating = "Potential Match";

        } else {

            rating = "Low Match";

        }


        return {

            score: total,

            rating: rating,

            matchedSkills:
                skills.matched,

            missingSkills:
                skills.missing,

            breakdown: {

                skills:
                    Math.round(
                        skills.score
                    ),

                projects:
                    Math.round(
                        projects
                    ),

                experience:
                    Math.round(
                        experience
                    ),

                activities:
                    Math.round(
                        activities
                    ),

                certificates:
                    Math.round(
                        certificates
                    ),

                learning:
                    Math.round(
                        learning
                    )

            }

        };

    }

};