document.getElementById("apiForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const sealine = document.getElementById("sealine").value;
    const portcode = document.getElementById("portcode").value;
    const portdestinationcode = document.getElementById("portdestinationcode").value;
    const fromdate = document.getElementById("fromdate").value;
    
    const apiUrl = "https://sirius.searates.com/schedule?sealine=" + sealine + "&portcode=" + portcode + "&portdestinationcode=" + portdestinationcode + "&fromdate=" + fromdate + "&weeksahead=2&direction=A&api_key=ZUF4-T389-EXJL-AOCW-MN27";
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const routes = data.response.routes;
        const table = document.getElementById("scheduleTable");
        table.innerHTML = ""; // Clear existing table data
        
        // Create table headers
        const headerRow = document.createElement("tr");
        const headerColumns = ["Sealine", "Vessel Name", "Departure Date", "Port Name", "Arrival Date", "Terminal"];
        for (let column of headerColumns) {
          const th = document.createElement("th");
          th.textContent = column;
          headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        
        // Create table rows with schedule data
        for (let route of routes) {
          for (let transShipment of route.transShipments) {
            const row = document.createElement("tr");
            const sealineColumn = document.createElement("td");
            sealineColumn.textContent = sealine;
            const vesselNameColumn = document.createElement("td");
            vesselNameColumn.textContent = transShipment.vesselName;
            const departureDateColumn = document.createElement("td");
            departureDateColumn.textContent = formatDate(transShipment.departure.date);
            const portNameColumn = document.createElement("td");
            portNameColumn.textContent = transShipment.departure.portName;
            const arrivalDateColumn = document.createElement("td");
            arrivalDateColumn.textContent = formatDate(transShipment.arrival.date);
            const terminalColumn = document.createElement("td");
            terminalColumn.textContent = transShipment.arrival.terminal;
            
            row.appendChild(sealineColumn);
            row.appendChild(vesselNameColumn);
            row.appendChild(departureDateColumn);
            row.appendChild(portNameColumn);
            row.appendChild(arrivalDateColumn);
            row.appendChild(terminalColumn);
            
            table.appendChild(row);
          }
        }
      })
      .catch(error => {
        console.log("Error fetching schedule:", error);
      });
  });
  
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    return formattedDate;
  }
  