const pFormula = "p = \\frac{{a + b + c}}{2}=", pForCalc = "\\frac{{aa + bb + cc}}{2}=",
  sFormula = "S = \\sqrt {p\\left( {p - a} \\right)\\left( {p - b} \\right)\\left( {p - c} \\right)}=",
  sForCalc = "\\sqrt {pp\\left( {pp - aa} \\right)\\left( {pp - bb} \\right)\\left( {pp - cc} \\right)}=",
  sSimplif = "\\sqrt {pp \\cdot aa \\cdot bb \\cdot cc}=", sMultip = "\\sqrt{aa}=", sAnswer = "aa \\sqrt{bb}",
  sPbad = "\\sqrt {\\frac{{pp}}{2}\\left( {\\frac{{pp}}{2} - aa} \\right)\\left( {\\frac{{pp}}{2} - bb} \\right)\\left( {\\frac{{pp}}{2} - cc} \\right)}=",
  sPbadCalc = "\\sqrt {\\frac{{pp}}{2} \\cdot \\frac{{pp - 2 \\cdot aa}}{2} \\cdot \\frac{{pp - 2 \\cdot bb}}{2} \\cdot \\frac{{pp - 2 \\cdot cc}}{2}}=",
  sPbadSimp = "\\sqrt {\\frac{{pp}}{2} \\cdot \\frac{{aa}}{2} \\cdot \\frac{{bb}}{2} \\cdot \\frac{{cc}}{2}}=", sPbadRoot = "\\sqrt {\\frac{{aa}}{{16}}}=",
  sPbadAnswer = "\\frac{{aa\\sqrt{bb}}}{4}", rFormula = "r = \\frac{{2S}}{{a + b + c}}=", rForCalc = "\\frac{{2 \\cdot SS}}{{aa + bb + cc}}=",
  RFormula = "R = \\frac{{abc}}{{4S}}=", RForCalc = "\\frac{{aa \\cdot bb \\cdot cc}}{{4 \\cdot SS}}="
var pCalculation, pGood = true, sGood = true, sCalculation, rCalculation, RCalculation;
var a, b, c, pHalf, p, sCeoff, multip, q, w;

window.onload = function () {
  pCalculation = document.getElementById("p")
  sCalculation = document.getElementById("s")
  rCalculation = document.getElementById("r")
  RCalculation = document.getElementById("R")
}


