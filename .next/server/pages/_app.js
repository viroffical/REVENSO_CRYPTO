/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./context/AuthContext.js":
/*!********************************!*\
  !*** ./context/AuthContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Mock user credentials\nconst MOCK_USER = {\n    email: 'test@demo.com',\n    password: 'password123',\n    name: 'Demo User',\n    avatar: '/avatar-placeholder.svg'\n};\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // Check for existing session on load (client-side only)\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Make sure code only runs in browser environment\n            if (false) {}\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    // Login function with validation\n    const login = (email, password, remember)=>{\n        setError('');\n        setSuccess('');\n        // Basic validation\n        if (!email || !password) {\n            setError('Please enter both email and password');\n            return;\n        }\n        // Check against mock credentials\n        if (email === MOCK_USER.email && password === MOCK_USER.password) {\n            const userData = {\n                email: MOCK_USER.email,\n                name: MOCK_USER.name,\n                avatar: MOCK_USER.avatar\n            };\n            setUser(userData);\n            setSuccess('Login successful');\n            // Store user data in localStorage if remember is checked\n            if (remember) {\n                localStorage.setItem('user', JSON.stringify(userData));\n            }\n            // Redirect to dashboard after successful login\n            setTimeout(()=>{\n                router.push('/dashboard');\n            }, 800);\n        } else {\n            setError('Invalid email or password');\n        }\n    };\n    // Logout function\n    const logout = ()=>{\n        setUser(null);\n        localStorage.removeItem('user');\n        router.push('/');\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            login,\n            logout,\n            loading,\n            error,\n            success,\n            setError,\n            setSuccess\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/context/AuthContext.js\",\n        lineNumber: 77,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXVFO0FBQy9CO0FBRXhDLHdCQUF3QjtBQUN4QixNQUFNSyxZQUFZO0lBQ2hCQyxPQUFPO0lBQ1BDLFVBQVU7SUFDVkMsTUFBTTtJQUNOQyxRQUFRO0FBQ1Y7QUFFQSxNQUFNQyw0QkFBY1Ysb0RBQWFBO0FBRTFCLFNBQVNXLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNjLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDZ0IsT0FBT0MsU0FBUyxHQUFHakIsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDa0IsU0FBU0MsV0FBVyxHQUFHbkIsK0NBQVFBLENBQUM7SUFDdkMsTUFBTW9CLFNBQVNqQixzREFBU0E7SUFFeEIsd0RBQXdEO0lBQ3hERCxnREFBU0E7a0NBQUM7WUFDUixrREFBa0Q7WUFDbEQsSUFBSSxLQUE2QixFQUFFLEVBTWxDO1FBQ0g7aUNBQUcsRUFBRTtJQUVMLGlDQUFpQztJQUNqQyxNQUFNd0IsUUFBUSxDQUFDckIsT0FBT0MsVUFBVXFCO1FBQzlCVixTQUFTO1FBQ1RFLFdBQVc7UUFFWCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDZCxTQUFTLENBQUNDLFVBQVU7WUFDdkJXLFNBQVM7WUFDVDtRQUNGO1FBRUEsaUNBQWlDO1FBQ2pDLElBQUlaLFVBQVVELFVBQVVDLEtBQUssSUFBSUMsYUFBYUYsVUFBVUUsUUFBUSxFQUFFO1lBQ2hFLE1BQU1zQixXQUFXO2dCQUNmdkIsT0FBT0QsVUFBVUMsS0FBSztnQkFDdEJFLE1BQU1ILFVBQVVHLElBQUk7Z0JBQ3BCQyxRQUFRSixVQUFVSSxNQUFNO1lBQzFCO1lBRUFLLFFBQVFlO1lBQ1JULFdBQVc7WUFFWCx5REFBeUQ7WUFDekQsSUFBSVEsVUFBVTtnQkFDWkwsYUFBYU8sT0FBTyxDQUFDLFFBQVFMLEtBQUtNLFNBQVMsQ0FBQ0Y7WUFDOUM7WUFFQSwrQ0FBK0M7WUFDL0NHLFdBQVc7Z0JBQ1RYLE9BQU9ZLElBQUksQ0FBQztZQUNkLEdBQUc7UUFDTCxPQUFPO1lBQ0xmLFNBQVM7UUFDWDtJQUNGO0lBRUEsa0JBQWtCO0lBQ2xCLE1BQU1nQixTQUFTO1FBQ2JwQixRQUFRO1FBQ1JTLGFBQWFZLFVBQVUsQ0FBQztRQUN4QmQsT0FBT1ksSUFBSSxDQUFDO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ3ZCLFlBQVkwQixRQUFRO1FBQUNDLE9BQU87WUFDM0J4QjtZQUNBYztZQUNBTztZQUNBbkI7WUFDQUU7WUFDQUU7WUFDQUQ7WUFDQUU7UUFDRjtrQkFDR1I7Ozs7OztBQUdQO0FBRU8sU0FBUzBCO0lBQ2QsT0FBT3BDLGlEQUFVQSxDQUFDUTtBQUNwQiIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9jb250ZXh0L0F1dGhDb250ZXh0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbi8vIE1vY2sgdXNlciBjcmVkZW50aWFsc1xuY29uc3QgTU9DS19VU0VSID0ge1xuICBlbWFpbDogJ3Rlc3RAZGVtby5jb20nLFxuICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgbmFtZTogJ0RlbW8gVXNlcicsXG4gIGF2YXRhcjogJy9hdmF0YXItcGxhY2Vob2xkZXIuc3ZnJ1xufTtcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gQ2hlY2sgZm9yIGV4aXN0aW5nIHNlc3Npb24gb24gbG9hZCAoY2xpZW50LXNpZGUgb25seSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBNYWtlIHN1cmUgY29kZSBvbmx5IHJ1bnMgaW4gYnJvd3NlciBlbnZpcm9ubWVudFxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gICAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgICBzZXRVc2VyKEpTT04ucGFyc2Uoc3RvcmVkVXNlcikpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgLy8gTG9naW4gZnVuY3Rpb24gd2l0aCB2YWxpZGF0aW9uXG4gIGNvbnN0IGxvZ2luID0gKGVtYWlsLCBwYXNzd29yZCwgcmVtZW1iZXIpID0+IHtcbiAgICBzZXRFcnJvcignJyk7XG4gICAgc2V0U3VjY2VzcygnJyk7XG4gICAgXG4gICAgLy8gQmFzaWMgdmFsaWRhdGlvblxuICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgICBzZXRFcnJvcignUGxlYXNlIGVudGVyIGJvdGggZW1haWwgYW5kIHBhc3N3b3JkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgYWdhaW5zdCBtb2NrIGNyZWRlbnRpYWxzXG4gICAgaWYgKGVtYWlsID09PSBNT0NLX1VTRVIuZW1haWwgJiYgcGFzc3dvcmQgPT09IE1PQ0tfVVNFUi5wYXNzd29yZCkge1xuICAgICAgY29uc3QgdXNlckRhdGEgPSB7XG4gICAgICAgIGVtYWlsOiBNT0NLX1VTRVIuZW1haWwsXG4gICAgICAgIG5hbWU6IE1PQ0tfVVNFUi5uYW1lLFxuICAgICAgICBhdmF0YXI6IE1PQ0tfVVNFUi5hdmF0YXJcbiAgICAgIH07XG4gICAgICBcbiAgICAgIHNldFVzZXIodXNlckRhdGEpO1xuICAgICAgc2V0U3VjY2VzcygnTG9naW4gc3VjY2Vzc2Z1bCcpO1xuICAgICAgXG4gICAgICAvLyBTdG9yZSB1c2VyIGRhdGEgaW4gbG9jYWxTdG9yYWdlIGlmIHJlbWVtYmVyIGlzIGNoZWNrZWRcbiAgICAgIGlmIChyZW1lbWJlcikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFJlZGlyZWN0IHRvIGRhc2hib2FyZCBhZnRlciBzdWNjZXNzZnVsIGxvZ2luXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKTtcbiAgICAgIH0sIDgwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVycm9yKCdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIExvZ291dCBmdW5jdGlvblxuICBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XG4gICAgc2V0VXNlcihudWxsKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcicpO1xuICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgXG4gICAgICB1c2VyLCBcbiAgICAgIGxvZ2luLCBcbiAgICAgIGxvZ291dCwgXG4gICAgICBsb2FkaW5nLCBcbiAgICAgIGVycm9yLCBcbiAgICAgIHN1Y2Nlc3MsXG4gICAgICBzZXRFcnJvcixcbiAgICAgIHNldFN1Y2Nlc3NcbiAgICB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoQXV0aENvbnRleHQpO1xufSJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlUm91dGVyIiwiTU9DS19VU0VSIiwiZW1haWwiLCJwYXNzd29yZCIsIm5hbWUiLCJhdmF0YXIiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInJvdXRlciIsInN0b3JlZFVzZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwibG9naW4iLCJyZW1lbWJlciIsInVzZXJEYXRhIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsInNldFRpbWVvdXQiLCJwdXNoIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBdXRoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./context/ThemeContext.js":
/*!*********************************!*\
  !*** ./context/ThemeContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction ThemeProvider({ children }) {\n    const [darkMode, setDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            // Check for stored theme preference on load\n            const storedDarkMode = localStorage.getItem('darkMode') === 'true';\n            // Check system preference if no stored preference\n            if (localStorage.getItem('darkMode') === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {\n                setDarkMode(true);\n                document.documentElement.classList.add('dark');\n            } else if (storedDarkMode) {\n                setDarkMode(true);\n                document.documentElement.classList.add('dark');\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    // Toggle dark mode\n    const toggleDarkMode = ()=>{\n        setDarkMode((prevMode)=>{\n            const newMode = !prevMode;\n            localStorage.setItem('darkMode', newMode.toString());\n            if (newMode) {\n                document.documentElement.classList.add('dark');\n            } else {\n                document.documentElement.classList.remove('dark');\n            }\n            return newMode;\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            darkMode,\n            toggleDarkMode\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/context/ThemeContext.js\",\n        lineNumber: 40,\n        columnNumber: 5\n    }, this);\n}\nfunction useTheme() {\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvVGhlbWVDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUU7QUFFdkUsTUFBTUksNkJBQWVKLG9EQUFhQTtBQUUzQixTQUFTSyxjQUFjLEVBQUVDLFFBQVEsRUFBRTtJQUN4QyxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR1AsK0NBQVFBLENBQUM7SUFFekNFLGdEQUFTQTttQ0FBQztZQUNSLDRDQUE0QztZQUM1QyxNQUFNTSxpQkFBaUJDLGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0I7WUFFNUQsa0RBQWtEO1lBQ2xELElBQUlELGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0IsUUFDckNDLE9BQU9DLFVBQVUsQ0FBQyxnQ0FBZ0NDLE9BQU8sRUFBRTtnQkFDN0ROLFlBQVk7Z0JBQ1pPLFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUM7WUFDekMsT0FBTyxJQUFJVCxnQkFBZ0I7Z0JBQ3pCRCxZQUFZO2dCQUNaTyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO1lBQ3pDO1FBQ0Y7a0NBQUcsRUFBRTtJQUVMLG1CQUFtQjtJQUNuQixNQUFNQyxpQkFBaUI7UUFDckJYLFlBQVlZLENBQUFBO1lBQ1YsTUFBTUMsVUFBVSxDQUFDRDtZQUNqQlYsYUFBYVksT0FBTyxDQUFDLFlBQVlELFFBQVFFLFFBQVE7WUFFakQsSUFBSUYsU0FBUztnQkFDWE4sU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQztZQUN6QyxPQUFPO2dCQUNMSCxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ08sTUFBTSxDQUFDO1lBQzVDO1lBRUEsT0FBT0g7UUFDVDtJQUNGO0lBRUEscUJBQ0UsOERBQUNqQixhQUFhcUIsUUFBUTtRQUFDQyxPQUFPO1lBQzVCbkI7WUFDQVk7UUFDRjtrQkFDR2I7Ozs7OztBQUdQO0FBRU8sU0FBU3FCO0lBQ2QsT0FBT3pCLGlEQUFVQSxDQUFDRTtBQUNwQiIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9jb250ZXh0L1RoZW1lQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBUaGVtZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVtZVByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbZGFya01vZGUsIHNldERhcmtNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIENoZWNrIGZvciBzdG9yZWQgdGhlbWUgcHJlZmVyZW5jZSBvbiBsb2FkXG4gICAgY29uc3Qgc3RvcmVkRGFya01vZGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gJ3RydWUnO1xuICAgIFxuICAgIC8vIENoZWNrIHN5c3RlbSBwcmVmZXJlbmNlIGlmIG5vIHN0b3JlZCBwcmVmZXJlbmNlXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrTW9kZScpID09PSBudWxsICYmIFxuICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMpIHtcbiAgICAgIHNldERhcmtNb2RlKHRydWUpO1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JlZERhcmtNb2RlKSB7XG4gICAgICBzZXREYXJrTW9kZSh0cnVlKTtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgLy8gVG9nZ2xlIGRhcmsgbW9kZVxuICBjb25zdCB0b2dnbGVEYXJrTW9kZSA9ICgpID0+IHtcbiAgICBzZXREYXJrTW9kZShwcmV2TW9kZSA9PiB7XG4gICAgICBjb25zdCBuZXdNb2RlID0gIXByZXZNb2RlO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtNb2RlJywgbmV3TW9kZS50b1N0cmluZygpKTtcbiAgICAgIFxuICAgICAgaWYgKG5ld01vZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBuZXdNb2RlO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFRoZW1lQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBcbiAgICAgIGRhcmtNb2RlLCBcbiAgICAgIHRvZ2dsZURhcmtNb2RlXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9UaGVtZUNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUaGVtZSgpIHtcbiAgcmV0dXJuIHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsIlRoZW1lQ29udGV4dCIsIlRoZW1lUHJvdmlkZXIiLCJjaGlsZHJlbiIsImRhcmtNb2RlIiwic2V0RGFya01vZGUiLCJzdG9yZWREYXJrTW9kZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwidG9nZ2xlRGFya01vZGUiLCJwcmV2TW9kZSIsIm5ld01vZGUiLCJzZXRJdGVtIiwidG9TdHJpbmciLCJyZW1vdmUiLCJQcm92aWRlciIsInZhbHVlIiwidXNlVGhlbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/ThemeContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"(pages-dir-node)/./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context/AuthContext */ \"(pages-dir-node)/./context/AuthContext.js\");\n/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/ThemeContext */ \"(pages-dir-node)/./context/ThemeContext.js\");\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"theme-color\",\n                        content: \"#FFFFFF\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"apple-mobile-web-app-capable\",\n                        content: \"yes\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Premium login interface with dashboard\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"REVENSO | Premium Login\"\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 14,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/runner/workspace/pages/_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_ThemeContext__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/home/runner/workspace/pages/_app.js\",\n                        lineNumber: 18,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/runner/workspace/pages/_app.js\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/runner/workspace/pages/_app.js\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNGO0FBQ3lCO0FBQ0U7QUFFeEMsU0FBU0csSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNsRCxxQkFDRTs7MEJBQ0UsOERBQUNMLGtEQUFJQTs7a0NBQ0gsOERBQUNNO3dCQUFLQyxNQUFLO3dCQUFXQyxTQUFROzs7Ozs7a0NBQzlCLDhEQUFDRjt3QkFBS0MsTUFBSzt3QkFBY0MsU0FBUTs7Ozs7O2tDQUNqQyw4REFBQ0Y7d0JBQUtDLE1BQUs7d0JBQStCQyxTQUFROzs7Ozs7a0NBQ2xELDhEQUFDRjt3QkFBS0MsTUFBSzt3QkFBY0MsU0FBUTs7Ozs7O2tDQUNqQyw4REFBQ0M7a0NBQU07Ozs7Ozs7Ozs7OzswQkFFVCw4REFBQ1AsZ0VBQWFBOzBCQUNaLDRFQUFDRCw4REFBWUE7OEJBQ1gsNEVBQUNHO3dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtsQyIsInNvdXJjZXMiOlsiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9wYWdlcy9fYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dC9BdXRoQ29udGV4dCdcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L1RoZW1lQ29udGV4dCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vXCIgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiNGRkZGRkZcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiUHJlbWl1bSBsb2dpbiBpbnRlcmZhY2Ugd2l0aCBkYXNoYm9hcmRcIiAvPlxuICAgICAgICA8dGl0bGU+UkVWRU5TTyB8IFByZW1pdW0gTG9naW48L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPFRoZW1lUHJvdmlkZXI+XG4gICAgICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L0F1dGhQcm92aWRlcj5cbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICA8Lz5cbiAgKVxufSJdLCJuYW1lcyI6WyJIZWFkIiwiQXV0aFByb3ZpZGVyIiwiVGhlbWVQcm92aWRlciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsIm1ldGEiLCJuYW1lIiwiY29udGVudCIsInRpdGxlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();