const pFormula = "p = \\frac{{a + b + c}}{2}=", pForCalc = "\\frac{{aa + bb + cc}}{2}=",
  sFormula = "S = \\sqrt {p\\left( {p - a} \\right)\\left( {p - b} \\right)\\left( {p - c} \\right)}=",
  sForCalc = "\\sqrt {pp\\left( {pp - aa} \\right)\\left( {pp - bb} \\right)\\left( {pp - cc} \\right)}=",
  sSimplif = "\\sqrt {pp \\cdot aa \\cdot bb \\cdot cc}=", sMultip = "\\sqrt{aa}=", sAnswer = "aa \\sqrt{bb}",
  sPbad = "\\sqrt {\\frac{{pp}}{2}\\left( {\\frac{{pp}}{2} - aa} \\right)\\left( {\\frac{{pp}}{2} - bb} \\right)\\left( {\\frac{{pp}}{2} - cc} \\right)}=",
  sPbadCalc = "\\sqrt {\\frac{{pp}}{2} \\cdot \\frac{{pp - 2 \\cdot aa}}{2} \\cdot \\frac{{pp - 2 \\cdot bb}}{2} \\cdot \\frac{{pp - 2 \\cdot cc}}{2}}=",
  sPbadSimp = "\\sqrt {\\frac{{pp}}{2} \\cdot \\frac{{aa}}{2} \\cdot \\frac{{bb}}{2} \\cdot \\frac{{cc}}{2}}=", sPbadRoot = "\\sqrt {\\frac{{aa}}{{16}}}=",
  sPbadAnswer = "\\frac{{aa\\sqrt{bb}}}{4}", rFormula = "r = \\frac{{2S}}{{a + b + c}}=", rForCalc = "\\frac{{2 \\cdot SS}}{{aa + bb + cc}}=",
  RFormula = "R = \\frac{{abc}}{{4S}}=", RForCalc = "\\frac{{aa \\cdot bb \\cdot cc}}{{4 \\cdot SS}}=", haFormula = "{h_aa} = \\frac{2S}{aa}=",
  haForCalc = "\\frac{2 \\cdot S}{aa}=", hbForCalc = "\\frac{2 \\cdot S}{bb}=", hcForCalc = "\\frac{2 \\cdot S}{cc}="
  , maForm = "{m_a} = \\frac{1}{2}\\sqrt {2{b^2} + 2{c^2} - {a^2}}=", maForCalc = "\\frac{1}{2}\\sqrt {2 \\cdot {bb^2} + 2 \\cdot {cc^2} - {aa^2}}=",
  mbForm = "{m_b} = \\frac{1}{2}\\sqrt {2{a^2} + 2{c^2} - {b^2}}=", mbForCalc = "\\frac{1}{2}\\sqrt {2 \\cdot {aa^2} + 2 \\cdot {cc^2} - {bb^2}}=",
  mcForm = "{m_c} = \\frac{1}{2}\\sqrt {2{a^2} + 2{b^2} - {c^2}}=", mcForCalc = "\\frac{1}{2}\\sqrt {2 \\cdot {aa^2} + 2 \\cdot {bb^2} - {cc^2}}=",
  laForm = "{l_a} = \\frac{2}{{b + c}}\\sqrt {bcp\\left( {p - a} \\right)}=", laForCalc = "\\frac{2}{{bb + cc}}\\sqrt {bb \\cdot cc \\cdot pp\\left( {pp - aa} \\right)}=",
  lbForm = "{l_b} = \\frac{2}{{a + c}}\\sqrt {acp\\left( {p - b} \\right)}=", lbForCalc = "\\frac{2}{{aa + cc}}\\sqrt {aa \\cdot cc \\cdot pp\\left( {pp - bb} \\right)}=",
  lcForm = "{l_c} = \\frac{2}{{a + b}}\\sqrt {abp\\left( {p - c} \\right)}=", lcForCalc = "\\frac{2}{{aa + bb}}\\sqrt {aa \\cdot bb \\cdot pp\\left( {pp - cc} \\right)}=",
  laForCalcPbad = "\\frac{2}{{bb + cc}}\\sqrt {bb \\cdot cc \\cdot \\frac{pp}{2}\\left( {\\frac{pp}{2} - aa} \\right)}=",
  lbForCalcPbad = "\\frac{2}{{aa + cc}}\\sqrt {aa \\cdot cc \\cdot \\frac{pp}{2}\\left( {\\frac{pp}{2} - bb} \\right)}=",
  lcForCalcPbad = "\\frac{2}{{aa + bb}}\\sqrt {aa \\cdot bb \\cdot \\frac{pp}{2}\\left( {\\frac{pp}{2} - cc} \\right)}="
