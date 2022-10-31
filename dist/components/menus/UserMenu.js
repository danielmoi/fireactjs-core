"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMenu = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _Auth = require("../Auth");
var _AccountBox = _interopRequireDefault(require("@mui/icons-material/AccountBox"));
var _ExitToApp = _interopRequireDefault(require("@mui/icons-material/ExitToApp"));
var _auth = require("firebase/auth");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const UserMenu = _ref => {
  let {
    pathnames,
    customItems
  } = _ref;
  const profileUrl = pathnames.UserProfile;
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = (0, _reactRouterDom.useNavigate)();
  return /*#__PURE__*/_react.default.createElement(_Auth.AuthContext.Consumer, null, context => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    "ria-label": "account of current user",
    "aria-controls": "menu-appbar",
    onClick: handleMenu,
    "aria-haspopup": "true"
  }, /*#__PURE__*/_react.default.createElement(_material.Avatar, {
    alt: context.authUser.user.displayName,
    src: context.authUser.user.photoURL ? context.authUser.user.photoURL : "https://ui-avatars.com/api/?name=" + encodeURI(context.authUser.user.displayName) + "&background=007bff&size=64&color=f8f9fc"
  })), /*#__PURE__*/_react.default.createElement(_material.Menu, {
    id: "menu-appbar",
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    open: open,
    onClose: handleClose
  }, profileUrl && [/*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: "profile-menu-item",
    onClick: e => {
      e.preventDefault();
      handleClose();
      navigate(profileUrl);
    }
  }, /*#__PURE__*/_react.default.createElement(_AccountBox.default, {
    sx: {
      marginRight: "10px"
    }
  }), " Profile"), /*#__PURE__*/_react.default.createElement(_material.Divider, {
    key: "profile-menu-divider"
  })], customItems, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    onClick: e => {
      e.preventDefault();
      handleClose();
      const auth = (0, _auth.getAuth)();
      (0, _auth.signOut)(auth).then(() => {
        document.location.href = "/";
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_ExitToApp.default, {
    sx: {
      marginRight: "10px"
    }
  }), " Sign Out"))));
};
exports.UserMenu = UserMenu;