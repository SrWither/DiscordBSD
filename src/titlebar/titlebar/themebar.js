"use strict";

/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *-------------------------------------------------------------------------------------------- */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeBar = void 0;
const lifecycle_1 = require("../base/common/lifecycle");
const baseTheme = "body {\n  margin: 0 !important;\n  overflow: hidden !important;\n}\n\n/* Titlebar */\n.cet-titlebar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  font-size: 13px;\n  font-family: Arial, Helvetica, sans-serif;\n  box-sizing: border-box;\n  padding: 0 16px;\n  overflow: hidden;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  zoom: 1;\n  width: 100%;\n  height: 31px;\n  line-height: 31px;\n  z-index: 99999;\n}\n\n.cet-titlebar *,\n.cet-titlebar *:before,\n.cet-titlebar *:after {\n  box-sizing: border-box;\n}\n\n.cet-titlebar.cet-windows,\n.cet-titlebar.cet-linux,\n.cet-titlebar.cet-freebsd {\n  padding: 0;\n  height: 30px;\n  line-height: 30px;\n  justify-content: left;\n  overflow: visible;\n}\n\n/* Inverted */\n.cet-titlebar.cet-inverted {\n  flex-direction: row-reverse;\n}\n\n.cet-titlebar.cet-inverted .cet-menubar,\n.cet-titlebar.cet-inverted .cet-window-controls {\n  flex-direction: row-reverse;\n  margin-left: 20px;\n  margin-right: 0;\n}\n\n/* First buttons */\n.cet-titlebar.cet-first-buttons .cet-window-controls {\n  order: -1;\n  margin: 0 5px 0 0;\n}\n\n.cet-titlebar.cet-inverted .cet-window-controls {\n  margin: 0 5px 0 0;\n}\n\n/* Shadow */\n.cet-titlebar.cet-shadow {\n  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);\n}\n\n/* Drag region */\n.cet-drag-region {\n  top: 0;\n  left: 0;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  -webkit-app-region: drag;\n}\n\n/* Icon */\n.cet-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 30px;\n  z-index: 99;\n  overflow: hidden;\n}\n\n/* Title */\n.cet-title {\n  flex: 0 1 auto;\n  font-size: 12px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  zoom: 1;\n}\n\n/* Title alignment */\n.cet-title.cet-title-left {\n  margin-left: 8px;\n  margin-right: auto;\n}\n\n.cet-title.cet-title-right {\n  margin-left: auto;\n  margin-right: 8px;\n}\n\n.cet-title.cet-title-center {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.cet-title.cet-bigsur {\n  font-size: 13px;\n  font-weight: 600;\n}\n\n/* Window controls */\n.cet-window-controls {\n  display: flex;\n  flex-grow: 0;\n  flex-shrink: 0;\n  text-align: center;\n  position: relative;\n  z-index: 99;\n  -webkit-app-region: no-drag;\n  height: 30px;\n  font-family: initial !important;\n  margin-left: auto;\n}\n\n.cet-control-icon {\n  width: 2.85rem;\n}\n\n.cet-control-icon:not(.inactive):hover {\n  background-color: rgb(255 255 255 / 12%);\n}\n\n.light .cet-control-icon:not(.inactive):hover {\n  background-color: rgb(0 0 0 / 12%);\n}\n\n.cet-control-icon.inactive svg {\n  opacity: 0.4;\n}\n\n.cet-control-icon svg {\n  width: 10px;\n  height: -webkit-fill-available;\n  fill: #fff;\n  display: initial !important;\n  vertical-align: unset !important;\n}\n\n.cet-titlebar.light .cet-control-icon svg {\n  fill: #222222 !important;\n}\n\n.cet-control-close:not(.inactive):hover {\n  background-color: rgb(232 17 35 / 90%) !important;\n}\n\n.cet-control-close:not(.inactive):hover svg {\n  fill: #fff !important;\n}\n\n/* Resizer */\n.cet-resizer {\n  -webkit-app-region: no-drag;\n  position: absolute;\n}\n\n.cet-resizer.left {\n  top: 0;\n  left: 0;\n  width: 6px;\n  height: 100%;\n}\n\n.cet-resizer.top {\n  top: 0;\n  width: 100%;\n  height: 6px;\n}\n\n/* Container */\n.cet-container {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  z-index: 1;\n}\n\n/* MenuBar */\n.cet-menubar {\n  display: flex;\n  flex-shrink: 1;\n  box-sizing: border-box;\n  overflow: hidden;\n  flex-wrap: wrap;\n  margin-right: 20px;\n}\n\n.cet-menubar.bottom {\n  order: 1;\n  width: 100%;\n  padding: 0 5px 5px;\n  margin-right: 0;\n}\n\n.cet-menubar.bottom .cet-menubar-menu-button {\n  border-radius: 4px;\n}\n\n.cet-menubar.bottom .cet-menubar-menu-button .cet-menubar-menu-title {\n  line-height: 26px;\n}\n\n.cet-menubar .cet-menubar-menu-button {\n  box-sizing: border-box;\n  padding: 0px 8px;\n  height: 100%;\n  cursor: default;\n  zoom: 1;\n  white-space: nowrap;\n  -webkit-app-region: no-drag;\n  outline: 0;\n}\n\n.cet-menubar .cet-menubar-menu-button .cet-menubar-menu-title {\n  font-size: 12px;\n}\n\n.cet-menubar .cet-menubar-menu-button.disabled {\n  opacity: 0.4;\n}\n\n.cet-menubar .cet-menubar-menu-button:not(.disabled):hover,\n.cet-menubar .cet-menubar-menu-button:not(.disabled).open {\n  background-color: rgb(255 255 255 / 12%);\n}\n\n.cet-titlebar.light .cet-menubar .cet-menubar-menu-button:not(.disabled):hover,\n.cet-titlebar.light .cet-menubar .cet-menubar-menu-button:not(.disabled).open {\n  background-color: rgb(0 0 0 / 12%);\n}\n\n.cet-menubar-menu-container {\n  position: absolute;\n  display: block;\n  left: 0px;\n  opacity: 1;\n  outline: 0;\n  border: none;\n  text-align: left;\n  margin: 0 auto;\n  margin-left: 0;\n  font-size: inherit;\n  overflow-x: visible;\n  overflow-y: visible;\n  -webkit-overflow-scrolling: touch;\n  justify-content: flex-end;\n  white-space: nowrap;\n  border-radius: 7px;\n  backdrop-filter: blur(10px);\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n  z-index: 99999;\n}\n\n.cet-menubar-menu-container::-webkit-scrollbar {\n  width: 8px;\n  height: 4px;\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.cet-menubar-menu-container::-webkit-scrollbar-track {\n  border: none;\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.cet-menubar-menu-container::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  background-color: rgba(110, 110, 110, 0.2);\n}\n\n.cet-menubar-menu-container:focus {\n  outline: 0;\n}\n\n.cet-menubar-menu-container .cet-action-item {\n  padding: 0;\n  margin: 0;\n  transform: none;\n  display: -ms-flexbox;\n  display: flex;\n  outline: none;\n}\n\n.cet-menubar-menu-container .cet-action-item.active {\n  transform: none;\n}\n\n.cet-menubar-menu-container .cet-action-item.disabled .cet-action-menu-item {\n  opacity: 0.4;\n}\n\n.cet-menubar-menu-container .cet-action-item .cet-submenu {\n  position: absolute;\n}\n\n.cet-menubar-menu-container .cet-action-menu-item {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  display: -ms-flexbox;\n  display: flex;\n  height: 2.231em;\n  margin: 4px 3px;\n  align-items: center;\n  position: relative;\n  border-radius: 4px;\n  text-decoration: none;\n}\n\n.cet-menubar-menu-container .cet-action-label {\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  text-decoration: none;\n  padding: 0 1em;\n  background: none;\n  font-size: 12px;\n  line-height: 1;\n}\n\n.cet-menubar-menu-container .cet-action-label:not(.separator) {\n  display: inline-block;\n  -webkit-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0 2em 0 0.8em;\n}\n\n.cet-menubar-menu-container .cet-action-label.separator {\n  opacity: 0.1;\n  font-size: inherit;\n  width: 100%;\n  border-bottom: 1px solid transparent;\n}\n\n.cet-menubar-menu-container .cet-action-label.separator.text {\n  padding: 0.7em 1em 0.1em 1em;\n  font-weight: bold;\n  opacity: 1;\n}\n\n.cet-menubar-menu-container .cet-action-label:hover {\n  color: inherit;\n}\n\n.cet-menubar-menu-container .keybinding,\n.cet-menubar-menu-container .cet-submenu-indicator {\n  display: inline-block;\n  -ms-flex: 2 1 auto;\n  flex: 2 1 auto;\n  padding: 0 2em 0 1em;\n  text-align: right;\n  font-size: 11px;\n  line-height: 1;\n}\n\n.cet-menubar-menu-container .cet-submenu-indicator {\n  position: absolute;\n  right: 4px;\n  height: 12px;\n  width: 12px;\n  padding: 0;\n}\n\n.cet-menubar-menu-container .cet-submenu-indicator img,\n.cet-menubar-menu-container .cet-menu-item-icon .icon,\n.cet-menubar-menu-container .cet-submenu-indicator svg,\n.cet-menubar-menu-container .cet-menu-item-icon svg {\n  display: inherit;\n  width: 100%;\n  height: 100%;\n}\n\n.cet-menubar-menu-container .cet-action-menu-item.checked>.cet-menu-item-icon.checkbox {\n  visibility: visible;\n}\n\n.cet-menubar-menu-container .cet-menu-item-icon {\n  width: 14px;\n  height: 14px;\n  margin: 0 0 0 12px;\n}\n\n.cet-menubar-menu-container .cet-menu-item-icon.checkbox {\n  visibility: hidden;\n}";
const macTheme = "";
const winTheme = "";
class ThemingRegistry extends _get__("lifecycle_1").Disposable {
  constructor() {
    super();
    this.theming = [];
    this.theming = [];
  }
  onThemeChange(theme) {
    this.theming.push(theme);
    return (0, _get__("lifecycle_1").toDisposable)(() => {
      const idx = this.theming.indexOf(theme);
      this.theming.splice(idx, 1);
    });
  }
  getTheming() {
    return this.theming;
  }
}
class ThemeBar extends _get__("ThemingRegistry") {
  constructor() {
    super();
    this.registerTheme(collector => {
      collector.addRule(_get__("baseTheme"));
    });
  }
  registerTheme(theme) {
    this.onThemeChange(theme);
    const cssRules = [];
    const hasRule = {};
    const ruleCollector = {
      addRule: rule => {
        if (!hasRule[rule]) {
          cssRules.push(rule);
          hasRule[rule] = true;
        }
      }
    };
    this.getTheming().forEach(p => p(ruleCollector));
    _get__("_applyRules")(cssRules.join('\n'), 'titlebar-style');
  }
  static get win() {
    return collector => {
      collector.addRule(_get__("winTheme"));
    };
  }
  static get mac() {
    return collector => {
      collector.addRule(_get__("macTheme"));
    };
  }
}
exports.ThemeBar = _get__("ThemeBar");
function _applyRules(styleSheetContent, rulesClassName) {
  const themeStyles = document.head.getElementsByClassName(rulesClassName);
  if (themeStyles.length === 0) {
    const styleElement = document.createElement('style');
    styleElement.className = rulesClassName;
    styleElement.innerHTML = styleSheetContent;
    document.head.appendChild(styleElement);
  } else {
    themeStyles[0].innerHTML = styleSheetContent;
  }
}
function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}
;
var _RewireModuleId__ = null;
function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    let globalVariable = _getGlobalObject();
    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }
    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }
  return _RewireModuleId__;
}
function _getRewireRegistry__() {
  let theGlobalVariable = _getGlobalObject();
  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }
  return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}