var pCalculation, pGood = true, sGood = true, sCalculation, rCalculation, RCalculation, haCalculation, hbCalculation, hcCalculation,
  maCalculation, mbCalculation, mcCalculation, laCalculation, lbCalculation, lcCalculation;
var a, b, c, pHalf, p, sCeoff, multip, q, w;

window.onload = function () {
  pCalculation = document.getElementById("p")
  sCalculation = document.getElementById("s")
  rCalculation = document.getElementById("r")
  RCalculation = document.getElementById("R")
  haCalculation = document.getElementById("ha")
  hbCalculation = document.getElementById("hb")
  hcCalculation = document.getElementById("hc")
  maCalculation = document.getElementById("ma")
  mbCalculation = document.getElementById("mb")
  mcCalculation = document.getElementById("mc")
  laCalculation = document.getElementById("la")
  lbCalculation = document.getElementById("lb")
  lcCalculation = document.getElementById("lc")
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
            laCalculation.innerHTML = "\\[" +
              laForm + calcLPgood(pHalf, a, b, c, laForCalc)
              + "\\]"
            lbCalculation.innerHTML = "\\[" +
              lbForm + calcLPgood(pHalf, b, a, c, lbForCalc)
              + "\\]"
            lcCalculation.innerHTML = "\\[" +
              lcForm + calcLPgood(pHalf, c, a, b, lcForCalc)
              + "\\]"
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
              haCalculation.innerHTML = "\\[" +
                applyToHForm("a") + calcHPSgood(sCeoff, a, haForCalc)
                + "\\]"
              hbCalculation.innerHTML = "\\[" +
                applyToHForm("b") + calcHPSgood(sCeoff, b, hbForCalc)
                + "\\]"
              hcCalculation.innerHTML = "\\[" +
                applyToHForm("c") + calcHPSgood(sCeoff, c, hcForCalc)
                + "\\]"
            } else {
              var underRoot = multip / (sCeoff * sCeoff), ll
              if (sCeoff != 1) {
                const kl = sAnswer.replace("aa", sCeoff).replace("bb", underRoot)
                ll = kl
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
                ll = g
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
              haCalculation.innerHTML = "\\[" +
                applyToHForm("a") + calcHPgoodSbad(ll, sCeoff, underRoot, a, haForCalc)
                + "\\]"
              hbCalculation.innerHTML = "\\[" +
                applyToHForm("b") + calcHPgoodSbad(ll, sCeoff, underRoot, b, hbForCalc)
                + "\\]"
              hcCalculation.innerHTML = "\\[" +
                applyToHForm("c") + calcHPgoodSbad(ll, sCeoff, underRoot, c, hcForCalc)
                + "\\]"
            }
          } else {
            pCalculation.innerHTML = "\\[" + pFormula + applyABC(pForCalc) + "\\frac{aa}{2}".replace("aa", p) + " \\]"
            sCalculation.innerHTML = "\\[" + sFormula + applyABC(applyP(sPbad, p))
              + applyABC(applyP(sPbadCalc, p))
              + sPbadSimp.replace("pp", p).replace("aa", p - 2 * a).replace("bb", p - 2 * b).replace("cc", p - 2 * c)
              + sPbadRoot.replace("aa", multip)
            laCalculation.innerHTML = "\\[" +
              laForm + calcLPbad(p, a, b, c, laForCalcPbad)
              + "\\]"
            lbCalculation.innerHTML = "\\[" +
              lbForm + calcLPbad(p, b, a, c, lbForCalcPbad)
              + "\\]"
            lcCalculation.innerHTML = "\\[" +
              lcForm + calcLPbad(p, c, a, b, lcForCalcPbad)
              + "\\]"
            if (sGood) {
              const vf = Math.sqrt(multip), ss = PbadAnswer.replace("{aa\\sqrt{bb}}", vf)
              sCalculation.innerHTML += ss + getFracVal(vf, 4) + "\\]"
              rCalculation.innerHTML = "\\[" +
                rFormula + applyABC(rForCalc.replace("SS", getFracVal(vf, 4)))
                + "=\\frac{\\frac{aa}{2}}{pp}=".replace("aa", vf).replace("pp", p)
                + "\\frac{aa}{bb}=".replace("aa", vf).replace("pp", 2 * p)
                + getFracVal(vf, 2 * p)
                + "\\]"
              RCalculation.innerHTML = "\\[" +
                RFormula + applyABC(RForCalc).replace("SS", getFracVal(vf, 4))
                + applyABC("\\frac{aa \\cdot bb \\cdot cc \\cdot dd}{4 \\cdot ee}=").replace("dd", w).replace("ee", wf)
                + "\\frac{aa}{bb}=".replace("aa", a * b * c * w).replace("bb", 4 * wf)
                + getFracVal(a * b * c * w, 4 * wf)
                + "\\]"
              getFracVal(vf, 4)
              haCalculation.innerHTML = "\\[" +
                applyToHForm("a") + calcPbadSgood(ss, haForCalc, q, w, a)
                + "\\]"
              getFracVal(vf, 4)
              haCalculation.innerHTML = "\\[" +
                applyToHForm("b") + calcPbadSgood(ss, hbForCalc, q, w, b)
                + "\\]"
              getFracVal(vf, 4)
              haCalculation.innerHTML = "\\[" +
                applyToHForm("c") + calcPbadSgood(ss, hcForCalc, q, w, c)
                + "\\]"
            } else {
              var underRoot = multip / (sCeoff * sCeoff), xs
              if (sCeoff != 1) {
                const g = getFracWithRootVal(sCeoff, 4, underRoot)
                xs = g
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
                xs = g
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
              getFracWithRootVal(sCeoff, 4, underRoot)
              haCalculation.innerHTML = "\\[" +
                applyToHForm("a") + calcHPSBad(xs, haForCalc, sCeoff, w, underRoot, a)
                + "\\]"
              getFracWithRootVal(sCeoff, 4, underRoot)
              hbCalculation.innerHTML = "\\[" +
                applyToHForm("b") + calcHPSBad(xs, hbForCalc, sCeoff, w, underRoot, b)
                + "\\]"
              getFracWithRootVal(sCeoff, 4, underRoot)
              hcCalculation.innerHTML = "\\[" +
                applyToHForm("c") + calcHPSBad(xs, hcForCalc, sCeoff, w, underRoot, c)
                + "\\]"
            }
          }
          maCalculation.innerHTML = "\\[" +
            maForm + calcm(maForCalc, a, b, c)
            + "\\]"
          mbCalculation.innerHTML = "\\[" +
            mbForm + calcm(mbForCalc, b, a, c)
            + "\\]"
          mcCalculation.innerHTML = "\\[" +
            mcForm + calcm(mcForCalc, c, a, b)
            + "\\]"
          MathJax.typesetPromise();
        }).catch((err) => alert("Xatolik: " + err.message));
      } else alert(a + ", " + b + ", " + c + " sonlari uchburchak tengsizligini qanoatlantirmaydi")
    else alert("a, b, c sonlar butun son bo'lishi kerak")
  else alert("a, b, c sonlar musbat bo'lishi kerak")
}

