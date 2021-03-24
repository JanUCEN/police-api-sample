function test() {
    return fetch("https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-01")
        .then(result => result.json());
}

async function start() {

    let reports;
    const tbl = document.getElementById('dataTable');
    const tBody = tbl.tBodies[0];
    if (!localStorage.getItem("report")) {
        reports = await test();
        localStorage.setItem("report", JSON.stringify(reports));
    } else {
        reports = JSON.parse(localStorage.getItem("report"));
    }

    reports.forEach((report, id) => {
        const row = tBody.insertRow();
        const dateRow = row.insertCell(0);
        const categoryCell = row.insertCell(1);
        const streetCell = row.insertCell(2);
        const outcomeCell = row.insertCell(3);
        dateRow.innerHTML = report.month;
        categoryCell.innerHTML = report.category;
        streetCell.innerHTML = report.location.street.name;
        outcomeCell.innerHTML = report.outcome_status ? report.outcome_status.category : "none";
    });
    const categories = new Set(reports.map(report=>{
        return report.category;
    }))
    console.log(categories)

    $(tbl).dataTable();
}

window.addEventListener('load', start);