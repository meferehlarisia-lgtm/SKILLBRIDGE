document.addEventListener(
    "DOMContentLoaded",
    function () {

        const opportunities =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeEmployerOpportunities"
                )
            ) || [];


        const applications =
            JSON.parse(
                localStorage.getItem(
                    "skillbridgeApplications"
                )
            ) || [];


        const selected =
            applications.filter(
                function (application) {

                    return (
                        application.status ===
                        "Accepted"
                    );

                }
            );


        const totalOpportunities =
            document.getElementById(
                "totalOpportunities"
            );


        const totalApplications =
            document.getElementById(
                "totalApplications"
            );


        const matchedStudents =
            document.getElementById(
                "matchedStudents"
            );


        const selectedStudents =
            document.getElementById(
                "selectedStudents"
            );


        if (totalOpportunities) {

            totalOpportunities.textContent =
                opportunities.length;

        }


        if (totalApplications) {

            totalApplications.textContent =
                applications.length;

        }


        if (matchedStudents) {

            matchedStudents.textContent =
                applications.length;

        }


        if (selectedStudents) {

            selectedStudents.textContent =
                selected.length;

        }

    }
);