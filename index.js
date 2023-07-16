const KEYS = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const ENG_KEYS_TEXT = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del', 'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', 'Control', 'Win', 'Alt', '', 'Alt', 'Win', 'CM', 'Control', '↑', '←', '↓', '→'];

const RUS_KEYS_TEXT = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Del', 'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift', 'Control', 'Win', 'Alt', '', 'Alt', 'Win', 'CM', 'Control', '↑', '←', '↓', '→'];

const ENG_UPPER_SIMBOL_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25,
  26, 38, 39, 49, 50, 51];
const ENG_UPPER_SIMBOL = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];
const ENG_KEYS_INDEX = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 29, 30, 31, 32, 33, 34, 35,
  36, 37, 42, 43, 44, 45, 46, 47, 48];

const RU_UPPER_SIMBOL_INDEX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 51];
const RU_UPPER_SIMBOL = ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '/', ','];
const RU_KEYS_INDEX = [0, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 42, 43, 44, 45, 46, 47, 48, 49, 50];

const BODY_ELEMENT = document.querySelector('.body');
let langFlag = JSON.parse(localStorage.getItem('langFlag'));
let shiftFlag = false;
let capsFlag = false;
let controlLeftFlag = false;
let textarea = '';

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  el.classList.add(className);
  if (text) { el.textContent = text; }
  return el;
}

function createKeyboardKeys() {
  for (let i = 0; i < ENG_KEYS_TEXT.length; i += 1) {
    if (i === 14 || i === 28 || i === 41 || i === 53 || i === 61 || i === 62) {
      document.querySelector('.row').append(createElement('div', 'clearfix'));
    }
    if (langFlag) {
      document.querySelector('.row').append(createElement('div', 'keys', ENG_KEYS_TEXT[i]));
    } else {
      document.querySelector('.row').append(createElement('div', 'keys', RUS_KEYS_TEXT[i]));
    }
  }
  const allKeys = document.querySelectorAll('.keys');
  allKeys.forEach((el, index) => {
    el.setAttribute('keycode', `${KEYS[index]}`);
    switch (KEYS[index]) {
      case 'Backspace': el.classList.add('backspace-key');
        break;
      case 'Tab': el.classList.add('tab-key');
        break;
      case 'Delete': el.classList.add('del-key');
        break;
      case 'CapsLock': el.classList.add('caps-lock-key');
        break;
      case 'Enter': el.classList.add('enter-key');
        break;
      case 'ShiftLeft': el.classList.add('shift-key');
        break;
      case 'ShiftRight': el.classList.add('shift-key');
        break;
      case 'Space': el.classList.add('space-key');
        break;

      default:
        break;
    }
  });
}

function onMouseDownKey(e) {
  const currentKey = e.target;
  const text = textarea.value;
  setMoueseDownActiveKey(e);
  switch (currentKey.getAttribute('keycode')) {
    case 'Backspace': textarea.value = text.slice(0, -1);
      break;
    case 'Tab': textarea.value += '    ';
      break;
    case 'Enter': textarea.value += '\n';
      break;
    case 'Space': textarea.value += ' ';
      break;
    case 'CapsLock':
      capsLockPressedHendler(e);
      break;
    case 'ShiftLeft':
      capsShiftDownHendler(e, 'ShiftLeft');
      break;
    case 'ShiftRight':
      capsShiftDownHendler(e, 'ShiftRight');
      break;
    case 'ControlLeft':
      jsKeyboardEventHandler(e);
      break;
    case 'ControlRight':
      jsKeyboardEventHandler(e);
      break;
    case 'MetaLeft':
      jsKeyboardEventHandler(e);
      break;
    case 'MetaRight':
      jsKeyboardEventHandler(e);
      break;
    case 'AltLeft':
      jsKeyboardEventHandler(e);
      break;
    case 'AltRight':
      jsKeyboardEventHandler(e);
      break;
    case 'ContextMenu':
      jsKeyboardEventHandler(e);
      break;
    case 'Delete':
      deleteHandler(textarea);
      break;

    default:
      if (currentKey.getAttribute('keycode')) {
        if (capsFlag) {
          textarea.value += currentKey.textContent.toUpperCase();
        } else {
          textarea.value += currentKey.textContent;
        }
      }
      break;
  }
}

function jsKeyboardEventHandler(e) {
  const evt = new KeyboardEvent('keydown', { key: e.key, keyCode: e.keyCode, which: e.which });
  document.dispatchEvent(evt);
}

