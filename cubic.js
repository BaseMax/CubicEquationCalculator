// https://github.com/BaseMax/CubicEquationCalculator
'use strict';

const cubicSolve = (a, b, c, d) => {
    b /= a
    c /= a
    d /= a

    var q, r, s, t, term1
    let r13

    q = (3.0*c - (b*b))/9.0
    r = -(27.0*d) + b*(9.0*c - 2.0*(b*b))
    r /= 54.0

    const discrim = q*q*q + r*r

    var roots = [
        {real: 0, i: 0},
        {real: 0, i: 0},
        {real: 0, i: 0}
    ]

    term1 = (b/3.0)

    // one root real, two are complex
    if (discrim > 0) {
        s = r + Math.sqrt(discrim)
        s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)))
        t = r - Math.sqrt(discrim)
        t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)))

        roots[0].real = -term1 + s + t
        term1 += (s + t)/2.0
        roots[2].real = roots[1].real = -term1
        term1 = Math.sqrt(3.0)*(-t + s)/2

        roots[1].i = term1;
        roots[2].i = -term1;
        return roots;
    }

    // The remaining options are all real
    // All roots real, at least two are equal.
    if(discrim == 0) {
        r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
        roots[0].real = -term1 + 2.0*r13;
        roots[2].real = roots[1].real = -(r13 + term1);
        return roots;
    }

    // Only option left is that all roots are real and unequal (to get here, q < 0)
    q = -q
    const dum1 = Math.acos(r/Math.sqrt(q*q*q))
    r13 = 2.0*Math.sqrt(q)

    roots[0].real = -term1 + r13*Math.cos(dum1/3.0)
    roots[1].real = -term1 + r13*Math.cos((dum1 + 2.0*Math.PI)/3.0)
    roots[2].real = -term1 + r13*Math.cos((dum1 + 4.0*Math.PI)/3.0)

    return roots
}
