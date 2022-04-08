let fromData = document.getElementById("fromData");

fromData.addEventListener("submit", async function (e) {
   e.preventDefault();

   let input = document.getElementById("input");
   let name = document.getElementById("username");
   let searchId = document.getElementById("searchId");
   let imageSrc = document.getElementById("imageSrc");

   let lowerCaseValue = input.value.toLowerCase();
   let splitValue = lowerCaseValue.split(" ");
   let arrValue = splitValue.join("");

   if (arrValue === "") {
      name.innerText = `Cannot find empty`;
      // console.log("Cannot find empty ");
   } else {
      try {
         let Fetchvalue = await fetch(
            `https://api.github.com/users/${arrValue}`
         );
         let response = await Fetchvalue.json();
         let data = await response;
         // console.log(data.name);

         if (data.name === undefined || data.name === null) {
            name.innerText = `Github name not found! ${arrValue}`;
         } else {
            name.innerText = `Github name is: ${data.name}`;
         }
         // console.log(data);
         imageSrc.setAttribute("src", data.avatar_url);
      } catch (error) {
         console.log(error);
      }
   }
   input.value = "";
   searchId.innerText = "";
});