function calc() {
  a = Number(document.getElementById("a").value), b = Number(document.getElementById("b").value), c = Number(document.getElementById("c").value);
  if (a > 0 && b > 0 && c > 0)
    if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c))
      if (a + b > c && b + c > a && a + c > b) {
        p = a + b + c;
        pHalf = p / 2
        pGood = Number.isInteger(pHalf)
        if (pGood) {
          multip = pHalf * (pHalf - a) * (pHalf - b) * (pHalf - c)
        } else {
          multip = p * (p - 2 * a) * (p - 2 * b) * (p - 2 * c)
        }
        sCeoff = findSCeoff(multip)
        sGood = sCeoff * sCeoff == multip
        MathJax.typesetPromise().then(() => {
          if (pGood) {
            pCalculation.innerHTML = "\\[" + pFormula + applyABC(pForCalc) + "\\frac{aa}{2}=".replace("aa", p) + pHalf + " \\]"
            sCalculation.innerHTML = "\\[" + sFormula + applyABC(applyP(sForCalc, pHalf))
              + sSimplif.replace("pp", pHalf).replace("aa", pHalf - a).replace("bb", pHalf - b).replace("cc", pHalf - c) + sMultip.replace("aa", multip);
            if (sGood) {
              sCalculation.innerHTML += sCeoff + " \\]"
              rCalculation.innerHTML = "\\[" +
                rFormula + applyABC(rForCalc.replace("SS", sCeoff))
                + "\\frac{SS}{pp}=".replace("SS", 2 * sCeoff).replace("pp", p) + getFracVal(2 * sCeoff, p)
                + "\\]"
              RCalculation.innerHTML = "\\[" +
                RFormula + applyABC(RForCalc).replace("SS", sCeoff)
                + "\\frac{aa}{bb}=".replace("aa", a * b * c).replace("bb", 4 * sCeoff) + getFracVal(a * b * c, 4 * sCeoff)
                + "\\]"
            } else {
              var underRoot = multip / (sCeoff * sCeoff)
              if (sCeoff != 1) {
                const kl = sAnswer.replace("aa", sCeoff).replace("bb", underRoot)
                sCalculation.innerHTML += kl + " \\]"
                rCalculation.innerHTML = "\\[" +
                  rFormula + applyABC(rForCalc.replace("SS", kl))
                  + "\\frac{{aa\\sqrt {bb} }}{{pp}}=".replace("aa", 2 * sCeoff).replace("bb", underRoot).replace("pp", p) + getFracWithRootVal(2 * sCeoff, p, underRoot)
                  + "\\]"
                RCalculation.innerHTML = "\\[" +
                  RFormula + applyABC(RForCalc).replace("SS", kl)
                  + removeIrr(a * b * c, 4 * sCeoff, underRoot)
                  + "\\]"
              } else {
                const g = sMultip.replace("aa", multip).replace("=", "")
                sCalculation.innerHTML += g + " \\]"
                rCalculation.innerHTML = "\\[" +
                  rFormula + applyABC(rForCalc.replace("SS", g))
                  + "\\frac{2 \\sqrt{aa}}{pp}=".replace("aa", underRoot).replace("pp", p)
                  + getFracWithRootVal(2, p, underRoot)
                  + "\\]"
                RCalculation.innerHTML = "\\[" +
                  RFormula + applyABC(RForCalc).replace("SS", g)
                  + removeIrr(a * b * c, 4, underRoot)
                  + "\\]"
              }
            }
          } else {
            pCalculation.innerHTML = "\\[" + pFormula + applyABC(pForCalc) + "\\frac{aa}{2}".replace("aa", p) + " \\]"
            sCalculation.innerHTML = "\\[" + sFormula + applyABC(applyP(sPbad, p))
              + applyABC(applyP(sPbadCalc, p))
              + sPbadSimp.replace("pp", p).replace("aa", p - 2 * a).replace("bb", p - 2 * b).replace("cc", p - 2 * c)
              + sPbadRoot.replace("aa", multip)
            if (sGood) {
              const vf = Math.sqrt(multip)
              sCalculation.innerHTML += sPbadAnswer.replace("{aa\\sqrt{bb}}", vf) + getFracVal(vf, 4) + "\\]"
              rCalculation.innerHTML = "\\[" +
                rFormula + applyABC(rForCalc.replace("SS", getFracVal(vf, 4)))
                + "=\\frac{\\frac{aa}{2}}{pp}=".replace("aa", vf).replace("pp", p)
                + "\\frac{aa}{bb}=".replace("aa", vf).replace("pp", 2 * p)
                + getFracVal(vf, 2 * p)
                + "\\]"
              RCalculation.innerHTML = "\\[" +
                RFormula + applyABC(RForCalc).replace("SS", getFracVal(vf, 4))
                + applyABC("\\frac{aa \\cdot bb \\cdot cc \\cdot dd}{4 \\cdot ee}=").replace("dd",w).replace("ee",wf)
                + "\\frac{aa}{bb}=".replace("aa",a*b*c*w).replace("bb",4*wf)
                + getFracVal(a*b*c*w,4*wf)
                + "\\]"
            } else {
              var underRoot = multip / (sCeoff * sCeoff)
              if (sCeoff != 1) {
                const g = getFracWithRootVal(sCeoff, 4, underRoot)
                sCalculation.innerHTML += g + "\\]"
                rCalculation.innerHTML = "\\[" +
                  rFormula + applyABC(rForCalc.replace("SS", g))
                  + "\\frac{{\\frac{{aa\\sqrt {bb}}}{cc}}}{pp}=".replace("aa", 2 * q).replace("bb", underRoot).replace("pp", p).replace("cc", w)
                  + "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", 2 * q).replace("bb", underRoot).replace("cc", p * w)
                  + getFracWithRootVal(2 * q, w * p, underRoot)
                  + "\\]"
                getFracWithRootVal(sCeoff, 4, underRoot)
                RCalculation.innerHTML = "\\[" +
                  RFormula + applyABC(RForCalc).replace("SS", g)
                  + applyABC("\\frac{aa \\cdot bb \\cdot cc \\cdot dd}{4 \\cdot ee \\sqrt{ff}}=").replace("dd", w).replace("ee", sCeoff).replace("ff", underRoot)
                  + removeIrr(w * a * b * c, 4 * sCeoff, underRoot)
                  + "\\]"
              } else {
                const g = sPbadAnswer.replace("aa", "").replace("bb", underRoot)
                sCalculation.innerHTML += g + "\\]"
                rCalculation.innerHTML = "\\[" +
                  rFormula + rForCalc.replace("SS", g).replace("aa", a).replace("bb", b).replace("cc", c)
                  + "\\frac{\\frac{\\sqrt{aa}}{2}}{pp}=".replace("aa", underRoot).replace("pp", p)
                  + "\\frac{\\sqrt{aa}}{bb}".replace("aa", underRoot).replace("bb", 2 * p)
                  + "\\]"
                RCalculation.innerHTML = "\\[" +
                  RFormula + applyABC(RForCalc).replace("SS", g)
                  + applyABC("\\frac{aa \\cdot bb \\cdot cc}{\\sqrt{ff}}=").replace("ff", underRoot)
                  + removeIrr(a * b * c, 1, underRoot)
                  + "\\]"
              }
            }
          }
          MathJax.typesetPromise();
        }).catch((err) => alert("Xatolik: " + err.message));
      } else alert(a + ", " + b + ", " + c + " sonlari uchburchak tengsizligini qanoatlantirmaydi")
    else alert("a, b, c sonlar butun son bo'lishi kerak")
  else alert("a, b, c sonlar musbat bo'lishi kerak")
}

