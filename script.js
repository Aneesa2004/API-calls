// Fetch using fetch()
document.getElementById("fetchBtn").addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (!response.ok) throw new Error("Server error");
      return response.json();
    })
    .then((data) => {
      displayOutput(`Fetch: <h3>${data.title}</h3><p>${data.body}</p>`);
    })
    .catch((error) => {
      displayOutput(`<p class='error'>Fetch error: ${error.message}</p>`);
    });
});

// Fetch using XHR
document.getElementById("xhrBtn").addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      displayOutput(`XHR: <h3>${data.title}</h3><p>${data.body}</p>`);
    } else {
      displayOutput(`<p class='error'>XHR error: ${xhr.statusText}</p>`);
    }
  };
  xhr.onerror = () => {
    displayOutput("<p class='error'>XHR network error</p>");
  };
  xhr.send();
});

// POST request
document.getElementById("postForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => response.json())
    .then(() => {
      displayOutput(`<p class='success'>✅ POST successful! Title: <strong>${title}</strong></p>`);
      // Clear form fields
      document.getElementById("postTitle").value = "";
      document.getElementById("postBody").value = "";
    })
    .catch((error) => {
      displayOutput(`<p class='error'>POST error: ${error.message}</p>`);
    });
});

// PUT request
document.getElementById("putForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("putId").value;
  const title = document.getElementById("putTitle").value;
  const body = document.getElementById("putBody").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      displayOutput(`<p class='success'>✅ PUT successful! Updated Title: <strong>${title}</strong></p>`);
      // Clear form fields
      document.getElementById("putId").value = "";
      document.getElementById("putTitle").value = "";
      document.getElementById("putBody").value = "";
    } else {
      displayOutput(`<p class='error'>PUT error: ${xhr.statusText}</p>`);
    }
  };
  xhr.onerror = () => {
    displayOutput("<p class='error'>PUT network error</p>");
  };
  xhr.send(JSON.stringify({ title, body }));
});

// DELETE request
document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("deleteId").value;

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        displayOutput(`<p class='success'>🗑️ Post with ID <strong>${id}</strong> has been deleted.</p>`);
        document.getElementById("deleteId").value = "";
      } else {
        throw new Error("Failed to delete post");
      }
    })
    .catch((error) => {
      displayOutput(`<p class='error'>DELETE error: ${error.message}</p>`);
    });
});

// Helper function to display output
function displayOutput(html) {
  document.getElementById("output").innerHTML = html;
}
