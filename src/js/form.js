/*const openRegModal = document.querySelector(".open-reg-modal");

function showModal(selector) {
	const modal = document.querySelector(selector);
	if (modal) {
		const closeBtn = modal.querySelector(".close-btn");

		modal.classList.add("active");
		closeBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
		});
		modal.addEventListener("click", (e) => {
			// console.log(e.target);
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
const form = document.querySelector("#register-user"),
	userName = document.querySelector("#user_name"),
	userLastName = document.querySelector("#user_surname"),
	userMobile = document.querySelector("#user_phone"),
	userPersonalId = document.querySelector("#user_personal-id"),
	userEmail = document.querySelector("#user_email"),
	userZipCode = document.querySelector("#user_zip-code"),
	// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
	user_id = document.querySelector("#user_id");
let userGender = document.querySelector("[name='gender']");

const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

// const user = {
// 	first_name: "satesto",
// 	last_name: "text",
// 	phone: "123456789",
// 	id_number: "12345678909",
// 	email: "text@gmail.com",
// 	gender: "male",
// 	zip_code: "1245",
// };

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
				// console.log(form);

				// window.location = "index.html";
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

		// console.log(res);

		const data = await res.json();
		console.log(data);
		if (data.status == 1) {
			getAllUsers();
		}
	} catch (error) {
		console.log(error);
	}
}

// TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
	// TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
	// TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

	console.log(usersArray);
	userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

// TODO: დაასრულე
function userActions() {
	// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
	// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
	// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
	// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
	// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია. ფორმის დასაბმითებისას უნდა მოხდეს updateUser() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ
}

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => res.json())
		.then((data) => {
			console.log(data.users);
			// html-ში გამოტანა მონაცემების
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
			// გვიბრუნებს იუზერის ობიექტს
			console.log(data);
			//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUser(userObj) {
	// მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
	// TODO დაასრულეთ ფუნქცია
	//  method: "put",  https://borjomi.loremipsum.ge/api/update-user/${userObj.id}
	// userObj -იც უნდა გადასცეთ როგორც addNewUser ფუნქიაში
	// TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
}

getAllUsers();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	// addNewUser(userObj);

	//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  --> addNewUser(userObj)

	// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
	// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUser(userObj);
});*/






/*//////////////////////////////*/
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
			// console.log(e.target);
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
/*const form = document.querySelector("#register-user"),*/
	userName = document.querySelector("#user_name"),
	userLastName = document.querySelector("#user_surname"),
	userMobile = document.querySelector("#user_phone"),
	userPersonalId = document.querySelector("#user_personal-id"),
	userEmail = document.querySelector("#user_email"),
	userZipCode = document.querySelector("#user_zip-code"),
	// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
	user_id = document.querySelector("#user_id");
let userGender = document.querySelector("[name='gender']");



/*.////////////////////////*/
const form = document.querySelector('#register-user');
const table = document.querySelector('table tbody');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  const id = Math.floor(Math.random() * 100) + 1; // generate a random id for each user
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
/*///////////////////*/



/*///////////////////*/
// const table = document.querySelector('table');

/*table.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const row = event.target.closest('tr');
    row.remove();
  }
  else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
    // Handle edit button click here
    console.log('Edit button clicked');
  }
});*/
/*//////////////////////////////////////////////////////////////////////////////////////////////////////*/


/*//////////////////////*/
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
      // If the server responds with a success message,
      // update the table in the DOM and reset the form
      getAllUsers();
      form.reset();
      closeBtn.click();
    }
  })
  .catch((err) => {
    console.error(err);
  });
}
/*//////////////////////*/



/*//////////////////////*/
/*const editBtn = document.querySelector("table button");
const regFormModal = document.querySelector(".reg-form-modal");
// const closeBtn = regFormModal.querySelector(".close-btn");
const openModalBtn = document.querySelector(".open-reg-modal");
const modalSelector = "#registration-modal";

editBtn.addEventListener("click", function() {
  openModalBtn.click();
});

closeBtn.addEventListener("click", function() {
  regFormModal.style.display = "none";
});

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

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    showModal(modalSelector);
  });
}*/
/*//////////////////////*/





