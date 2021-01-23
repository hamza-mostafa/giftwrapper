const cm2inchMultiplier = 100/254;

exports.cm2inch = (cm) => {
    return cm * cm2inchMultiplier;
}