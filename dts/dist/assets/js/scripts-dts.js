/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function() {

// Password visibility toggling
const pwdFields = document.querySelectorAll("input[type='password']");

if (pwdFields.length) {
    for (let i = 0; i < pwdFields.length; i++) {
        if (pwdFields[i].nextElementSibling.matches('.dts-form-component__pwd-toggle')) {

            pwdFields[i].nextElementSibling.addEventListener("click", () => {
                
                if (pwdFields[i].type === "password") {
                    pwdFields[i].type = "text";
                    pwdFields[i].nextElementSibling.querySelector("img").src = "assets/icons/eye-hide-password.svg";
                } else {
                    pwdFields[i].type = "password";
                    pwdFields[i].nextElementSibling.querySelector("img").src = "assets/icons/eye-show-password.svg";
                }
            });
        }
    }
}

// Submit button enabling only when required fields are filled
const forms = document.querySelectorAll("form");
if (forms.length) {
    for (let k = 0; k < forms.length; k++) {
        const requiredFields = [];
        const submitButton = [];
        requiredFields[k] = forms[k].querySelectorAll("input[required]");
        submitButton[k] = forms[k].querySelector("button[type='submit']");

        if (requiredFields[k].length) {
            var requiredFilled;

            for (let i = 0; i < requiredFields[k].length; i++) {
                requiredFields[k][i].addEventListener("input", () => {
                    requiredFilled = true;
                    for (let j = 0; j < requiredFields[k].length; j++) {
                        if (!requiredFields[k][j].validity.valid) {
                            requiredFilled = false;
                        }
                    }
                    if (requiredFilled) {
                        submitButton[k].disabled = false;
                    } else {
                        submitButton[k].disabled = true;
                    }
                });
            }
        }
    }
}

// OTP form digit length management
const otpForm = document.querySelector(".dts-dialog__form--otp");

if (otpForm) {
    const digitInputs = otpForm.querySelectorAll("input[type='number']");
    for (let i = 0; i < digitInputs.length; i++) {
        digitInputs[i].addEventListener("keydown", function (e) {
            digitInputs[i].select();
            if (this.value.length == 1) {
                return false;
            };
        });
    }
}


/***/ }),
/* 2 */
/***/ (function() {

// Modal dialog opening/closing
const dialog = document.querySelector("#modalForm00");
const dialogCloseButton = document.querySelector("#modalFormClose");

if (dialog) {
    dialog.showModal();
}

if (dialogCloseButton) {
    dialogCloseButton.addEventListener("click", () => {
        dialog.close();
    });
}

// openSnackbar();


/***/ }),
/* 3 */
/***/ (function() {

class Tooltip {
  constructor(element) {
    this.container = element
    this.trigger = element.querySelector('[data-tooltip-trigger]')
    this.tooltip = element.querySelector('[role=tooltip]')
    this.tooltipPosition = this.getTooltipPosition()
    this.globalEscapeBound = this.globalEscape.bind(this)
    this.globalPointerDownBound = this.globalPointerDown.bind(this)
    this.initialiseClassList()
    this.bindEvents()
  }

  // Basic actions
  openTooltip() {
    this.showTooltip()
    this.checkBoundingBox()
    this.attachGlobalListener()
  }

  closeTooltip() {
    this.hideTooltip()
    this.resetBoundingBox()
    this.removeGlobalListener()
  }

  // Binding event listteners
  bindEvents() {
    // Events that trigger openTooltip()
    // Open on mouse hover
    this.container.addEventListener('mouseenter', this.openTooltip.bind(this))
    // Open when a touch is detected
    this.container.addEventListener('touchstart', this.openTooltip.bind(this))
    // Open when the trigger gets focus
    this.trigger.addEventListener('focus', this.openTooltip.bind(this))

    // Events that trigger closeTooltip()
    // Close when the mouse cursor leaves the trigger or tooltip area
    this.container.addEventListener('mouseleave', this.closeTooltip.bind(this))
    // Close when the trigger loses focus
    this.trigger.addEventListener('blur', this.closeTooltip.bind(this))
  }

  attachGlobalListener() {
    document.addEventListener('keydown', this.globalEscapeBound)
    document.addEventListener('pointerdown', this.globalPointerDownBound)
  }

  removeGlobalListener() {
    document.removeEventListener('keydown', this.globalEscapeBound)
    document.removeEventListener('pointerdown', this.globalPointerDownBound)
  }

  globalEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.closeTooltip()
    }
  }

  // Close the tooltip if the target is anything other than the components within the tooltip widget
  globalPointerDown(event) {
    switch (event.target) {
      case this.container:
      case this.trigger:
      case this.tooltip:
        event.preventDefault()
        break
      default:
        this.closeTooltip()
        this.trigger.blur()
    }
  }

  // Show or hide the tooltip
  showTooltip() {
    this.container.classList.add('tooltip-visible')
    this.tooltip.classList.remove('tooltip-hidden')
  }

  hideTooltip() {
    this.container.classList.remove('tooltip-visible')
    this.tooltip.classList.add('tooltip-hidden')
    this.tooltip.style.width = "max-content";
  }

  // Get the desired default position for the tooltip (defaults to 'bottom')
  getTooltipPosition() {
    let attribute = this.container.getAttribute('data-tooltip-position')
    let setting = 'bottom'

    if (attribute === 'top') {
      setting = attribute
    }

    return setting;
  }

  // Set the default classes for tooltips based on this.getTooltipPosition()
  initialiseClassList() {
    switch (this.tooltipPosition) {
      case 'top':
        this.container.classList.add('top')
        break

      default:
        this.container.classList.remove('top')
        break
    }
  }

  // Calculate if the tooltip is within the viewport
  checkBoundingBox() {
    let bounds = this.tooltip.getBoundingClientRect()

    this.checkHorizontalBounding(bounds)
    this.checkVerticalBounding(bounds)
  }

  checkHorizontalBounding(bounds) {
    // let windowWidth = window.innerWidth
    let windowWidth = window.screen.width;
    let dialog = this.tooltip.closest(".dts-dialog__content");

    if (dialog) {
        bounds = dialog.getBoundingClientRect();
        windowWidth = dialogBounds.width;
        console.log(windowWidth);
    }

    // If the tooltip overlaps on both sides, throw an error
    if (bounds.right > windowWidth && bounds.left < 0) {
      this.tooltip.style.width = "90vw";
      bounds = this.tooltip.getBoundingClientRect();
      this.moveTooltipLeft(bounds, windowWidth);
      // throw new Error('Tooltip width too wide for the window')
    } else if (bounds.right > windowWidth) { // Check if the right side of the tooltip is beyond the right side of the viewport
      this.tooltip.style.width = "90vw";
      bounds = this.tooltip.getBoundingClientRect();
      this.moveTooltipLeft(bounds, windowWidth)
    } else if (bounds.left < 0 ) { // Check if the left side of the tooltip is beyond the left side of the viewport
      this.moveTooltipRight(bounds)
    }
  }

  checkVerticalBounding(bounds) {
    let windowHeight = window.innerHeight

    // If the tooltip overlaps on both sides, throw an error
    if (bounds.bottom > windowHeight && bounds.top < 0) {
      throw new Error('Tooltip height too high for the window')
    }

    // Check if the bottom of the tooltip is below the bottom of the viewport
    if (bounds.bottom > windowHeight) {
      this.moveTooltipUp()
    }

    // Check if the top of the tooltip is above the top of the viewport
    if (bounds.top < 0) {
      this.moveTooltipDown()
    }
  }

  // Move the tooltip so it fits within the viewport
  moveTooltipUp() {
    this.container.classList.add('top')
  }

  moveTooltipRight(bounds) {
    let numToMove = Math.floor(bounds.width / 2)
    this.tooltip.style.left = `${numToMove}px`
  }

  moveTooltipDown() {
    this.container.classList.remove('top')
  }

  moveTooltipLeft(bounds, windowWidth) {
    // let translateAmount = (windowWidth - Math.round(bounds.right) - (Math.round(bounds.width) / 1.6))
    let translateAmount = Math.round(bounds.left);
    this.tooltip.style.transform = `translateX(calc(-${translateAmount}px - 27rem + 5vw))`
  }

  // Reset the changes made by the bounding box functions
  resetBoundingBox() {
    if (this.tooltip.style.left || this.tooltip.style.transform) {
        this.tooltip.style.left = null;
        this.tooltip.style.transform = null;
    }

    this.initialiseClassList()
  }
}

Array.from(document.querySelectorAll('.dts-tooltip')).forEach(element => new Tooltip(element))


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_form_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tooltips_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _tooltips_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tooltips_js__WEBPACK_IMPORTED_MODULE_2__);

// TBD




}();
/******/ })()
;