for (let i = 0; i < 128; i++) {
  document.write(
    "<div style='background-color: lightgreen;'>" +
      String.fromCharCode(i) +
      "</div>"
  );
}

var 厉害 = 3;
console.log(厉害);

let a = 0.1,
  b = 0.2;

const memory = new Float64Array(1);
memory[0] = a;

const intarr = new Uint8Array(memory.buffer);

console.log(intarr);

for (let i = 0; i < 8; i++) {
  document.write(intarr[i].toString(2).padStart(8, "0"));
}
