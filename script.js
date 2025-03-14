document.addEventListener('DOMContentLoaded', () => {
    // Load and manage BOQ
    console.log('Fetching BOQ data from: data/boq_data.json');
    fetch('data/boq_data.json')
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data loaded successfully. Number of items:', data.length);
            if (data.length === 0) {
                console.warn('No data found in boq_data.json');
                alert('Warning: No product data found in boq_data.json');
                return;
            }
            const tbody = document.getElementById('boq-body');
            if (!tbody) {
                console.error('tbody element not found!');
                alert('Error: Table body not found. Please check the HTML.');
                return;
            }
            data.forEach(item => {
                console.log('Adding row for:', item.modelNo);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.srNo}</td>
                    <td>-</td> <!-- Placeholder for Image -->
                    <td>${item.modelNo}</td>
                    <td>${item.description}</td>
                    <td><input type="number" value="${item.qty}" min="0" onchange="updateCosts()"></td>
                    <td><input type="number" value="${item.unitPrice}" min="0" onchange="updateCosts()"></td>
                    <td class="amount">${item.amount}</td>
                `;
                tbody.appendChild(row);
            });
            updateCosts(); // Initial cost calculation
            updateResidence(); // Initial residence update
        })
        .catch(error => {
            console.error('Error loading BOQ data:', error);
            alert('Error loading product data: ' + error.message + '\nFalling back to hardcoded data. Check console for details.');
            // Fallback: Hardcode all 23 products for testing
            const fallbackData = [
                {
                    "srNo": 1,
                    "image": "-",
                    "modelNo": "MES-IP-SERVER",
                    "description": "• 120 controls – Switch, Dim, Shutter, Scene, Ceiling Fan, RGB, TW, AC • Configure Mobile App through ETS • Remotely control the Home or Office • Status LEDs for IP and KNX bus connectivity • Status LEDs for IP and KNX Traffic • Ethernet 10/100 Base-T IP with RJ45 Socket • Din rail mount assembly • Dimension: 71.3 (L) X 90.5 (H) X 62 (D) mm [4 DIN Units] • Total data saving on bus failure • Control of any standard KNX Device through Mobile App • Programming button and LED • CE Mark*",
                    "qty": 8,
                    "unitPrice": 35000,
                    "amount": 280000
                },
                {
                    "srNo": 2,
                    "image": "-",
                    "modelNo": "MES-PSU-640",
                    "description": "KNX Power supply to convert 230V to 29VDC output. Required for all KNX installations.180-264VAC 50 Hz Input voltage • KNX Bus Supply with additional 29V DC Aux Supply • Low standby power consumption, high efficiency • Output short circuit, Over-current, Over-voltage protection • KNX Bus Reset function • LED indicators for working status, over-load and reset. • Din-rail mount Assembly • Dimension: 71 (L) X 90.5 (W) X 62 (H) mm [4 DIN Units] • High I/O isolation test voltage up to 4000 VAC • SELV • Integrated KNX Choke • CE Mark* • KNX Certified Make In India Device",
                    "qty": 8,
                    "unitPrice": 15900,
                    "amount": 127200
                },
                {
                    "srNo": 3,
                    "image": "-",
                    "modelNo": "OKS-MES-6D_V02",
                    "description": "• Room Controller • Coloured display to indicate functions and status • 2.4” TFT LCD with back-light (240 x RGB x 320 dots) • 6 push buttons and LEDs • Multiple Screens for AC, RGB, Tuneable White and General Functions • 6 Configurable Screens – 3 General, 2 AC, 1 RGB, 1 Tunable White • 1 button operation for switching, dimming, shutters, scenes, values (General Functions) • Short press and long press functionality • Total data saving on bus failure • No additional Power supply required • Automatic screen saver after inactivity • Internal Temperature Sensor • Internal RTC • Programming button and LED • 6 High quality multi-function push buttons and display • 6 Pages 32 programmable functions available • Customized inbuilt icons • LED indicators to display Status • Inbuilt thermostat functionality • Available in white, gunmetal grey, and black • 82 X 82 mm • CE Mark*",
                    "qty": 0,
                    "unitPrice": 18760,
                    "amount": 0
                },
                {
                    "srNo": 4,
                    "image": "-",
                    "modelNo": "MES-OKS-6K ELEGANCE",
                    "description": "Size: 82 x 82 mm • 3-gang, 6-button piano switch • Status indication via color LEDs • In-built temperature probe • Single and paired button functionality • Data saved during KNX BUS failure • No external power supply required • Available in white, black, and grey",
                    "qty": 0,
                    "unitPrice": 14147,
                    "amount": 0
                },
                {
                    "srNo": 5,
                    "image": "-",
                    "modelNo": "MES-OKS-6K",
                    "description": "• 6 push buttons • 1 button operation for switching, dimming, shutter, scene, Constant Value • Short press and long press functionality • Total data saving on bus failure • No additional Power supply required • Internal Temperature Sensor • Programming button and LED • Size: 82X82 mm • Single and pair button functionality • Data saving on KNX Bus failure • No external supply required • CE Mark*",
                    "qty": 0,
                    "unitPrice": 12474,
                    "amount": 0
                },
                {
                    "srNo": 6,
                    "image": "-",
                    "modelNo": "MES-DO-16R",
                    "description": "16 Individual outputs / 8 Shutter Channels / 4 Fan channels • Manual output operation with push button and LED status indicator • 10 Scene functionality • Logic Functions included • Din rail mount assembly • Dimension: 142.3 (L) X 90.5 (H) X 62 (D) mm [8 DIN Units] • Total data saving on bus failure • Possibility of connecting different phases in different outputs • Programming button • CE Mark* General Product Specifications • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 32178,
                    "amount": 0
                },
                {
                    "srNo": 7,
                    "image": "-",
                    "modelNo": "MES-DO-8R",
                    "description": "• 8 Individual outputs / 4 Shutter Channels • Manual output operation with push button and LED status indicator • 10 scene functionalities • Logical functions included • Total data saving on bus failure • Possibility of connecting different phases in different outputs • Programming button with LED indication • Din rail mount assembly • Dimension: 71.3 (L) X 90.5 (H) X 62 (D) mm [4 Din Units] • CE Marking* • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 21000,
                    "amount": 0
                },
                {
                    "srNo": 8,
                    "image": "-",
                    "modelNo": "EX-CFC-1",
                    "description": "• 1 Channel ceiling fan controller • Control up to 5 speeds • 10 scene functionality – Configurable from Scene 1 to 64 • 1 LED indicator showing that the device is ON • Manual operation using push buttons and LEDs status indicators of MES-DO-16R • Din rail mount assembly",
                    "qty": 0,
                    "unitPrice": 4200,
                    "amount": 0
                },
                {
                    "srNo": 9,
                    "image": "-",
                    "modelNo": "MES-DICE23",
                    "description": "• 2 Individual outputs / 1 Shutter Channel • 3 Digital and Analog inputs • Manual output operation with push button and LED status indicator • 10 scene functionalities • Logical functions included • Total data saving on bus failure • Possibility of connecting different phases in different outputs • Programming button with LED indication • Dimension: 50.5 (L) X 55.5 (H) X 34.1 (D) mm • CE Marking* • KNX Certified Make In India Device",
                    "qty": 1,
                    "unitPrice": 12474,
                    "amount": 12474
                },
                {
                    "srNo": 10,
                    "image": "-",
                    "modelNo": "MES-DO-24R",
                    "description": "• 24 Individual outputs/8 shutter channels • Manual output operation with push-button and LED status indicator • 10 Scene functionality • By using 4 relays and adding the EX-CFC-1 module, we can add one channel ceiling fan control • Logical functions included • Possibility of connecting different phases in different outputs • Programming button and LED indication • Output relay rating: 16A/250VAC • Rated current by output: 16A*277VAC (4,432 VA) • Maximum inrush current: 100 A (resistive load) • Outputs per common: 1 output (switching) 2 outputs (shutter) • Dimension: 213 (L) x 90.5 (H) x 62 (D) mm (12 DIN Unit)",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 11,
                    "image": "-",
                    "modelNo": "MES-DIM-4V",
                    "description": "• 4 Channels of 0 - 10V output and 4 channels for relay switching • Last scene recall and data recovery • Lock unlock functionality for secure operation • Manual output operation with push button and LED status indicator • 10 Scene functionality • Programmable logic gates and functions • Possibility of connecting different phases in different outputs • Programming button and LED • Output relay rating: 16A/250VAC • Maximum current: 16A • Maximum power: 4000VA • Max number of drivers per channel: 32 • Dimension: 71.3 (L) X 90.5 (H) X 62 (D) mm (4 DIN units) • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 20835,
                    "amount": 0
                },
                {
                    "srNo": 12,
                    "image": "-",
                    "modelNo": "MES-DIM-2P",
                    "description": "• 2 Individual outputs/channels • Manual output operation with push button and LED status indicator • 10 Scene functionality • Programming button • Dimming control: on/off and dimming 0 – 100% • Short circuit protection: Yes • Outputs per common: 1 individual output • Maximum allowed power: 250W per channel • Load type: incandescent and LED • Dimension: 142.3 (L) X 90.5 (H) X 62 (D) mm (8 DIN units)",
                    "qty": 0,
                    "unitPrice": 31304,
                    "amount": 0
                },
                {
                    "srNo": 13,
                    "image": "-",
                    "modelNo": "MES-DALI-64",
                    "description": "• 1 DALI outputs for max. 1 x 64 ECGs • Individual control of up to 64 ECGs/16 DALI groups • Supports DALI and DALI-2 standard, as well as DALI DT6/DT8 ECG • Tunable White, color temperature control • Feedback on switching condition and brightness levels in both bus and manual operation • 16 Scene functionality • Fault detection of lamp faults and faulty ECGs • Individual DALI devices can be replaced during operation without software • Integrated DALI Power supply • Short circuit, overload and overvoltage protection • LCD display for menu guidance during start-up and parameter settings • Free Utility software for commissioning the DALI bus system & configuration of the scenes • DIN rail mount assembly KNX Solution • Dimension: 71.3 (L) X 90.5 (H) X 62 (D) mm (4 DIN Units)",
                    "qty": 0,
                    "unitPrice": 24700,
                    "amount": 0
                },
                {
                    "srNo": 14,
                    "image": "-",
                    "modelNo": "MES-DIM-RGBW",
                    "description": "• 4 channels with constant voltage regulation • Load current for each channel 5A • Connection to 4 individual LED strips or combined RGBW strips or RGB+W • Additional relay output (16A) to control LED power supply • Intensity control for each channel • Configurable scenes and sequences • Manual push buttons to test the channels • Total data saving on KNX bus failure • Requires external power supply 12-36VDC along with KNX bus • DIN rail mount • Dimension: 71.3 (L) X 90.5 (H) X 62 (D) mm (4 DIN Units)",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 15,
                    "image": "-",
                    "modelNo": "MES-CFC-4",
                    "description": "• 4 Channel ceiling fan controller • Control up to 5 speed for each channel • Manual output operation with push button and LED indication • 10 Scene functionality • Programming button with LED indication • Maximum load per channel (recommended): 90 W • Mains input voltage: 230VAC (50 Hz) +10% -20% • Dimension: 213 (L) X 91 (H) X 62 (D) mm (12 DIN units) • Recommended cable section: 2.5 SQMM • CE Mark* • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 24050,
                    "amount": 0
                },
                {
                    "srNo": 16,
                    "image": "-",
                    "modelNo": "MES-CFC-4PRO",
                    "description": "• 4 Channel ceiling fan controller • Control up to 5 speed for each channel • Manual output operation with push button and LED indication • 10 Scene functionality • Programming button with LED indication • Maximum load per channel (recommended): 90 W • Mains input voltage: 230VAC (50 Hz) +10% -20% • Dimension: 213 (L) X 91 (H) X 62 (D) mm (12 DIN units) • Recommended cable section: 2.5 SQMM • CE Mark* • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 27658,
                    "amount": 0
                },
                {
                    "srNo": 17,
                    "image": "-",
                    "modelNo": "MES-DICE-IR4",
                    "description": "• IR emitter channels: 4 Port • 10 macros with 10 steps each to send multiple IR codes sequentially • Repetitive IR code sending with delay • Configure up to 1 AC • 10 scene functionality for AC • User friendly configuration software for Universal up to 100 and AC up to 340 IR code learning • Compatible with most brands of air conditioners provided in the database • Led indication while sending IR command • No External Power supply • Programming button with LED indication • Dimension: 50.5 (L) X 55.5 (H) X 34.1 (D) mm • CE Marking*",
                    "qty": 0,
                    "unitPrice": 14742,
                    "amount": 0
                },
                {
                    "srNo": 18,
                    "image": "-",
                    "modelNo": "MES-DI-16",
                    "description": "• 16 individual inputs (Non-isolated) • LED indicator for individual input channels • Suitable for Switching, Dimming, Shutter, Fan and Scene control • Din rail mount assembly • Total data saving on KNX bus failure • Programming button with LED indicator • Dimension: 71.3 (L) X 90.5 (H) X 61 (D) mm [4 Din Units] • CE Mark* • KNX Certified Make In India Device",
                    "qty": 0,
                    "unitPrice": 16800,
                    "amount": 0
                },
                {
                    "srNo": 19,
                    "image": "-",
                    "modelNo": "MES-DICE-8UI",
                    "description": "• 8 individual inputs • Suitable for switching, dimming, shutter, fan and scenes • Integration with motion sensor, NTC (temperature sensor), door/window contacts, conventional switches, bell push switches • Can be placed inside wall back boxes and false ceiling • Total data saving on KNX bus failure • Programming button with LED indicator • Dimension: 50.5 (L) X 55.5 (H) X 34.1 (D) mm",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 20,
                    "image": "-",
                    "modelNo": "MES-LNCPL",
                    "description": "• Ability to connect two KNX lines with each other • Electrical isolation is provided between two lines • A separate KNX Power supply is required for each line • Filter functions provided to reduce BUS load • DIN rail mount • Dimension: 45 (L) x 90.5 (H) x 62 (D) mm (2 DIN units)",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 21,
                    "image": "-",
                    "modelNo": "MES-USB-INT",
                    "description": "• Enables programming of KNX devices via ETS • 2 indication LEDs for KNX and USB • Automatic detection of MES-USB-INT in ETS • DIN rail mount • Dimension: 45 (L) x 90.5 (H) x 62 (D) mm (2 DIN units)",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 22,
                    "image": "-",
                    "modelNo": "KNX Cable",
                    "description": "• 2 Core KNX cable",
                    "qty": 0,
                    "unitPrice": 0,
                    "amount": 0
                },
                {
                    "srNo": 23,
                    "image": "-",
                    "modelNo": "KNX Cable",
                    "description": "• 4 Core KNX Cable",
                    "qty": 87,
                    "unitPrice": 0,
                    "amount": 0
                }
            ];
            const tbody = document.getElementById('boq-body');
            if (tbody) {
                fallbackData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.srNo}</td>
                        <td>-</td>
                        <td>${item.modelNo}</td>
                        <td>${item.description}</td>
                        <td><input type="number" value="${item.qty}" min="0" onchange="updateCosts()"></td>
                        <td><input type="number" value="${item.unitPrice}" min="0" onchange="updateCosts()"></td>
                        <td class="amount">${item.amount}</td>
                    `;
                    tbody.appendChild(row);
                });
                updateCosts();
                updateResidence();
            }
        });
});

