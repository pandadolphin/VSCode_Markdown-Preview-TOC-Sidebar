let markdownBody = null
let sidebarWrapper = null
let sidebarStatusKey = "toc-sidebar-visibility"

// Переменные с текстом для пользователя
const sidebarHeaderText = "Содержание"
const headersNotFoundText = "Здесь будут отображаться заголовки вашего документа"
const setLocalStorageErrorText = "LocalStorage: Ошибка сохранения данных"
const getLocalStorageErrorText = "LocalStorage: Ошибка получения данных"

// Утилиты
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    console.log(setLocalStorageErrorText)
  }
}

function getLocalStorage(key) {
  let localStorageItem = null
  try {
    localStorageItem = localStorage.getItem(key)
  } catch {
    console.log(getLocalStorageErrorText)
  }
  return localStorageItem
}

// Переключение боковой панели
function toggleSidebarStatusListener(btnToggleSidebar) {
  btnToggleSidebar.addEventListener("click", function () {
    if (sidebarWrapper) {
      // Проверка скрыта ли боковая панель
      // Если да, то отобразить
      // Иначе скрыть
      const sidebarStatus = sidebarWrapper.classList.contains("toc-sidebar-hidden")
      if (sidebarStatus) {
        markdownBody.classList.add("toc-max-width-limit")
        sidebarWrapper.classList.remove("toc-sidebar-hidden")
        btnToggleSidebar.classList.remove("toc-sm-position-absolute")
        setLocalStorage(sidebarStatusKey, "visible")
      } else {
        markdownBody.classList.remove("toc-max-width-limit")
        sidebarWrapper.classList.add("toc-sidebar-hidden")
        btnToggleSidebar.classList.add("toc-sm-position-absolute")
        setLocalStorage(sidebarStatusKey, "hidden")
      }
    } else {
      generateSidebar()
      btnToggleSidebar.classList.remove("toc-sm-position-absolute")
      setLocalStorage(sidebarStatusKey, "visible")
    }
  })
}

// Построение содержания оглавления
function generateToc() {
  const toc = document.createElement("div")
  toc.className = "toc"

  const sidebarHeaderTitle = document.createElement("h1")
  sidebarHeaderTitle.textContent = sidebarHeaderText
  toc.appendChild(sidebarHeaderTitle)

  // Получение селекторов заголовков
  const headers = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6")

  // Проверка наличия заголовков
  // Если заголовков нет, вывод сообщения пользователю о данном событии и выход из функции
  if (headers.length === 0) {
    const headersNotFoundElement = document.createElement("p")
    headersNotFoundElement.textContent = headersNotFoundText
    toc.appendChild(headersNotFoundElement)
    return toc
  }

  // Построение "toc"
  let levels = []
  let currentLevel = null

  headers.forEach((header, index) => {
    const levelIndex = parseInt(header.tagName.substring(1))

    // Проверка наличия "header.id"
    // Если "header.id" отсутствует, то он присваивается
    if (!header.id) {
      header.id = `toc-header-${index}`
    }

    // Если текущего уровня нет, то он создаётся
    while (levelIndex > levels.length) {
      const newList = document.createElement("ul")
      if (currentLevel) {
        // Добавление нового <ul> в последний <li>
        // Если <li> не обнаружено, то добавление нового <ul> в текущий <ul>
        const lastElementChild = currentLevel.lastElementChild
        if (lastElementChild) {
          currentLevel.lastElementChild.appendChild(newList)
        } else {
          currentLevel.appendChild(newList)
        }
      } else {
        // Если это самый первый список, добавление его в контейнер
        toc.appendChild(newList)
      }
      currentLevel = newList
      levels.push(newList)
    }

    // Если уровень <h> ниже текущего <ul>, то переход к нижестоящему по уровню <ul>
    while (levelIndex < levels.length) {
      levels.pop()
      currentLevel = levels[levels.length - 1]
    }

    // Создание элемента <li> с <a>
    const tocItem = document.createElement("li")
    const tocLink = document.createElement("a")
    tocLink.href = `#${header.id}`
    tocLink.innerText = header.textContent || header.innerText
    tocItem.appendChild(tocLink)

    // Добавление нового <li> в текущий уровень <ul>
    currentLevel.appendChild(tocItem)
  })

  // Возврат блока оглавления
  return toc
}

// Построение панели оглавления
function generateSidebar() {
  markdownBody.classList.add("toc-max-width-limit")

  sidebarWrapper = document.createElement("div")
  sidebarWrapper.className = "toc-sidebar-wrapper"

  // Построение содержания оглавления
  const toc = generateToc()

  sidebarWrapper.appendChild(toc)
  document.body.insertBefore(sidebarWrapper, document.body.firstChild)
}

function start() {
  // Построение кнопки переключения статуса панели оглавления
  const sidebarIsHidden = getLocalStorage(sidebarStatusKey) === "hidden"

  const btnToggleSidebar = document.createElement("button")
  btnToggleSidebar.id = "toc-btn-toggle-sidebar"
  btnToggleSidebar.textContent = "☰"
  markdownBody.insertBefore(btnToggleSidebar, markdownBody.firstChild)
  toggleSidebarStatusListener(btnToggleSidebar)

  // Если панель оглавления  должна быть скрыта, выход
  if (sidebarIsHidden) {
    btnToggleSidebar.classList.add("toc-sm-position-absolute")
    return
  }

  // Построение панели оглавления
  generateSidebar()
}

// Проверка статуса загрузки DOM
// Если DOM загружен, то выполнение основных функций
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    markdownBody = document.querySelector("body > .markdown-body")
    if (markdownBody) {
      start()
    } else {
      var link = document.querySelector('link[href$="md-toc-sidebar.min.css"]')
      if (link) {
        link.parentNode.removeChild(link)
      }
    }
  }
}
