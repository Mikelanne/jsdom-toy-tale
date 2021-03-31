let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.getElementById("toy-collection")

  function fetchToys() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => makeCard(data));
  }
  
  fetchToys() 

  function makeCard(data) {
    data.forEach(toy => {
      const cardDiv = document.createElement("div")
      cardDiv.className = "card"
      toyCollection.append(cardDiv);
      h2 = document.createElement("h2")
      h2.innerText = `${toy.name}`
      img = document.createElement("img")
      img.src = `${toy.image}`
      img.className = "toy-avatar"
      p = document.createElement("p")
      p.innerText = `This toy has ${toy.likes} likes`
      button = document.createElement("button")
      button.innerText = "Like <3"
      button.className = "like-button"
      cardDiv.append(h2)
      cardDiv.append(img)
      cardDiv.append(p)
      cardDiv.append(button)
      button.addEventListener("click", addLikes)

      function addLikes(toy) {
        debugger
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": parseInt(toy.likes) + 1
          })
        }
  
        fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    }
    })
  }

  function submitData() {
  
    let formData = {
      name: document.querySelectorAll('.input-text')[0].value,
      img: document.querySelectorAll('.input-text')[1].value,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
  
    return fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json))
  };
  
    const submit = document.querySelector(".submit")
    submit.addEventListener("click", addNewToy)

    function addNewToy() {
      let values = document.getElementsByClassName("input-text")
      img.src = values[1].value
      submitData(values[0].value, img)
    }
    


  
  
  
});





