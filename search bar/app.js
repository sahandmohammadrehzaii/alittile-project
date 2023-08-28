const searchBtn = document.querySelector(".icon"),
  searchBox = document.querySelector(".search-box");

searchBtn.addEventListener("click", () => {
  searchBox.classList.toggle("active");
});