function updateCosts() {
    const rows = document.querySelectorAll('#boq-table tbody tr');
    let totalValue = 0;

    rows.forEach(row => {
        const qty = parseInt(row.querySelectorAll('input')[0].value) || 0;
        const unitPrice = parseFloat(row.querySelectorAll('input')[1].value) || 0;
        const amount = qty * unitPrice;
        row.querySelector('.amount').textContent = amount.toFixed(2);
        totalValue += amount;
    });

    const gst = totalValue * 0.18;
    const totalCost = totalValue + gst;

    document.getElementById('total-value').textContent = totalValue.toFixed(2);
    document.getElementById('gst-value').textContent = gst.toFixed(2);
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

function updateResidence() {
    const residence = document.getElementById('residence').value;
    document.querySelector('header h1').innerHTML = `<input type="text" id="residence" value="${residence}" onchange="updateResidence()">`;
}

function downloadPDF(filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Add logo (50mm x 25mm)
    const logoImg = new Image();
    logoImg.src = 'images/logo.png'; // Path to the logo image
    doc.addImage(logoImg, 'PNG', 10, 10, 50, 25); // Logo at top-left

    // Add header information (aligned with the logo's top)
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Messung Systems Pvt. Ltd.", 65, 15); // Adjusted x-position to start right after logo
    doc.setFont("helvetica", "normal");
    doc.text("501-503 Sky Vista, Viman Nagar, Pune, India - 411 014", 65, 20);
    doc.text("Date: " + document.getElementById('date').value, 65, 25);
    doc.text("Quotation No: " + document.getElementById('quotationNo').value, 65, 30);

    // Add table headings
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Black text
    doc.autoTable({
        head: [[{ content: "(Messung Ourican) KNX Techno Commercial Offer", colSpan: 7, styles: { halign: 'center', fillColor: [50, 205, 50], textColor: [0, 0, 0], fontSize: 14 } }]],
        startY: 40, // Adjusted to start below the header
        theme: 'plain',
        styles: { font: "helvetica" },
        didDrawPage: function (data) {
            // Add customer name header
            doc.setFontSize(12);
            doc.autoTable({
                head: [[{ content: "Customer Name: " + document.getElementById('residence').value, colSpan: 7, styles: { halign: 'center', fillColor: [255, 165, 0], textColor: [0, 0, 0], fontSize: 12 } }]],
                startY: data.cursor.y,
                theme: 'plain',
                styles: { font: "helvetica" }
            });
        }
    });

    // Add BOQ Table
    const table = document.getElementById('boq-table');
    const rows = [];
    const headers = ['Sr No', 'Image', 'Model No', 'Description', 'Qty', 'Unit Price', 'Amount'];

    // Extract table data (including updated values from inputs)
    document.querySelectorAll('#boq-table tbody tr').forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach((cell, index) => {
            if (index === 1) { // Image column
                rowData.push('-'); // Placeholder for now
            } else if (index === 4 || index === 5) { // Qty and Unit Price are inputs
                rowData.push(cell.querySelector('input').value);
            } else {
                rowData.push(cell.textContent.trim());
            }
        });
        rows.push(rowData);
    });

    // Add totals as footer rows in the table (hardcoded as per user request)
    rows.push(['', '', '', '', '', 'Total Value:', '419674.00']);
    rows.push(['', '', '', '', '', 'GST 18%:', '75541.32']);
    rows.push(['', '', '', '', '', 'Total Project Cost:', '495215.32']);

    doc.autoTable({
        head: [headers],
        body: rows,
        startY: doc.autoTable.previous.finalY + 10, // Start after the customer name header
        theme: 'grid', // Adds borders
        headStyles: {
            fillColor: [240, 240, 240], // Faint gray background
            textColor: [0, 0, 0], // Black text
            fontStyle: 'bold',
            fontSize: 10
        },
        bodyStyles: {
            fontSize: 8,
            textColor: [0, 0, 0] // Black text
        },
        columnStyles: {
            0: { cellWidth: 15, halign: 'center' }, // Sr No
            1: { cellWidth: 20, halign: 'center' }, // Image
            2: { cellWidth: 25, halign: 'left' },   // Model No
            3: { cellWidth: 60, halign: 'left' },   // Description
            4: { cellWidth: 15, halign: 'center' }, // Qty
            5: { cellWidth: 20, halign: 'right' },  // Unit Price
            6: { cellWidth: 20, halign: 'right' }   // Amount
        },
        styles: {
            cellPadding: 2,
            font: "helvetica"
        },
        // Style the footer rows (last 3 rows for totals)
        didParseCell: function (data) {
            if (data.row.index >= rows.length - 3) { // Last 3 rows
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fillColor = [240, 240, 240]; // Light gray background for totals
            }
        }
    });

    // Save the PDF
    doc.save(filename);
}