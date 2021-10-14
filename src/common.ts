export function getRange(total) {
    if (total >= 0 && total <= 0.69) {
        return 0;
    }
    if (total >= 0.70 && total <= 1.19) {
        return 1;
    }
    if (total >= 1.20 && total <= 1.70) {
        return 2;
    }
    if (total >= 1.71 && total <= 3) {
        return 3;
    }
}