function calcLPgood(p, a, b, c, form) {
  const z = b * c * p * (p - a), ceoff = findSCeoff(z), underRoot = z / (ceoff * ceoff)
  return applyABC(applyP(form, p)) + "\\frac{2}{aa}\\sqrt {bb}=".replace("aa", b + c).replace("bb", z) + "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", 2 * ceoff).replace("bb", underRoot).replace("cc", b + c) + getFracWithRootVal(2 * ceoff, b + c, underRoot)
}

function calcLPbad(p, a, b, c, form) {
  const z = b * c * p * (p - 2 * a), ceoff = findSCeoff(z), underRoot = z / (ceoff * ceoff),
    ap = "\\frac{2}{{bb + cc}}\\sqrt {bb \\cdot cc \\cdot \\frac{pp}{2}\\left( {\\frac{pp}{2} - aa} \\right)}=",
    si = "\\frac{2}{aa}\\sqrt {\\frac{bb}{2} \\cdot {\\frac{{pp - 2 \\cdot cc}}{2}}}=",
    mu = "\\frac{{\\cancel{2}}}{aa} \\cdot \\frac{{\\sqrt {bb} }}{{\\cancel{2}}}=",
    x = applyABC(applyP(form, p)) + applyP(si.replace("aa", b + c).replace("bb", b * c * p).replace("cc", a), p) +
      mu.replace("aa", b + c).replace("bb", b * c * p * (p - 2 * a))
  if (underRoot == 1) return x + getFracVal(ceoff, b + c); else return x + getFracWithRootVal(ceoff, b + c, underRoot)
}

