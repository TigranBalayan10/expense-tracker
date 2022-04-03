//Game over noise
function O(i) {
    return typeof i === 'object' ? i : document.getElementById(i)
}
function S(i) {
    return O(i).style
}
function C(i) {
    return document.getElementByClassName(i)
}

function expenseMade() {
    O('add-tag-sound').play();
}
function tagAdded() {
    O('add-expense-sound').play();
}