const sbmtbtn = document.getElementById("sbmtbtn")
const loadword = document.getElementById("load")
const wronginfo = document.getElementById("wronginfo")
const studenttable = document.getElementById("sttable")
const loginmenu = document.getElementById("form")
const tablebody = document.getElementById("table-body")
const notdrink = document.getElementById("notdrink")
const jointxt = document.getElementById("jointext")
const loadingtxt = document.getElementById("loading")
notdrink.style.display = "none"
studenttable.style.display = "none"
loadingtxt.style.display = "none"
var data = {id: 21}
var beverageid = 223
const drinkname = "Vodka"
const drinks = [
  (vodka = {
    Name: "Vodka",
    Id: 223,
    Price: 100.99,
    Piece: 37,
    ReleaseYear: "1992",
  }),
]

const userInfo = {
  mail: "mirqubad@mail.ru",
  password: "12345",
  id: 21,
  name: "Mirqubad",
  surname: "Akberov",
  age: "31",
}

function login(email, pass) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userInfo.mail === email && userInfo.password === pass) {
        console.log("1.LOGIN WORKING")
        sbmtbtn.style.background = "green"
        wronginfo.style.display = "none"
        loadingtxt.style.display = "block"
        loginmenu.style.display = "none"
        jointxt.style.display = "none"
        notdrink.style.display = "none"
        studenttable.style.display = "none"
        return resolve(data.id)
      } else {
        sbmtbtn.style.background = "red"
        wronginfo.style.display = "block"
        loadword.style.display = "none"
        return reject({err: "User not found"})
      }
    }, 300)
  })
}

function idChecker(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data === userInfo.id) {
        console.log("2.ID CHECKER WORKING")
        return resolve([userInfo.name, userInfo.surname, userInfo.age])
      } else {
        return reject({err: "Id wasn't mach"})
      }
    }, 200)
  })
}

function ageChecker(ages) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ages > 18) {
        console.log("3.AGE CHECKER WORKING")
        return resolve(true)
      } else {
        studenttable.style.display = "none"
        notdrink.style.display = "block"
        loadingtxt.style.display = "none"
        return reject({err: false})
      }
    }, 100)
  })
}

function drinkList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ageChecker) {
        console.log("4.DRINK ALLOW ACCEPTED")
        return resolve(drinks)
      } else {
        return reject({err: "Drink list is empty"})
      }
    }, 1000)
  })
}

function drinkFinder(drinkname) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (drinks.Name === drinkname) {
        console.log("5.DRINK FINDER WORKING")
        // console.log("#BEVERAGEID:" + beverageid)
        return resolve(beverageid)
      } else {
        return reject({err: "Drink id Not found"})
      }
    }, 500)
  })
}

function drinkResult() {
  const id = beverageid
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      drinks.find((item) => {
        if (item.Id === id) {
          // renderDrinkList()
          loadingtxt.innerHTML = "RESULT"
          console.log("6.DRINK RESULT WORKING")
          return resolve(item)
        } else {
          loadingtxt.style.display = "none"
          return reject({err: "Drink not found"})
        }
      })
    }, 500)
  })
}

function renderDrinkList() {
  tablebody.innerHTML = ""
  drinks.map((drink) => {
    const drinkrow = `
    <th>#ID</th>
    <th>Name</th>
    <th>Release Year</th>
    <th>Price</th>
    <th>Piece</th>
          <tr>
              <td>${drink.Id}</td>
              <td>${drink.Name}</td>
              <td>${drink.ReleaseYear}</td>
              <td>${drink.Price}$</td>
              <td>${drink.Piece}</td>
             
          </tr>
      `
    studenttable.style.display = "block"
    tablebody.insertAdjacentHTML("beforeend", drinkrow)
  })
}

sbmtbtn.addEventListener("click", (e) => {
  e.preventDefault()
  const mail = document.getElementById("mail").value
  const password = document.getElementById("password").value
  document.getElementById("form").reset()
  loadword.style.display = "block"

  login(mail, password)
    .then((data) =>
      idChecker(data)
        .then((userInfo) =>
          ageChecker(userInfo[2])
            .then(() =>
              drinkList()
                .then(() =>
                  drinkFinder()
                    .then(() =>
                      drinkResult()
                        .then(() => renderDrinkList(), console.table(drinks))
                        .catch((err) =>
                          console.log("DRINK RESULT PROBLEM", err)
                        )
                    )
                    .catch((err) => console.log("DRINK FINDER PROBLEM", err))
                )

                .catch((err) => console.log("DRINK LIST PROBLEM", err))
            )
            .catch((err) => console.log("AGE ALLOW", err))
        )
        .catch((err) => console.log("İD PROBLEM", err))
    )
    .catch((err) => console.log("LOGIN PROBLEM", err))
})
// login(mail, password).then((data) => console.log(data.Name))
