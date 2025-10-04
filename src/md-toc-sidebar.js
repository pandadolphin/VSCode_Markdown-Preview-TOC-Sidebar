let markdownBody = null
let sidebarWrapper = null
let sidebarStatusKey = "toc-sidebar-visibility"
let languageKey = "toc-sidebar-language"
let headersObserver = null
let activeHeaderId = null
let activeItemElement = null
let isClickScrolling = false
let clickScrollTimeout = null
let hasUserScrolled = false

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
  },
  ja: {
    sidebarHeader: "目次",
    headersNotFound: "ドキュメントのヘッダーがここに表示されます",
    setLocalStorageError: "LocalStorage: データの保存エラー",
    getLocalStorageError: "LocalStorage: データの取得エラー"
  },
  fr: {
    sidebarHeader: "Table des matières",
    headersNotFound: "Les titres du document seront affichés ici",
    setLocalStorageError: "LocalStorage: Erreur lors de l'enregistrement des données",
    getLocalStorageError: "LocalStorage: Erreur lors de la récupération des données"
  },
  de: {
    sidebarHeader: "Inhaltsverzeichnis",
    headersNotFound: "Dokumentüberschriften werden hier angezeigt",
    setLocalStorageError: "LocalStorage: Fehler beim Speichern der Daten",
    getLocalStorageError: "LocalStorage: Fehler beim Abrufen der Daten"
  },
  nl: {
    sidebarHeader: "Inhoudsopgave",
    headersNotFound: "Documentkoppen worden hier weergegeven",
    setLocalStorageError: "LocalStorage: Fout bij het opslaan van gegevens",
    getLocalStorageError: "LocalStorage: Fout bij het ophalen van gegevens"
  },
  es: {
    sidebarHeader: "Tabla de contenidos",
    headersNotFound: "Los encabezados del documento se mostrarán aquí",
    setLocalStorageError: "LocalStorage: Error al guardar datos",
    getLocalStorageError: "LocalStorage: Error al recuperar datos"
  },
  pt: {
    sidebarHeader: "Índice",
    headersNotFound: "Os cabeçalhos do documento serão exibidos aqui",
    setLocalStorageError: "LocalStorage: Erro ao salvar dados",
    getLocalStorageError: "LocalStorage: Erro ao recuperar dados"
  },
  it: {
    sidebarHeader: "Indice",
    headersNotFound: "Le intestazioni del documento verranno visualizzate qui",
    setLocalStorageError: "LocalStorage: Errore nel salvataggio dei dati",
    getLocalStorageError: "LocalStorage: Errore nel recupero dei dati"
  },
  ko: {
    sidebarHeader: "목차",
    headersNotFound: "문서 제목이 여기에 표시됩니다",
    setLocalStorageError: "LocalStorage: 데이터 저장 오류",
    getLocalStorageError: "LocalStorage: 데이터 검색 오류"
  },
  pl: {
    sidebarHeader: "Spis treści",
    headersNotFound: "Nagłówki dokumentu będą wyświetlane tutaj",
    setLocalStorageError: "LocalStorage: Błąd podczas zapisywania danych",
    getLocalStorageError: "LocalStorage: Błąd podczas pobierania danych"
  },
  tr: {
    sidebarHeader: "İçindekiler",
    headersNotFound: "Belge başlıkları burada görüntülenecektir",
    setLocalStorageError: "LocalStorage: Veri kaydedilirken hata oluştu",
    getLocalStorageError: "LocalStorage: Veri alınırken hata oluştu"
  }
}

// Detect and get current language
// Supported languages: en, ru, zh, ja, fr, de, nl, es, pt, it, ko, pl, tr
function getLanguage() {
  // Check localStorage for manual override
  const savedLang = localStorage.getItem(languageKey)
  if (savedLang && translations[savedLang]) {
    return savedLang
  }

  // Detect browser language
  // navigator.language returns codes like "en-US", "pt-BR", "zh-CN", etc.
  const browserLang = navigator.language || navigator.userLanguage
  // Extract the primary language code (e.g., "en" from "en-US")
  const langCode = browserLang.toLowerCase().split(/[-_]/)[0]

  // Return supported language or default to English
  return translations[langCode] ? langCode : "en"
}

// Get localized text
const currentLang = getLanguage()
const i18n = translations[currentLang]

// Utilities
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

// Toggle sidebar visibility
function toggleSidebar(btnToggleSidebar) {
  if (sidebarWrapper) {
    // Check if sidebar is hidden
    // If yes, show it
    // Otherwise hide it
    const sidebarStatus = sidebarWrapper.classList.contains("toc-sidebar-hidden")
    if (sidebarStatus) {
      markdownBody.classList.add("toc-max-width-limit")
      sidebarWrapper.classList.remove("toc-sidebar-hidden")
      setLocalStorage(sidebarStatusKey, "visible")
      // Start headers observer
      initHeadersObserver()
    } else {
      markdownBody.classList.remove("toc-max-width-limit")
      sidebarWrapper.classList.add("toc-sidebar-hidden")
      setLocalStorage(sidebarStatusKey, "hidden")
      // Stop headers observer
      stopHeadersObserver()
    }
  } else {
    generateSidebar()
    setLocalStorage(sidebarStatusKey, "visible")
    // Start headers observer
    initHeadersObserver()
  }
}