/*const table = document.querySelector("table");

// open registration form modal
const openModalBtn = document.querySelector(".open-reg-modal");
const modal = document.getElementById("reg-form-modal");
const closeModalBtn = document.querySelector(".close-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// delete row
const deleteBtns = document.querySelectorAll("table tbody tr button:last-of-type");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentNode.parentNode.remove();
  });
});

// edit row
const editBtns = document.querySelectorAll("table tbody tr button:first-of-type");

editBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";

    const currentRow = btn.parentNode.parentNode;
    const inputs = modal.querySelectorAll("input[type='text'], input[type='number'], input[type='email'], input[type='radio']");
    
    inputs.forEach((input) => {
      const inputName = input.getAttribute("name");
      const cellValue = currentRow.querySelector(`td[data-name='${inputName}']`).textContent;
      
      input.value = cellValue;
    });

    const userIdInput = modal.querySelector("#user_id");
    userIdInput.value = currentRow.querySelector("td:first-of-type").textContent;
  });
});

// submit form
const submitFormBtn = document.querySelector(".submit-form");
const form = document.querySelector("#register-user");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = form.querySelector("#user_id").value;
  const name = form.querySelector("#user_name").value;
  const surname = form.querySelector("#user_surname").value;
  const phone = form.querySelector("#user_phone").value;
  const personalId = form.querySelector("#user_personal-id").value;
  const email = form.querySelector("#user_email").value;
  const zipCode = form.querySelector("#user_zip-code").value;
  const gender = form.querySelector("input[type='radio']:checked").value;

  const newRow = `
    <tr>
      <td style="text-align: center;">${id}</td>
      <td data-name="name" style="text-align: center;">${name}</td>
      <td data-name="surname" style="text-align: center;">${surname}</td>
      <td data-name="email" style="text-align: center;">${email}</td>
      <td data-name="personalId" style="text-align: center;">${personalId}</td>
      <td data-name="phone" style="text-align: center;">${phone}</td>
      <td data-name="zipCode" style="text-align: center;">${zipCode}</td>
      <td data-name="gender" style="text-align: center;">${gender}</td>
      <td style="border-right: 1.5px solid black ;"><button>Edit</button> <button>Delete</button></td>
    </tr>
  `;

  if (id === "") {
    table.querySelector("tbody").insertAdjacentHTML("beforeend", newRow);
  } else {
    const rowToUpdate = table.querySelector(`tbody tr td:first-of-type[data-id='${id}']`).parentNode;
    rowToUpdate.outerHTML = newRow;
  }

  modal.style.display = "none";
  form.reset();
});*/

/*//////////////////////*/














/*const editButton = document.querySelector('.edit');
const openRegFormButton = document.querySelector('.open-reg-modal');

editButton.addEventListener('click', () => {
  openRegFormButton.click();
});*/



const mytable = document.querySelector('#my-table');

table.addEventListener('click', (event) => {
  const openModalBtn = document.querySelector('.open-reg-modal'); // define openModalBtn inside the event listener

  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const row = event.target.closest('tr');
    row.remove();
  } else if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
    console.log('Edit button clicked');
    openModalBtn.click(); // trigger click event on openModalBtn
  }
});






































/*///////////////////////*/
const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

// const user = {
// 	first_name: "satesto",
// 	last_name: "text",
// 	phone: "123456789",
// 	id_number: "12345678909",
// 	email: "text@gmail.com",
// 	gender: "male",
// 	zip_code: "1245",
// };

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
				// console.log(form);

				// window.location = "index.html";
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

		// console.log(res);

		const data = await res.json();
		console.log(data);
		if (data.status == 1) {
			getAllUsers();
		}
	} catch (error) {
		console.log(error);
	}
}

// TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
	// TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
	// TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

	console.log(usersArray);
	userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

// TODO: დაასრულე
function userActions() {
	// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
	// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
	// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
	// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
	// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია. ფორმის დასაბმითებისას უნდა მოხდეს updateUser() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ
}

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => res.json())
		.then((data) => {
			console.log(data.users);
			// html-ში გამოტანა მონაცემების
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
			// გვიბრუნებს იუზერის ობიექტს
			console.log(data);
			//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUser(userObj) {
	// მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
	// TODO დაასრულეთ ფუნქცია
	//  method: "put",  https://borjomi.loremipsum.ge/api/update-user/${userObj.id}
	// userObj -იც უნდა გადასცეთ როგორც addNewUser ფუნქიაში
	// TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
}

getAllUsers();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	// addNewUser(userObj);

	//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  --> addNewUser(userObj)

	// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
	// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUser(userObj);
});