function capsShiftDownHendler(e, keyCode) {
  if (!capsFlag && e.type === 'mousedown') {
    shiftPressDownHandler(e);
  }
  if (capsFlag && e.type === 'mousedown') {
    shiftFlag = e.target.getAttribute('keycode') === keyCode;
    const allKeys = document.querySelectorAll('.keys');
    allKeys.forEach((el, index) => {
      if (langFlag) {
        if (ENG_UPPER_SIMBOL_INDEX.includes(index)) {
          el.textContent = ENG_UPPER_SIMBOL[ENG_UPPER_SIMBOL_INDEX.indexOf(index)];
        }
        if (ENG_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
      } else {
        if (RU_UPPER_SIMBOL_INDEX.includes(index)) {
          el.textContent = RU_UPPER_SIMBOL[RU_UPPER_SIMBOL_INDEX.indexOf(index)];
        }
        if (RU_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
      }
    });
  }

  if (!capsFlag && e.type === 'mouseup') {
    shiftUpHendler(e);
  }
  if (capsFlag && e.type === 'mouseup' && shiftFlag) {
    const allKeys = document.querySelectorAll('.keys');
    allKeys.forEach((el, index) => {
      if (langFlag) {
        if (ENG_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = ENG_KEYS_TEXT[index]; }
        if (ENG_KEYS_INDEX.includes(index)) {
          el.textContent = el.textContent.toUpperCase();
        }
      } else {
        if (RU_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = RUS_KEYS_TEXT[index]; }
        if (RU_KEYS_INDEX.includes(index)) {
          el.textContent = el.textContent.toUpperCase();
        }
      }
    });
  }
}

function onMouseUpKey(e) {
  setMoueseUpRemoveActiveKey(e);
  capsShiftDownHendler(e);
}

function capsLockPressedHendler(e) {
  const capsBtn = document.querySelector('.caps-lock-key');
  const allKeys = document.querySelectorAll('.keys');
  if (e.type === 'mousedown') {
    capsFlag = !capsFlag;
  }
  if (e.type === 'keydown' && e.key === 'CapsLock') {
    capsFlag = e.getModifierState('CapsLock');
  }

  if (capsFlag) {
    capsBtn.classList.add('caps-lock-active');
    allKeys.forEach((el, index) => {
      if (langFlag && ENG_KEYS_INDEX.includes(index)) {
        el.textContent = el.textContent.toUpperCase();
      }
      if (!langFlag && RU_KEYS_INDEX.includes(index)) {
        el.textContent = el.textContent.toUpperCase();
      }
    });
  } else {
    capsBtn.classList.remove('caps-lock-active');
    allKeys.forEach((el, index) => {
      if (ENG_KEYS_INDEX.includes(index) && langFlag) {
        el.textContent = el.textContent.toLowerCase();
      }
      if (RU_KEYS_INDEX.includes(index) && !langFlag) {
        el.textContent = el.textContent.toLowerCase();
      }
    });
  }
}

function onKeyboardPressKeyToTextarea(e) {
  const isFocusOnTextarea = document.querySelector('.text');
  if (isFocusOnTextarea === document.activeElement) {
    e.preventDefault();
  }
  const text = textarea.value;
  switch (e.key) {
    case 'Backspace': textarea.value = text.slice(0, -1);
      break;
    case 'Tab': textarea.value += '    ';
      break;
    case 'Enter': textarea.value += '\n';
      break;
    case 'Space': textarea.value += ' ';
      break;
    case 'CapsLock':
      capsLockPressedHendler(e);
      break;
    case 'Control':
      jsKeyboardEventHandler(e);
      break;
    case 'Shift':
      jsKeyboardEventHandler(e);
      break;
    case 'Meta':
      jsKeyboardEventHandler(e);
      break;
    case 'Alt':
      jsKeyboardEventHandler(e);
      break;
    case 'ContextMenu':
      jsKeyboardEventHandler(e);
      break;
    case 'Delete':
      deleteHandler(textarea);
      break;

    default:
      if (capsFlag) {
        if (capsFlag && e.getModifierState('Shift')) {
          textarea.value += e.key;
        } else {
          textarea.value += e.key.toUpperCase();
        }
      } else {
        textarea.value += e.key;
      }
      break;
  }
}

function deleteHandler(input) {
  const caretStart = input.selectionStart;
  const beforeSimbols = input.value.slice(0, caretStart);
  const afterSimbols = input.value.slice(caretStart + 1, input.value.length);
  input.value = `${beforeSimbols}${afterSimbols}`;
  input.selectionStart = caretStart;
  input.selectionEnd = caretStart;
  input.focus();
}

function changeLangHandler() {
  if (shiftFlag && controlLeftFlag) {
    langFlag = !langFlag;
    localStorage.setItem('langFlag', langFlag);

    console.log(langFlag);
    document.querySelector('.row').textContent = '';
    createKeyboardKeys();
  }
}

function setMoueseDownActiveKey(e) {
  document.querySelectorAll(`.keys[keycode=${e.target.getAttribute('keycode')}]`)
    .forEach((el) => el.classList.add('active'));
}

function setMoueseUpRemoveActiveKey(e) {
  document.querySelectorAll(`.keys[keycode=${e.target.getAttribute('keycode')}]`)
    .forEach((el) => el.classList.remove('active'));
}

function setActiveKeyboardKey(e) {
  document.querySelectorAll(`.keys[keycode=${e.code}]`).forEach((el) => el.classList.add('active'));
  switch (e.code) {
    case 'ControlLeft': controlLeftFlag = true; break;
    default:
      break;
  }
}

function removeActiveKeyboardKey(e) {
  document.querySelectorAll('.keys').forEach((el) => el.classList.remove('active'));
  switch (e.code) {
    case 'ControlLeft': controlLeftFlag = false; break;
    default:
      break;
  }
}

function shiftPressDownHandler(e) {
  const allKeys = document.querySelectorAll('.keys');
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.type === 'mousedown') {
    shiftFlag = true;
    if (capsFlag) {
      allKeys.forEach((el, index) => {
        if (langFlag) {
          if (ENG_UPPER_SIMBOL_INDEX.includes(index)) {
            el.textContent = ENG_UPPER_SIMBOL[ENG_UPPER_SIMBOL_INDEX.indexOf(index)];
          }
          if (ENG_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
        } else {
          if (RU_UPPER_SIMBOL_INDEX.includes(index)) {
            el.textContent = RU_UPPER_SIMBOL[RU_UPPER_SIMBOL_INDEX.indexOf(index)];
          }
          if (RU_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
        }
      });
    } else {
      allKeys.forEach((el, index) => {
        if (langFlag) {
          if (ENG_UPPER_SIMBOL_INDEX.includes(index)) {
            el.textContent = ENG_UPPER_SIMBOL[ENG_UPPER_SIMBOL_INDEX.indexOf(index)];
          }
          if (ENG_KEYS_INDEX.includes(index)) {
            el.textContent = el.textContent.toUpperCase();
          }
        } else {
          if (RU_UPPER_SIMBOL_INDEX.includes(index)) {
            el.textContent = RU_UPPER_SIMBOL[RU_UPPER_SIMBOL_INDEX.indexOf(index)];
          }
          if (RU_KEYS_INDEX.includes(index)) {
            el.textContent = el.textContent.toUpperCase();
          }
        }
      });
    }
  }
}

function shiftUpHendler(e) {
  const allKeys = document.querySelectorAll('.keys');
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.type === 'mouseup') {
    shiftFlag = false;
    if (capsFlag) {
      allKeys.forEach((el, index) => {
        if (langFlag) {
          if (ENG_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = ENG_KEYS_TEXT[index]; }
          if (ENG_KEYS_INDEX.includes(index)) {
            el.textContent = el.textContent.toUpperCase();
          }
        } else {
          if (RU_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = RUS_KEYS_TEXT[index]; }
          if (RU_KEYS_INDEX.includes(index)) {
            el.textContent = el.textContent.toUpperCase();
          }
        }
      });
    } else {
      allKeys.forEach((el, index) => {
        if (langFlag) {
          if (ENG_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = ENG_KEYS_TEXT[index]; }
          if (ENG_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
        } else {
          if (RU_UPPER_SIMBOL_INDEX.includes(index)) { el.textContent = RUS_KEYS_TEXT[index]; }
          if (RU_KEYS_INDEX.includes(index)) { el.textContent = el.textContent.toLowerCase(); }
        }
      });
    }
  }
}

function keyDownHandlers(e) {
  setActiveKeyboardKey(e);
  onKeyboardPressKeyToTextarea(e);
}

function keyUpHandlers(e) {
  changeLangHandler(e);
  removeActiveKeyboardKey(e);
}

function initElements() {
  BODY_ELEMENT.append(createElement('div', 'container'));
  document.querySelector('.container').append(createElement('textarea', 'text'));
  document.querySelector('.container').append(createElement('div', 'keyboard-wrapp'));
  document.querySelector('.keyboard-wrapp').append(createElement('div', 'row'));
  createKeyboardKeys();
  document.querySelector('.container').append(createElement('p', 'description', 'Клавиатура создана в операционной системе Windows'));
  document.querySelector('.container').append(createElement('p', 'description', 'Для переключения языка Рус/Англ комбинация: левыe ctrl + shift'));
  textarea = document.querySelector('.text');
  window.addEventListener('keydown', keyDownHandlers);
  window.addEventListener('keydown', shiftPressDownHandler);
  window.addEventListener('keyup', keyUpHandlers);
  window.addEventListener('keyup', shiftUpHendler);
  window.addEventListener('mousedown', onMouseDownKey);
  window.addEventListener('mouseup', onMouseUpKey);
}

initElements();
