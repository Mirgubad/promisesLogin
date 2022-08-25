const sbmtbtn = document.getElementById("sbmtbtn")
const loadword = document.getElementById("load")
const wronginfo = document.getElementById("wronginfo")
const studenttable = document.getElementById("sttable")
const loginmenu = document.getElementById("form")
const tablebody = document.getElementById("table-body")
const notdrink = document.getElementById("notdrink")
const jointxt = document.getElementById("jointext")
const loadingtxt = document.getElementById("loading")
const drinkname = "Vodka"
studenttable.style.display = "none"
notdrink.style.display = "none"
loadingtxt.style.display = "none"
var data = {id: 221}
var beverageid = {id: 223}
const drinks = [
  (vodka = {
    Name: "Vodka",
    Id: 223,
    Price: 100.99,
    Piece: 27,
    ReleaseYear: "1992",
  }),
]

const userInfo = {
  mail: "mirqubad@mail.ru",
  password: "12345",
  id: 221,
  name: "Mirqubad",
  surname: "Akberov",
  age: "32",
}

function login(email, pass, sucessCallBack, errorCallBack) {
  setTimeout(() => {
    if (userInfo.mail === email && userInfo.password === pass) {
      console.log("1.LOGIN WORKING")
      studenttable.style.display = "block"
      sbmtbtn.style.background = "green"
      wronginfo.style.display = "none"
      studenttable.style.display = "block"
      loginmenu.style.display = "none"
      jointxt.style.display = "none"
      loadingtxt.style.display = "block"
      return sucessCallBack(data.id)
    } else {
      sbmtbtn.style.background = "red"
      wronginfo.style.display = "block"
      loadword.style.display = "none"
      return errorCallBack({err: "User not found"})
    }
  }, 200)
}

function idChecker(data, sucessCallBack, errorCallBack) {
  setTimeout(() => {
    if (data === userInfo.id) {
      console.log("2.ID CHECKER WORKING")
      // console.log([userInfo.name, userInfo.surname, userInfo.age])
      return sucessCallBack([userInfo.name, userInfo.surname, userInfo.age])
    } else {
      return errorCallBack({err: "Id wasn't mach"})
    }
  }, 400)
}

function ageChecker(ages, sucessCallBack, errorCallBack) {
  setTimeout(() => {
    if (ages > 18) {
      console.log("3.AGE CHECKER WORKING")

      return sucessCallBack(true)
    } else {
      studenttable.style.display = "none"
      notdrink.style.display = "block"
      loadingtxt.style.display = "none"
      return errorCallBack({err: false})
    }
  }, 500)
}

function drinkList(sucessCallBack, errorCallBack) {
  setTimeout(() => {
    if (ageChecker) {
      console.log("4.DRINK LIST WORKING")

      // console.log(drinks)
      return sucessCallBack(drinks)
    } else {
      return errorCallBack({err: "Drink list is empty"})
    }
  }, 900)
}

function drinkFinder(drinkname, sucessCallBack, errorCallBack) {
  setTimeout(() => {
    if (drinkname === "Vodka") {
      console.log("5.DRINK FINDER WORKING")
      // console.log("#BEVERAGEID:" + beverageid)
      return sucessCallBack(beverageid)
    } else {
      return errorCallBack({err: "Drink id Not found"})
    }
  }, 200)
}

function drinkResult(beverageid, sucessCallBack, errorCallBack) {
  setTimeout(() => {
    drinks.find((item) => {
      if (item.Id === beverageid.id) {
        console.log("6.DRINK RESULT WORKING")
        loadingtxt.innerHTML = "RESULT"
        return sucessCallBack(item)
      } else {
        return errorCallBack({err: "Drink not found"})
      }
    })
  }, 1000)
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

    tablebody.insertAdjacentHTML("beforeend", drinkrow)
  })
}

sbmtbtn.addEventListener("click", (e) => {
  e.preventDefault()
  const mail = document.getElementById("mail").value
  const password = document.getElementById("password").value
  document.getElementById("form").reset()
  loadword.style.display = "block"

  login(
    mail,
    password,
    (data) => {
      idChecker(
        data,
        (userInfo) => {
          ageChecker(
            userInfo[2],
            () => {
              drinkList(
                (drinks) => {
                  drinkFinder(
                    drinkname,
                    () => {
                      drinkResult(
                        beverageid,
                        (drinks) => {
                          renderDrinkList()
                          console.table(drinks)
                        },
                        (err) => console.log("DRINKS NOT FOUND", err)
                      )
                    },
                    (err) => console.log("DRINK ERROR", err)
                  )
                },

                (err) => console.log("DRINK LIST IS EMPTY", err)
              )
            },
            (err) => console.log("AGE IS ALLOWED", err)
          )
        },
        (err) => console.log("ID ERROR", err)
      )
    },
    (err) => console.log("LOGIN ERROR", err)
  )
})