function toggleSidebarStatusListener(btnToggleSidebar) {
  btnToggleSidebar.addEventListener("click", function () {
    toggleSidebar(btnToggleSidebar)
  })
}

// Build table of contents
function generateToc() {
  const toc = document.createElement("div")
  toc.className = "toc"

  const sidebarHeaderTitle = document.createElement("h1")
  sidebarHeaderTitle.textContent = i18n.sidebarHeader
  toc.appendChild(sidebarHeaderTitle)

  // Get header selectors
  const headers = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6")

  // Check for headers
  // If no headers, show message to user and exit function
  if (headers.length === 0) {
    const headersNotFoundElement = document.createElement("p")
    headersNotFoundElement.textContent = i18n.headersNotFound
    toc.appendChild(headersNotFoundElement)
    return toc
  }

  // Build TOC
  let levels = []
  let currentLevel = null

  headers.forEach((header, index) => {
    const levelIndex = parseInt(header.tagName.substring(1))

    // Check for header.id
    // If header.id is missing, assign it
    if (!header.id) {
      header.id = `toc-header-${index}`
    }

    // If current level doesn't exist, create it
    while (levelIndex > levels.length) {
      const newList = document.createElement("ul")
      if (currentLevel) {
        // Add new <ul> to last <li>
        // If <li> not found, add new <ul> to current <ul>
        const lastElementChild = currentLevel.lastElementChild
        if (lastElementChild) {
          currentLevel.lastElementChild.appendChild(newList)
        } else {
          currentLevel.appendChild(newList)
        }
      } else {
        // If this is the first list, add it to container
        toc.appendChild(newList)
      }
      currentLevel = newList
      levels.push(newList)
    }

    // If heading level is lower than current <ul>, move to lower level <ul>
    while (levelIndex < levels.length) {
      levels.pop()
      currentLevel = levels[levels.length - 1]
    }

    // Create <li> element with <a>
    const tocItem = document.createElement("li")
    tocItem.className = `toc-h${levelIndex}`
    const tocLink = document.createElement("a")
    tocLink.href = `#${header.id}`
    tocLink.innerText = header.textContent || header.innerText

    // Add click handler to prevent conflicts with observer
    tocLink.addEventListener("click", function(event) {
      event.preventDefault()

      // Mark that user has interacted (enables highlighting)
      hasUserScrolled = true

      // Set flag that click scrolling is happening
      isClickScrolling = true

      // Clear previous timeout
      if (clickScrollTimeout) {
        clearTimeout(clickScrollTimeout)
      }

      // Set active element immediately
      const targetId = header.id
      setActiveTocItem(targetId, true) // force = true

      // Remove focus from the clicked link to prevent stuck focus styling
      // This prevents the link from showing hover-like background after cursor moves away
      this.blur()

      // Scroll to target header
      header.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })

      // Add one-time scroll listener to detect manual scrolling
      // This clears the flag if user manually scrolls during the animation
      const handleManualScroll = function() {
        // Small delay to allow programmatic scroll to start
        setTimeout(() => {
          isClickScrolling = false
          if (clickScrollTimeout) {
            clearTimeout(clickScrollTimeout)
            clickScrollTimeout = null
          }
        }, 150) // 150ms allows click scroll to start but catches manual scroll

        // Remove this listener after first trigger
        window.removeEventListener("scroll", handleManualScroll)
      }

      // Add the listener
      window.addEventListener("scroll", handleManualScroll, { once: true, passive: true })

      // Also set timeout as fallback (but now shorter since we have scroll detection)
      clickScrollTimeout = setTimeout(() => {
        isClickScrolling = false
        window.removeEventListener("scroll", handleManualScroll)
      }, 500) // Reduced from 1000ms to 500ms
    })

    tocItem.appendChild(tocLink)

    // Add new <li> to current <ul> level
    currentLevel.appendChild(tocItem)
  })

  // Return TOC block
  return toc
}

// Build TOC sidebar panel
function generateSidebar() {
  markdownBody.classList.add("toc-max-width-limit")

  sidebarWrapper = document.createElement("div")
  sidebarWrapper.className = "toc-sidebar-wrapper"

  // Build table of contents
  const toc = generateToc()

  sidebarWrapper.appendChild(toc)
  document.body.insertBefore(sidebarWrapper, document.body.firstChild)
}

