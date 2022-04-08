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
      console.log("Cannot find empty ");
   } else {
      try {
         imageSrc.setAttribute("src", "/Github-Profile/avatar.png");
         console.log("Now your offline");

         let Fetchvalue = await fetch(
            `https://api.github.com/users/${arrValue}`
         );
         console.log(Fetchvalue);
         if (!Fetchvalue.status === 404) {
            throw Error("404 Not Found");
         }
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
setInterval(() => {
   if (navigator.onLine === false) {
      console.log("Now your offline");
      imageSrc.setAttribute("src", "/Github-Profile/avatar.png");
   } else {
      console.log("Now your online!");
   }
}, 2000);
