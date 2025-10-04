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

    // Collect headers that are actually in the reading zone
    const headersInReadingZone = []

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const headerTop = entry.boundingClientRect.top
        const headerBottom = entry.boundingClientRect.bottom

        // Check if header is in or crossing through the reading zone
        if (headerTop <= readingZoneBottom && headerBottom >= readingZoneTop) {
          headersInReadingZone.push({
            id: entry.target.id,
            top: headerTop,
            distanceFromReadingCenter: Math.abs(headerTop - (readingZoneTop + readingZoneBottom) / 2)
          })
        }
      }
    })

    // If headers are in reading zone, pick the one closest to center of reading zone
    if (headersInReadingZone.length > 0) {
      headersInReadingZone.sort((a, b) => a.distanceFromReadingCenter - b.distanceFromReadingCenter)
      setActiveTocItem(headersInReadingZone[0].id)
    } else {
      // Fallback: If no headers in reading zone, find the last header that passed above it
      const allVisibleHeaders = []
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const headerTop = entry.boundingClientRect.top
          if (headerTop < readingZoneTop) {
            allVisibleHeaders.push({
              id: entry.target.id,
              top: headerTop
            })
          }
        }
      })

      // Pick the header closest to (but above) the reading zone
      if (allVisibleHeaders.length > 0) {
        allVisibleHeaders.sort((a, b) => b.top - a.top) // Sort descending (bottom to top)
        setActiveTocItem(allVisibleHeaders[0].id)
      }
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
