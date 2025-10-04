let markdownBody = null
let sidebarWrapper = null
let sidebarStatusKey = "toc-sidebar-visibility"
let languageKey = "toc-sidebar-language"
let headersObserver = null
let activeHeaderId = null
let isClickScrolling = false
let clickScrollTimeout = null

// Localization strings
const translations = {
  en: {
    sidebarHeader: "Table of Contents",
    headersNotFound: "Document headers will be displayed here",
    setLocalStorageError: "LocalStorage: Error saving data",
    getLocalStorageError: "LocalStorage: Error retrieving data"
  },
  ru: {
    sidebarHeader: "Содержание",
    headersNotFound: "Здесь будут отображаться заголовки вашего документа",
    setLocalStorageError: "LocalStorage: Ошибка сохранения данных",
    getLocalStorageError: "LocalStorage: Ошибка получения данных"
  },
  zh: {
    sidebarHeader: "目录",
    headersNotFound: "文档标题将显示在这里",
    setLocalStorageError: "LocalStorage: 保存数据时出错",
    getLocalStorageError: "LocalStorage: 获取数据时出错"
  }
}

// Detect and get current language
function getLanguage() {
  // Check localStorage for manual override
  const savedLang = localStorage.getItem(languageKey)
  if (savedLang && translations[savedLang]) {
    return savedLang
  }

  // Detect browser language
  const browserLang = navigator.language || navigator.userLanguage
  const langCode = browserLang.toLowerCase().split(/[-_]/)[0]

  // Return supported language or default to English
  return translations[langCode] ? langCode : "en"
}

// Get localized text
const currentLang = getLanguage()
const i18n = translations[currentLang]

// Утилиты
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    console.log(i18n.setLocalStorageError)
  }
}

function getLocalStorage(key) {
  let localStorageItem = null
  try {
    localStorageItem = localStorage.getItem(key)
  } catch {
    console.log(i18n.getLocalStorageError)
  }
  return localStorageItem
}

// Переключение боковой панели
function toggleSidebar(btnToggleSidebar) {
  if (sidebarWrapper) {
    // Проверка скрыта ли боковая панель
    // Если да, то отобразить
    // Иначе скрыть
    const sidebarStatus = sidebarWrapper.classList.contains("toc-sidebar-hidden")
    if (sidebarStatus) {
      markdownBody.classList.add("toc-max-width-limit")
      sidebarWrapper.classList.remove("toc-sidebar-hidden")
      setLocalStorage(sidebarStatusKey, "visible")
      // Запустить наблюдатель заголовков
      initHeadersObserver()
    } else {
      markdownBody.classList.remove("toc-max-width-limit")
      sidebarWrapper.classList.add("toc-sidebar-hidden")
      setLocalStorage(sidebarStatusKey, "hidden")
      // Остановить наблюдатель заголовков
      stopHeadersObserver()
    }
  } else {
    generateSidebar()
    setLocalStorage(sidebarStatusKey, "visible")
    // Запустить наблюдатель заголовков
    initHeadersObserver()
  }
}

function toggleSidebarStatusListener(btnToggleSidebar) {
  btnToggleSidebar.addEventListener("click", function () {
    toggleSidebar(btnToggleSidebar)
  })
}

