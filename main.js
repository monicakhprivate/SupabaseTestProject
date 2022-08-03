import "./style.css";
import { supabase } from "./supabase";

const blogsContainer = document.getElementById("blogs");
const form = document.getElementById("form");
const title = document.getElementById("title");
const content = document.getElementById("content");

/************************************* gets the data from supabase *********************************************/ 
const useData = async () => {
  const { data, error } = await supabase.from("blogs").select(); 
  console.log(data);
  console.log(error);
  let html = "";
  data.forEach((blog) => {
    html += `
            <div data-id="${blog.id}"></br>
              <h1 class="text-2xl">${blog.title}</h1>
              <p>${blog.content}</p>
            </div>
            `;
  });
  blogsContainer.innerHTML = html;
};
useData();
/*************************************** inserts data into supabase ******************************************/
window.addEventListener("DOMContentLoaded", useData);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.from("blogs").insert([
    {
      title: title.value,
      content: content.value,
    },
  ]);

  useData();
  //Test();
});

/*********************************************************************************/
// const Test = async () => {
//   tasksNames = ['task1', 'task2'];
//   const {data, error} = await supabase.from("blogs").delete().filter("title", "in", `(${tasksNames})`);
// };