function removeIrr(a, b, r) {
  var s = "\\frac{aa}{bb \\sqrt{cc}}=".replace("aa", a).replace("bb", b==1 ? "" : b).replace("cc", r)
    + applyP("\\frac{aa \\sqrt{pp}}{bb \\sqrt{pp} \\cdot \\sqrt{pp}}=", r).replace("aa", a==1 ? "" : a).replace("bb", b==1 ? "" : b)
    + applyP("\\frac{aa \\sqrt{pp}}{bb \\cdot pp}=", r).replace("aa", a==1 ? "" : a).replace("bb \\cdot", b==1 ? "": b+" \\cdot")
    + "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", a==1 ? "" : a).replace("bb", r).replace("cc", b * r) + getFracWithRootVal(a, b * r, r)
  return s
}

function getFracWithRootVal(a, b, r) {
  var x = a / b, s = "", e = findEK(a, b)
  if (Number.isInteger(x)) {
    if (x == 1) return "\\sqrt {bb}".replace("bb", r); else return "aa \\sqrt{bb}".replace("bb", r).replace("aa", x)
  } else {
    if (e == 1) {
      q = a
      w = b
      s = "\\frac{{aa\\sqrt {bb} }}{{cc}}".replace("aa", q).replace("cc", w).replace("bb", r)
    } else {
      q = a / e
      w = b / e
      s = "\\frac{{{{\\cancel{aa}}^{dd}}\\sqrt {bb} }}{{{{\\cancel{cc}}^{ee}}}}=".replace("aa", a).replace("cc", b).replace("bb", r)
        .replace("dd", q == 1 ? "" : q).replace("ee", w)
        + "\\frac{{aa\\sqrt {bb} }}{{cc}}".replace("aa", q == 1 ? "" : q).replace("cc", w).replace("bb", r)
    }
    return s;
  }
}

function applyABC(l) {
  return l.replace("aa", a).replace("bb", b).replace("cc", c)
}

function applyP(l, k) {
  return l.replace("pp", k).replace("pp", k).replace("pp", k).replace("pp", k)
}

function getFracVal(a, b) {
  var x = a / b, s = "", e = findEK(a, b)
  if (Number.isInteger(x)) return x; else {
    if (e == 1) {
      q = a
      w = b
      s = "\\frac{cc}{dd}".replace("cc", q).replace("dd", w)
    } else {
      q = a / e
      w = b / e
      s = "\\frac{{{{\\cancel{aa}}^{cc}}}}{{{{\\cancel{bb}}^{dd}}}}=".replace("aa", a).replace("bb", b).replace("cc", q).replace("dd", w) + "\\frac{b}{d}".replace("b", q).replace("d", w)
    }
    if (q < w) return s; else {
      var aa = Math.trunc(q / w)
      s += "=aa\\frac{cc}{dd}".replace("aa", aa).replace("dd", w).replace("cc", q % w)
      return s
    }
  }
}

function findEK(a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  min = Math.min(a, b)
  for (let i = min; i > 0; i--) {
    if (goodDiv(a, i) && goodDiv(b, i)) return i;
  }
}

function goodDiv(a, b) {
  if (Number.isInteger(a / b)) return true; else return false;
}

function findSCeoff(m) {
  for (let i = Math.trunc(Math.sqrt(m)); i > 0; i--) {
    var n = m / (i * i)
    if (Number.isInteger(n)) {
      return i;
    }
  }
}