function calcPbadSgood(s, form, q, w, a) {
  return applyABC(form).replace("S", s) + "\\frac{\\frac{aa}{bb}}{cc}=".replace("aa", 2 * q).replace("bb", w).replace("cc", a) + getFracVal(2 * q, w * a)
}

function calcm(form, a, b, c) {
  const x = 2 * b * b + 2 * c * c - a * a, ceoff = findSCeoff(x), underRoot = x / (ceoff * ceoff), r = applyABC(form) + "\\frac{1}{2}\\sqrt {2 \\cdot bb + 2 \\cdot cc - aa}=".replace("bb", b * b).replace("cc", c * c).replace("aa", a * a) +
    "\\frac{1}{2}\\sqrt {bb + cc - aa}=".replace("bb", 2 * b * b).replace("cc", 2 * c * c).replace("aa", a * a) + "\\frac{\\sqrt{aa}}{2}=".replace("aa", x)
  if (underRoot != 1) return r + "\\frac{aa \\sqrt{bb}}{2}=".replace("aa", ceoff == 1 ? "" : ceoff).replace("=", ceoff == 1 ? "" : "=").replace("bb", underRoot) + (ceoff == 1 ? "" : getFracWithRootVal(ceoff, 2, underRoot));
  else return r + "\\frac{aa}{2}=".replace("aa", ceoff) + getFracVal(ceoff, 2)
}

function calcHPSBad(s, form, ceoff, w, underRoot, a) {
  return applyABC(form).replace("S", s) + "\\frac{\\frac{aa \\sqrt{bb}}{cc}}{dd}=".replace("aa", 2 * ceoff).replace("bb", underRoot).replace("cc", w).replace("dd", a) +
    "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", 2 * ceoff).replace("bb", underRoot).replace("cc", w * a) +
    getFracWithRootVal(2 * ceoff, w * a, underRoot)
}

function applyToHForm(a) {
  return haFormula.replace("aa", a).replace("aa", a)
}
function calcHPSgood(s, a, form) {
  return applyABC(form).replace("S", s) + "\\frac{aa}{bb}=".replace("aa", 2 * s).replace("bb", a) + getFracVal(2 * s, a)
}

function calcHPgoodSbad(s, ceoff, underRoot, a, form) {
  var k;
  return applyABC(form).replace("S", s) + "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", 2 * ceoff).replace("bb", underRoot).replace("cc", a) + getFracWithRootVal(2 * ceoff, a, underRoot)
}

function removeIrr(a, b, r) {
  var s = "\\frac{aa}{bb \\sqrt{cc}}=".replace("aa", a).replace("bb", b == 1 ? "" : b).replace("cc", r)
    + applyP("\\frac{aa \\sqrt{pp}}{bb \\sqrt{pp} \\cdot \\sqrt{pp}}=", r).replace("aa", a == 1 ? "" : a).replace("bb", b == 1 ? "" : b)
    + applyP("\\frac{aa \\sqrt{pp}}{bb \\cdot pp}=", r).replace("aa", a == 1 ? "" : a).replace("bb \\cdot", b == 1 ? "" : b + " \\cdot")
    + "\\frac{aa \\sqrt{bb}}{cc}=".replace("aa", a == 1 ? "" : a).replace("bb", r).replace("cc", b * r) + getFracWithRootVal(a, b * r, r)
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
      s = "\\frac{{aa\\sqrt {bb} }}{{cc}}".replace("aa", q == 1 ? "" : q).replace("cc", w).replace("bb", r)
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
  return l.replace("aa", a).replace("bb", b).replace("cc", c).replace("aa", a).replace("bb", b).replace("cc", c)
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
      s = "\\frac{cc}{dd}".replace("cc", q == 1 ? "" : q).replace("dd", w)
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