// Построение содержания оглавления
function generateToc() {
  const toc = document.createElement("div")
  toc.className = "toc"

  const sidebarHeaderTitle = document.createElement("h1")
  sidebarHeaderTitle.textContent = i18n.sidebarHeader
  toc.appendChild(sidebarHeaderTitle)

  // Получение селекторов заголовков
  const headers = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6")

  // Проверка наличия заголовков
  // Если заголовков нет, вывод сообщения пользователю о данном событии и выход из функции
  if (headers.length === 0) {
    const headersNotFoundElement = document.createElement("p")
    headersNotFoundElement.textContent = i18n.headersNotFound
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
    tocItem.className = `toc-h${levelIndex}`
    const tocLink = document.createElement("a")
    tocLink.href = `#${header.id}`
    tocLink.innerText = header.textContent || header.innerText

    // Добавление обработчика клика для предотвращения конфликтов с observer
    tocLink.addEventListener("click", function(event) {
      event.preventDefault()

      // Установить флаг, что происходит прокрутка после клика
      isClickScrolling = true

      // Очистить предыдущий таймаут
      if (clickScrollTimeout) {
        clearTimeout(clickScrollTimeout)
      }

      // Установить активный элемент немедленно
      const targetId = header.id
      setActiveTocItem(targetId, true) // force = true

      // Прокрутить к целевому заголовку
      header.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })

      // Сбросить флаг через 1 секунду (после завершения анимации прокрутки)
      clickScrollTimeout = setTimeout(() => {
        isClickScrolling = false
      }, 1000)
    })

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

// Установка активного элемента в TOC
function setActiveTocItem(headerId, force = false) {
  if (activeHeaderId === headerId) {
    return // Уже активен
  }

  // Если сейчас происходит прокрутка после клика, игнорировать обновления от observer
  if (isClickScrolling && !force) {
    return
  }

  // Удалить активный класс со всех элементов
  const allTocItems = sidebarWrapper.querySelectorAll(".toc li")
  allTocItems.forEach(item => item.classList.remove("active"))

  // Добавить активный класс к соответствующему элементу
  const activeTocLink = sidebarWrapper.querySelector(`a[href="#${headerId}"]`)
  if (activeTocLink) {
    const activeTocItem = activeTocLink.parentElement
    activeTocItem.classList.add("active")

    // Прокрутка TOC, чтобы активный элемент был видимым
    activeTocItem.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    })

    activeHeaderId = headerId
  }
}

// Инициализация наблюдателя заголовков
function initHeadersObserver() {
  const headers = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6")
  if (headers.length === 0) {
    return
  }

  // Настройка IntersectionObserver
  const observerOptions = {
    root: null, // viewport
    rootMargin: "-20% 0px -70% 0px", // Триггер когда заголовок в верхней трети viewport
    threshold: 0
  }

  // Создание observer
  headersObserver = new IntersectionObserver((entries) => {
    // Собрать все видимые заголовки
    const visibleHeaders = []

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleHeaders.push({
          id: entry.target.id,
          top: entry.boundingClientRect.top
        })
      }
    })

    // Если есть видимые заголовки, выбрать самый верхний
    if (visibleHeaders.length > 0) {
      visibleHeaders.sort((a, b) => a.top - b.top)
      setActiveTocItem(visibleHeaders[0].id)
    }
  }, observerOptions)

  // Наблюдение за всеми заголовками
  headers.forEach(header => {
    headersObserver.observe(header)
  })
}

// Остановка наблюдателя заголовков
function stopHeadersObserver() {
  if (headersObserver) {
    headersObserver.disconnect()
    headersObserver = null
    activeHeaderId = null

    // Удалить активные классы
    if (sidebarWrapper) {
      const allTocItems = sidebarWrapper.querySelectorAll(".toc li")
      allTocItems.forEach(item => item.classList.remove("active"))
    }
  }
}

function start() {
  // Построение кнопки переключения статуса панели оглавления
  const sidebarIsHidden = getLocalStorage(sidebarStatusKey) === "hidden"

  const btnToggleSidebar = document.createElement("button")
  btnToggleSidebar.id = "toc-btn-toggle-sidebar"
  btnToggleSidebar.textContent = "☰"
  markdownBody.insertBefore(btnToggleSidebar, markdownBody.firstChild)
  toggleSidebarStatusListener(btnToggleSidebar)

  // Добавление обработчика клавиши ESC для переключения боковой панели
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      toggleSidebar(btnToggleSidebar)
    }
  })

  // Если панель оглавления должна быть скрыта, выход
  if (sidebarIsHidden) {
    return
  }

  // Построение панели оглавления
  generateSidebar()

  // Инициализация наблюдателя заголовков
  initHeadersObserver()
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
