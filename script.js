function calculate_license() {
    let fn = document.getElementById("input-first-name").value,
        mi = document.getElementById("input-middle-initial").value,
        ln = document.getElementById("input-last-name").value,
        dob = document.getElementById("input-dob").value;
    const soundex = [['B','F','P','V'],
                     ['C','G','J','K','Q','S','X','Z'],
                     ['D','T'],
                     ['L'],
                     ['M','N'],
                     ['R']],
          firstNames = {
              'ALBERT': 20,
              'ALICE': 20,
              'ANN': 40,
              'ANNA': 40,
              'ANNE': 40,
              'ANNIE': 40,
              'ARTHUR': 40,
              'BERNARD': 80,
              'BETTE': 80,
              'BETTIE': 80,
              'BETTY': 80,
              'CARL': 120,
              'CATHERINE': 120,
              'CHARLES': 140,
              'DORTHY': 180,
              'EDWARD': 220,
              'ELIZABETH': 220,
              'FLORENCE': 260,
              'DONALD': 180,
              'CLARA': 140,
              'FRANK': 260,
              'GEORGE': 300,
              'GRACE': 300,
              'HAROLD': 340,
              'HARRIET': 340,
              'HARRY': 360,
              'HAZEL': 360,
              'HELEN': 380,
              'HENRY': 380,
              'JAMES': 440,
              'JANE': 440,
              'JAYNE': 440,
              'JEAN': 460,
              'JOAN': 480,
              'JOHN': 460,
              'JOSEPH': 480,
              'MARGARET': 560,
              'MARTIN': 560,
              'MARVIN': 580,
              'MARY': 580,
              'MELVIN': 600,
              'MILDRED': 600,
              'PATRICIA': 680,
              'PAUL': 680,
              'RICHARD': 740,
              'ROBERT': 760,
              'RUBY': 740,
              'RUTH': 760,
              'THELMA': 820,
              'THOMAS': 820,
              'WALTER': 900,
              'WANDA': 900,
              'WILLIAM': 920,
              'WILMA': 920
          },
          firstInitials = {
              'A': 0,
              'B': 60,
              'C': 100,
              'D': 160,
              'E': 200,
              'F': 240,
              'G': 280,
              'H': 320,
              'I': 400,
              'J': 420,
              'K': 500,
              'L': 520,
              'M': 540,
              'N': 620,
              'O': 640,
              'P': 660,
              'Q': 700,
              'R': 720,
              'S': 780,
              'T': 800,
              'U': 840,
              'V': 860,
              'W': 880,
              'X': 940,
              'Y': 960,
              'Z': 980
          },
          middleInitials = {
              'A': 1,
              'B': 2,
              'C': 3,
              'D': 4,
              'E': 5,
              'F': 6,
              'G': 7,
              'H': 8,
              'I': 9,
              'J': 10,
              'K': 11,
              'L': 12,
              'M': 13,
              'N': 14,
              'O': 14,
              'P': 15,
              'Q': 15,
              'R': 16,
              'S': 17,
              'T': 18,
              'U': 18,
              'V': 18,
              'W': 19,
              'X': 19,
              'Y': 19,
              'Z': 19
          };

    //
    // ERROR HANDLING
    //

    console.log(dob, typeof(dob));
    fn = fn.toUpperCase();
    mi = mi.toUpperCase();
    ln = ln.toUpperCase();

    //
    // START OUTPUT
    //
    let license = "";

    //
    // LAST NAME
    //
    license += ln[0];

    let groups = [-1];
    for(let g=0; g<soundex.length; g++) {
        if(soundex[g].includes(ln[0])) groups[0] = g;
    }
    for(let i=1; i<ln.length; i++) {
        groups.push(-1);
        for(let g=0; g<soundex.length; g++) {
            if(soundex[g].includes(ln[i])) groups[i] = g;
        }
        if(groups[i-1]===groups[i] ||
            (groups[i]===groups[i-2] && ['H','W'].includes(ln[i-1])) ||
            groups[i] === -1) {
            continue;
        }
        license += groups[i]+1;
        if(license.length === 4) break;
    }
    while(license.length < 4) license += '0';

    //
    // FIRST & MIDDLE NAME
    //
    license += " - "
    let fnVal = firstNames.hasOwnProperty(fn) ? firstNames[fn] : firstInitials[fn[0]],
        text2 = String(fnVal + middleInitials[mi]);
    while(text2.length < 3) text2 = '0'+text2;
    license += text2;

    //
    // BIRTH YEAR
    //
    license += dob[2] + " - " + dob[3];

    //
    // BIRTH DATE AND MONTH
    //
    const m = Number(dob.substr(5,2)),
          d = Number(dob.substr(8,2));
    let s = document.getElementById('input-female').checked ? 600 : 0,
        text3 = String((m-1)*31 + d + s);
    while(text3.length < 3) text3 = '0'+text3;
    license += text3;

    document.getElementById("output-license").innerText = license;
}
