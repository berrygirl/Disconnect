// Async await function
async function getUsers() {
    const res = await fetch("https://yoga-api-nzy4.onrender.com/v1/poses");
    console.log(res);
    if (!res.ok) {
      const massage = `An errror has occurred. Message: ${res.status}`;
      throw new Error(massage);// throws an error with the error message created in the previous step. 
    }
    const data = await res.json();
    return data; //The parsed JSON data is stored in the data variable.
  }
  
  getUsers().catch((err) => console.log(err.message));
  
  let listYogaPositions = document.querySelector(".list");

  // displaying yoga poses fetched from an API
  async function displayAllYogaPoses() {
    try {
      
      const data = await getUsers();
      data.forEach((category) => {
  
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
  
        newDiv.innerHTML = `
            <div class="flip-card">
              <div class="flip-card-inner">
                 <div class="flip-card-front">
                    <div class="name">${category.english_name}</div>
                    <div class="benefits"> <strong>Pose benefits:</strong>${category.pose_benefits}</div>
  
                    <img src="${category.url_svg}" class="pose">
                  </div>
              <div class="flip-card-back">
              <img src="${category.url_svg_alt}" class="pose">
              <div class="description"> <strong>Description:</strong>${category.pose_description}</div>
              
                </div> 
                </div>
               
              `;
        listYogaPositions.appendChild(newDiv); //yoga pose cards are added to the webpage.
      });
    } catch (err) { //handles any errors that might occur during the execution of the code.
      console.log(err.message);
    }
  }
  
   displayAllYogaPoses();
    
  
  // YOGA POSE FINDER 
  const search = document.getElementById('search');
  const submit = document.getElementById('submit');
  const poseEl = document.getElementById('poses');
  const resultHeading = document.getElementById('result-heading');
  const single_poseEl = document.getElementById('single-pose');
  
  // Search meal and fetch from API
  function searchPose(e) {
    e.preventDefault();
  
    // Clear single pose
    single_poseEl.innerHTML = '';
  
    // Get search term
    const term = search.value;
  
    // Check for empty
    if (term.trim()) {
      fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${term}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
  
          if (!data || typeof data !== 'object') {
            resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
          } else {
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
            const pose = data; 
  
            // Display the pose information
            poseEl.innerHTML = `
              <div class="pose-info">
              <div class="name"> <strong>Name:</strong>${pose.english_name}</div>
              <div class="benefits"> <strong>Pose benefits:</strong>${pose.pose_benefits}</div>
              <div class="description"> <strong>Description:</strong>${pose.pose_description}</div>
              <img src="${pose.url_svg_alt}" class="pose">
                </div>
              </div>
            `;
            
          }
        });
      // Clear search text
      search.value = '';
    } else {
      alert('Please enter a search term');
    }
  }
  
  
  // Event listeners
  submit.addEventListener('submit', searchPose); //When the input(term search) is submitted, the searchPose function is called. 
  
  poseEl.addEventListener('click', e => {
    const poseInfo = e.path.find(item => {
      if (item.classList) {
        return item.classList.contains('pose-info');
      } else {
        return false;
      }
    });
  
    if (poseInfo) {
      const poseID = poseInfo.getAttribute('data-poseid');
      getYogaById(poseID);
    }
  });
  
  //Search BY LEVEL
  function fetchPosesByLevelAndCategory(categoryId) {
    // Get the selected level and category
    const levelSelect = document.getElementById("levelSelect");
    const selectedLevel = levelSelect.value;
  
    // Fetch poses based on the selected level and category
    fetch(`https://yoga-api-nzy4.onrender.com/v1/categories?id=${categoryId}&level=${selectedLevel}`)
        .then(response => response.json())
        .then(data => {
            const posesContainer = document.getElementById("posesContainer");
            posesContainer.innerHTML = ""; // Clear previous results
  
            // Check if there are poses for the selected level and category
            if (data && Array.isArray(data.poses) && data.poses.length > 0) {
                // Loop through the poses and display them
                // console.log(data);
                
  
                data.poses.forEach(pose => {
                    const poseElement = document.createElement("div");
                    poseElement.className = "pose";
                    poseElement.innerHTML = `
                    <div class="category"><strong>Category name:</strong>${pose.category_name}</div>
                    <div class="name"><strong>Pose name:</strong>${pose.english_name}</div>
                    
                        <img src="${pose.url_svg_alt}" class="pose">
                    `;
                    posesContainer.appendChild(poseElement);
                });
            } else {
                // No poses found for the selected level and category
                posesContainer.innerHTML = "<p>No poses found for the selected level and category.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
  }
  
  function fetchPosesForAllCategories() {
    const categoryIds = [1, 2, 3,4,5,6, 7,8,9,11,12 ];
  
    categoryIds.forEach(categoryId => {
        fetchPosesByLevelAndCategory(categoryId);
    });
  }
  