const myTextArea = document.getElementById("blogArea");
const placeholderRow = 2; // The row number you want to display the placeholder text in
let stringText = ""

if (myTextArea){
  myTextArea.addEventListener('input', () => {
    // myTextArea.rows = myTextArea.value.split('\n').length;
    stringText = stringText +1
    // console.log(stringText.length)
    if (stringText.length >= 27){
      stringText = ""
      myTextArea.rows = myTextArea.rows + 1
    }
  });
};



// const myTextArea = document.getElementById("blogArea");
// myTextArea.placeholder = "Placeholder text goes here...";



// myTextArea.addEventListener("input", () => {
//   const rows = myTextArea.value.split("\n");
//   if (rows.length >= placeholderRow) {
//     rows[placeholderRow - 1] = "Placeholder text goes here...";
//     myTextArea.value = rows.join("\n");
//   }
// });