// Set active TOC item
function setActiveTocItem(headerId, force = false) {
  if (activeHeaderId === headerId) {
    return // Already active
  }

  // If click scrolling is happening, ignore updates from observer
  if (isClickScrolling && !force) {
    return
  }

  // Don't highlight on initial load - only after user has scrolled or clicked
  if (!hasUserScrolled && !force) {
    return
  }

  // ALWAYS remove active class from ALL items - simple and reliable
  // This ensures no stale highlights remain
  const allTocItems = sidebarWrapper.querySelectorAll(".toc li")
  allTocItems.forEach(item => {
    if (item.classList.contains("active")) {
      item.classList.remove("active")
    }
  })

  // Add active class to corresponding item
  const activeTocLink = sidebarWrapper.querySelector(`a[href="#${headerId}"]`)
  if (activeTocLink) {
    const activeTocItem = activeTocLink.parentElement
    activeTocItem.classList.add("active")

    // Store reference to active element
    activeItemElement = activeTocItem

    // Scroll TOC to keep active item visible
    activeTocItem.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    })

    activeHeaderId = headerId
  }
}

// Initialize headers observer
function initHeadersObserver() {
  const headers = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6")
  if (headers.length === 0) {
    return
  }

  // Configure IntersectionObserver - observe ALL headers in viewport
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px", // Observe entire viewport
    threshold: 0
  }

  // Create observer
  headersObserver = new IntersectionObserver((entries) => {
    // Get viewport height for percentage calculations
    const viewportHeight = window.innerHeight

    // Define reading zone (top 20-40% of viewport - natural reading position)
    const readingZoneTop = viewportHeight * 0.2
    const readingZoneBottom = viewportHeight * 0.4

    // Check ALL headers in the document (not just entries), since entries only
    // contains headers that changed intersection state, not all visible headers
    const headersInReadingZone = []
    const headersAboveReadingZone = []

    headers.forEach(header => {
      const rect = header.getBoundingClientRect()
      const headerTop = rect.top
      const headerBottom = rect.bottom

      // Skip headers not in viewport
      if (headerBottom < 0 || headerTop > viewportHeight) {
        return
      }

      // Check if header is in or crossing through the reading zone
      if (headerTop <= readingZoneBottom && headerBottom >= readingZoneTop) {
        headersInReadingZone.push({
          id: header.id,
          top: headerTop,
          distanceFromReadingCenter: Math.abs(headerTop - (readingZoneTop + readingZoneBottom) / 2)
        })
      } else if (headerTop < readingZoneTop) {
        // Header is above the reading zone
        headersAboveReadingZone.push({
          id: header.id,
          top: headerTop
        })
      }
    })

    // If headers are in reading zone, pick the one closest to center of reading zone
    if (headersInReadingZone.length > 0) {
      headersInReadingZone.sort((a, b) => a.distanceFromReadingCenter - b.distanceFromReadingCenter)
      setActiveTocItem(headersInReadingZone[0].id)
    } else if (headersAboveReadingZone.length > 0) {
      // Fallback: Pick the header closest to (but above) the reading zone
      headersAboveReadingZone.sort((a, b) => b.top - a.top) // Sort descending (bottom to top)
      setActiveTocItem(headersAboveReadingZone[0].id)
    }
  }, observerOptions)

  // Observe all headers
  headers.forEach(header => {
    headersObserver.observe(header)
  })
}

// Stop headers observer
function stopHeadersObserver() {
  if (headersObserver) {
    headersObserver.disconnect()
    headersObserver = null
    activeHeaderId = null
    activeItemElement = null

    // Remove ALL active classes
    if (sidebarWrapper) {
      const allTocItems = sidebarWrapper.querySelectorAll(".toc li")
      allTocItems.forEach(item => {
        if (item.classList.contains("active")) {
          item.classList.remove("active")
        }
      })
    }
  }
}

function start() {
  // Build toggle button for TOC sidebar
  const sidebarIsHidden = getLocalStorage(sidebarStatusKey) === "hidden"

  const btnToggleSidebar = document.createElement("button")
  btnToggleSidebar.id = "toc-btn-toggle-sidebar"
  btnToggleSidebar.textContent = "☰"
  markdownBody.insertBefore(btnToggleSidebar, markdownBody.firstChild)
  toggleSidebarStatusListener(btnToggleSidebar)

  // Add ESC key handler to toggle sidebar
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      toggleSidebar(btnToggleSidebar)
    }
  })

  // If TOC sidebar should be hidden, exit
  if (sidebarIsHidden) {
    return
  }

  // Build TOC sidebar panel
  generateSidebar()

  // Initialize headers observer with small delay to allow page to settle
  setTimeout(() => {
    initHeadersObserver()
  }, 100)

  // Detect user scroll to enable active highlighting
  let scrollTimeout = null
  window.addEventListener("scroll", function() {
    if (!hasUserScrolled) {
      hasUserScrolled = true
    }
  }, { once: false, passive: true })
}

// Check DOM loading status
// If DOM is loaded, execute main functions
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
