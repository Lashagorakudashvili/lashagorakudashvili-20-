const openRegModal = document.querySelector(".open-reg-modal");

function showModal(selector) {
	const modal = document.querySelector(selector);
	if (modal) {
		const closeBtn = modal.querySelector(".close-btn");

		modal.classList.add("active");
		closeBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
		});
		modal.addEventListener("click", (e) => {
			
			if (e.target.classList.contains("modal")) {
				modal.classList.remove("active");
			}
		});
	}
}

openRegModal.addEventListener("click", () => {
	showModal("#reg-form-modal");
});

const closeBtn = document.querySelector(".close-btn");

	userName = document.querySelector("#user_name"),
	userLastName = document.querySelector("#user_surname"),
	userMobile = document.querySelector("#user_phone"),
	userPersonalId = document.querySelector("#user_personal-id"),
	userEmail = document.querySelector("#user_email"),
	userZipCode = document.querySelector("#user_zip-code"),

	user_id = document.querySelector("#user_id");
let userGender = document.querySelector("[name='gender']");



const form = document.querySelector('#register-user');
const table = document.querySelector('table tbody');



form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  const id = Math.floor(Math.random() * 100) + 1;
  const name = document.querySelector('#user_name').value;
  const surname = document.querySelector('#user_surname').value;
  const email = document.querySelector('#user_email').value;
  const personalId = document.querySelector('#user_personal-id').value;
  const phone = document.querySelector('#user_phone').value;
  const zip = document.querySelector('#user_zip-code').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;

  
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td style="text-align: center;">${id}</td>
    <td style="text-align: center;">${name}</td>
    <td style="text-align: center;">${surname}</td>
    <td style="text-align: center;">${email}</td>
    <td style="text-align: center;">${personalId}</td>
    <td style="text-align: center;">${phone}</td>
    <td style="text-align: center;">${zip}</td>
    <td style="text-align: center;">${gender}</td>
    <td style="border-right: 1.5px solid black ;"><button>Edit</button> <button>Delete</button></td>
  `;

  
  table.appendChild(newRow);

 
  form.reset();
});


function addNewUser(userObj) {
  fetch("https://borjomi.loremipsum.ge/api/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    if (data.status === 1) {
     
      getAllUsers();
      form.reset();
      closeBtn.click();
    }
  })
  .catch((err) => {
    console.error(err);
  });
}


const table2 = document.querySelector('#my-table');
const regForm = document.querySelector('#register-user');

table.addEventListener('click', (event) => {
  const openModalBtn = document.querySelector('.open-reg-modal');
  const formSubmitBtn = document.querySelector('#submit-user');

  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const row = event.target.closest('tr');
    row.remove();
  } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
    openModalBtn.click();

    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');
    const id = cells[0].textContent;
    const name = cells[1].textContent;
    const surname = cells[2].textContent;
    const email = cells[3].textContent;
    const personalId = cells[4].textContent;
    const mobileNumber = cells[5].textContent;
    const zip = cells[6].textContent;
    const gender = cells[7].textContent;

    regForm.querySelector('#user_id').value = id;
    regForm.querySelector('#user_name').value = name;
    regForm.querySelector('#user_surname').value = surname;
    regForm.querySelector('#user_email').value = email;
    regForm.querySelector('#user_personal-id').value = personalId;
    regForm.querySelector('#user_phone').value = mobileNumber;
    regForm.querySelector('#user_zip-code').value = zip;
    regForm.querySelector(`input[name=gender][value=${gender}]`).checked = true;

  
    regForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
    
      cells[1].textContent = regForm.querySelector('#user_name').value;
      cells[2].textContent = regForm.querySelector('#user_surname').value;
      cells[3].textContent = regForm.querySelector('#user_email').value;
      cells[4].textContent = regForm.querySelector('#user_personal-id').value;
      cells[5].textContent = regForm.querySelector('#user_phone').value;
      cells[6].textContent = regForm.querySelector('#user_zip-code').value;
      cells[7].textContent = regForm.querySelector(`input[name=gender]:checked`).value;
      
     
      closeBtn.click();
      regForm.reset();
    });
  }
});

const openModalBtn = document.querySelector('.open-reg-modal');
const closeBtn2 = document.querySelector('.close-reg-modal');

openModalBtn.addEventListener('click', () => {
  regForm.reset();
});

closeBtn.addEventListener('click', () => {
  regForm.reset();
});


const createUserUrl = "https://borjomi.loremipsum.ge/api/register", 
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", 
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", 
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", 
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1";


function addNewUser(userObj) {
	fetch("https://borjomi.loremipsum.ge/api/register", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userObj),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			if (data.status === 1) {
				getAllUsers();
				form.reset();
				closeBtn.click();
				

				
			}
		});
}

async function deleteUser(id) {
	try {
		const res = await fetch(
			`https://borjomi.loremipsum.ge/api/delete-user/${id}`,
			{
				method: "delete",
			}
		);

		

		const data = await res.json();
		console.log(data);
		if (data.status == 1) {
			getAllUsers();
		}
	} catch (error) {
		console.log(error);
	}
}


function renderUsers(usersArray) {
	

	console.log(usersArray);
	userActions();
}


function userActions() {
	
}

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => res.json())
		.then((data) => {
			console.log(data.users);
			
			renderUsers();
		})
		.catch((err) => console.log(err));
}

function getUser(id) {
	fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
		method: "get",
	})
		.then((res) => res.json())
		.then((data) => {
			
			console.log(data);
			
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUser(userObj) {
	
}

getAllUsers();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		id: user_id.value, 
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	
});