function _getRewiredData__() {
  let moduleId = _getRewireModuleId__();
  let registry = _getRewireRegistry__();
  let rewireData = registry[moduleId];
  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }
  return rewireData;
}
(function registerResetAll() {
  let theGlobalVariable = _getGlobalObject();
  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();
var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
let _RewireAPI__ = {};
(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }
  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();
function _get__(variableName) {
  let rewireData = _getRewiredData__();
  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];
    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}
function _get_original__(variableName) {
  switch (variableName) {
    case "lifecycle_1":
      return lifecycle_1;
    case "baseTheme":
      return baseTheme;
    case "_applyRules":
      return _applyRules;
    case "winTheme":
      return winTheme;
    case "macTheme":
      return macTheme;
    case "ThemingRegistry":
      return ThemingRegistry;
    case "ThemeBar":
      return ThemeBar;
  }
  return undefined;
}
function _assign__(variableName, value) {
  let rewireData = _getRewiredData__();
  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}
function _set_original__(variableName, _value) {
  switch (variableName) {}
  return undefined;
}
function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);
  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
  _assign__(variableName, newValue);
  return prefix ? newValue : oldValue;
}
function _set__(variableName, value) {
  let rewireData = _getRewiredData__();
  if (typeof variableName === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
    return function () {
      Object.keys(variableName).forEach(function (name) {
        _reset__(variableName);
      });
    };
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }
    return function () {
      _reset__(variableName);
    };
  }
}
function _reset__(variableName) {
  let rewireData = _getRewiredData__();
  delete rewireData[variableName];
  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }
  ;
}
function _with__(object) {
  let rewireData = _getRewiredData__();
  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};
  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }
  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    let result = callback();
    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }
    return result;
  };
}
let _typeOfOriginalExport = typeof module.exports;
function addNonEnumerableProperty(name, value) {
  Object.defineProperty(module.exports, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}
if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(module.exports)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}