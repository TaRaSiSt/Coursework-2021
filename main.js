/* Sidebar */ 

/* Set the width of the side navigation to 170px and the left margin of the page content to 250px*/
function openNav() {
  document.getElementById("mySidenav").style.width = "170px";
  document.getElementById("main").style.marginLeft = "200px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0*/
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

/* Button location */
function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}

/*Index*/

/* Baner */
// 
document.addEventListener('DOMContentLoaded', function () {
    var parent = document.querySelector('.splitview'),
        topPanel = parent.querySelector('.top'),
        handle = parent.querySelector('.handle'),
        skewHack = 0,
        delta = 0;

    // If the parent has .skewed class, set the skewHack var.
    if (parent.className.indexOf('skewed') != -1) {
        skewHack = 1000;
    }

    parent.addEventListener('mousemove', function(event) {
        // Get the delta between the mouse position and center point.
        delta = (event.clientX - window.innerWidth / 2) * 0.5;

        // Move the handle.
        handle.style.left = event.clientX + delta + 'px';

        // Adjust the top panel width.
        topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
});

// 
/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
const DOMReady = (
callback = () => {},
element = document,
listener = "addEventListener") =>
{
  return element[listener] ?
  element[listener]("DOMContentLoaded", callback) :
  window.attachEvent("onload", callback);
};

/* Services*/
/**
 *  @function   ProjectAPI
 *
 *  @type {{hasClass, addClass, removeClass}}
 */
const ProjectAPI = (() => {
  let hasClass, addClass, removeClass;

  hasClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(
      new RegExp("(\\s|^)" + className + "(\\s|$)"));

    }
  };

  addClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  };

  removeClass = (el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      let reg = new RegExp("(\\s|^)" + className + "(\\s|$)");

      el.className = el.className.replace(reg, " ");
    }
  };

  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass };

})();

/*********************
 *	Application Code
 ********************/
/**
 *  @function   readyFunction
 *
 *  @type {Function}
 */
const readyFunction = () => {
  const KEY_UP = 38;
  const KEY_DOWN = 40;

  let scrollingClass = "js-scrolling",
  scrollingActiveClass = scrollingClass + "--active",
  scrollingInactiveClass = scrollingClass + "--inactive",
  scrollingTime = 1350,
  scrollingIsActive = false,
  currentPage = 1,
  countOfPages = document.querySelectorAll("." + scrollingClass + "__page").
  length,
  prefixPage = "." + scrollingClass + "__page-",
  _switchPages,
  _scrollingUp,
  _scrollingDown,
  _mouseWheelEvent,
  _keyDownEvent,
  init;

  /**
   *  @function _switchPages
   *
   *  @private
   */
  _switchPages = () => {
    let _getPageDomEl;

    /**
     *  @function _getPageDomEl
     *
     *  @param page
     *  @returns {Element}
     *  @private
     */
    _getPageDomEl = (page = currentPage) => {
      return document.querySelector(prefixPage + page);
    };

    scrollingIsActive = true;

    ProjectAPI.removeClass(_getPageDomEl(), scrollingInactiveClass);
    ProjectAPI.addClass(_getPageDomEl(), scrollingActiveClass);

    ProjectAPI.addClass(_getPageDomEl(currentPage - 1), scrollingInactiveClass);

    ProjectAPI.removeClass(
    _getPageDomEl(currentPage + 1),
    scrollingActiveClass);


    setTimeout(() => {
      return scrollingIsActive = false;
    }, scrollingTime);
  };
  /**
   *  @function _scrollingUp
   *
   *  @private
   */
  _scrollingUp = () => {
    if (currentPage === 1) {
      return;
    }

    currentPage--;

    _switchPages();
  };
  /**
   *  @function _scrollingDown
   *
   *  @private
   */
  _scrollingDown = () => {
    if (currentPage === countOfPages) {
      return;
    }

    currentPage++;

    _switchPages();
  };
  /**
   *  @function _mouseWheelEvent
   *
   *  @param e
   *  @private
   */
  _mouseWheelEvent = e => {
    if (scrollingIsActive) {
      return;
    }

    if (e.wheelDelta > 0 || e.detail < 0) {
      _scrollingUp();
    } else if (e.wheelDelta < 0 || e.detail > 0) {
      _scrollingDown();
    }
  };
  /**
   *  @function _keyDownEvent
   *
   *  @param e
   *  @private
   */
  _keyDownEvent = e => {
    if (scrollingIsActive) {
      return;
    }

    let keyCode = e.keyCode || e.which;

    if (keyCode === KEY_UP) {
      _scrollingUp();
    } else if (keyCode === KEY_DOWN) {
      _scrollingDown();
    }
  };

  /**
   *  @function init
   *
   *  @note     auto-launch
   */
  init = (() => {
    document.addEventListener("mousewheel", _mouseWheelEvent, false);
    document.addEventListener("DOMMouseScroll", _mouseWheelEvent, false);

    document.addEventListener("keydown", _keyDownEvent, false);
  })();
};

/**
 *  Launcher
 */
DOMReady(readyFunction);


/*None scroll body, when mouse on block*/
window.onload = function(){ 
document.getElementById("none-scroll").onmouseover = function() {
  document.body.style.overflow = "hidden";
}

document.getElementById("none-scroll").onmouseout = function() {
  document.body.style.overflow = "auto";
}
}


// FAQ

function initAcc(elem, option) {
  document.addEventListener('click', function (e) {
    if (!e.target.matches(elem + ' .a-btn')) return;else
    {
      if (!e.target.parentElement.classList.contains('active')) {
        if (option == true) {
          var elementList = document.querySelectorAll(elem + ' .a-container');
          Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove('active');
          });
        }
        e.target.parentElement.classList.add('active');
      } else {
        e.target.parentElement.classList.remove('active');
      }
    }
  });
}

initAcc('.accordion.v1', true);
initAcc('.accordion.v2', false);

// 
