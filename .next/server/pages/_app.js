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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Mock user credentials\nconst MOCK_USER = {\n    email: 'test@demo.com',\n    password: 'password123',\n    name: 'Demo User',\n    avatar: '/avatar-placeholder.png'\n};\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const [success, setSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    // Check for existing session on load\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const storedUser = localStorage.getItem('user');\n            if (storedUser) {\n                setUser(JSON.parse(storedUser));\n            }\n            setLoading(false);\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    // Login function with validation\n    const login = (email, password, remember)=>{\n        setError('');\n        setSuccess('');\n        // Basic validation\n        if (!email || !password) {\n            setError('Please enter both email and password');\n            return;\n        }\n        // Check against mock credentials\n        if (email === MOCK_USER.email && password === MOCK_USER.password) {\n            const userData = {\n                email: MOCK_USER.email,\n                name: MOCK_USER.name,\n                avatar: MOCK_USER.avatar\n            };\n            setUser(userData);\n            setSuccess('Login successful');\n            // Store user data in localStorage if remember is checked\n            if (remember) {\n                localStorage.setItem('user', JSON.stringify(userData));\n            }\n            // Redirect to dashboard after successful login\n            setTimeout(()=>{\n                router.push('/dashboard');\n            }, 800);\n        } else {\n            setError('Invalid email or password');\n        }\n    };\n    // Logout function\n    const logout = ()=>{\n        setUser(null);\n        localStorage.removeItem('user');\n        router.push('/');\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            login,\n            logout,\n            loading,\n            error,\n            success,\n            setError,\n            setSuccess\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/context/AuthContext.js\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, undefined);\n};\nconst useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvQXV0aENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQXVFO0FBQy9CO0FBRXhDLHdCQUF3QjtBQUN4QixNQUFNSyxZQUFZO0lBQ2hCQyxPQUFPO0lBQ1BDLFVBQVU7SUFDVkMsTUFBTTtJQUNOQyxRQUFRO0FBQ1Y7QUFFQSxNQUFNQyw0QkFBY1Ysb0RBQWFBLENBQUMsQ0FBQztBQUU1QixNQUFNVyxlQUFlLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHYiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNjLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDZ0IsT0FBT0MsU0FBUyxHQUFHakIsK0NBQVFBLENBQUM7SUFDbkMsTUFBTSxDQUFDa0IsU0FBU0MsV0FBVyxHQUFHbkIsK0NBQVFBLENBQUM7SUFDdkMsTUFBTW9CLFNBQVNqQixzREFBU0E7SUFFeEIscUNBQXFDO0lBQ3JDRCxnREFBU0E7a0NBQUM7WUFDUixNQUFNbUIsYUFBYUMsYUFBYUMsT0FBTyxDQUFDO1lBQ3hDLElBQUlGLFlBQVk7Z0JBQ2RSLFFBQVFXLEtBQUtDLEtBQUssQ0FBQ0o7WUFDckI7WUFDQU4sV0FBVztRQUNiO2lDQUFHLEVBQUU7SUFFTCxpQ0FBaUM7SUFDakMsTUFBTVcsUUFBUSxDQUFDckIsT0FBT0MsVUFBVXFCO1FBQzlCVixTQUFTO1FBQ1RFLFdBQVc7UUFFWCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDZCxTQUFTLENBQUNDLFVBQVU7WUFDdkJXLFNBQVM7WUFDVDtRQUNGO1FBRUEsaUNBQWlDO1FBQ2pDLElBQUlaLFVBQVVELFVBQVVDLEtBQUssSUFBSUMsYUFBYUYsVUFBVUUsUUFBUSxFQUFFO1lBQ2hFLE1BQU1zQixXQUFXO2dCQUNmdkIsT0FBT0QsVUFBVUMsS0FBSztnQkFDdEJFLE1BQU1ILFVBQVVHLElBQUk7Z0JBQ3BCQyxRQUFRSixVQUFVSSxNQUFNO1lBQzFCO1lBRUFLLFFBQVFlO1lBQ1JULFdBQVc7WUFFWCx5REFBeUQ7WUFDekQsSUFBSVEsVUFBVTtnQkFDWkwsYUFBYU8sT0FBTyxDQUFDLFFBQVFMLEtBQUtNLFNBQVMsQ0FBQ0Y7WUFDOUM7WUFFQSwrQ0FBK0M7WUFDL0NHLFdBQVc7Z0JBQ1RYLE9BQU9ZLElBQUksQ0FBQztZQUNkLEdBQUc7UUFDTCxPQUFPO1lBQ0xmLFNBQVM7UUFDWDtJQUNGO0lBRUEsa0JBQWtCO0lBQ2xCLE1BQU1nQixTQUFTO1FBQ2JwQixRQUFRO1FBQ1JTLGFBQWFZLFVBQVUsQ0FBQztRQUN4QmQsT0FBT1ksSUFBSSxDQUFDO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ3ZCLFlBQVkwQixRQUFRO1FBQUNDLE9BQU87WUFDM0J4QjtZQUNBYztZQUNBTztZQUNBbkI7WUFDQUU7WUFDQUU7WUFDQUQ7WUFDQUU7UUFDRjtrQkFDR1I7Ozs7OztBQUdQLEVBQUU7QUFFSyxNQUFNMEIsVUFBVSxJQUFNcEMsaURBQVVBLENBQUNRLGFBQWEiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3Jrc3BhY2UvY29udGV4dC9BdXRoQ29udGV4dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlQ29udGV4dCwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG4vLyBNb2NrIHVzZXIgY3JlZGVudGlhbHNcbmNvbnN0IE1PQ0tfVVNFUiA9IHtcbiAgZW1haWw6ICd0ZXN0QGRlbW8uY29tJyxcbiAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gIG5hbWU6ICdEZW1vIFVzZXInLFxuICBhdmF0YXI6ICcvYXZhdGFyLXBsYWNlaG9sZGVyLnBuZydcbn07XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSk7XG5cbmV4cG9ydCBjb25zdCBBdXRoUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gQ2hlY2sgZm9yIGV4aXN0aW5nIHNlc3Npb24gb24gbG9hZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcicpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICBzZXRVc2VyKEpTT04ucGFyc2Uoc3RvcmVkVXNlcikpO1xuICAgIH1cbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgfSwgW10pO1xuXG4gIC8vIExvZ2luIGZ1bmN0aW9uIHdpdGggdmFsaWRhdGlvblxuICBjb25zdCBsb2dpbiA9IChlbWFpbCwgcGFzc3dvcmQsIHJlbWVtYmVyKSA9PiB7XG4gICAgc2V0RXJyb3IoJycpO1xuICAgIHNldFN1Y2Nlc3MoJycpO1xuICAgIFxuICAgIC8vIEJhc2ljIHZhbGlkYXRpb25cbiAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgc2V0RXJyb3IoJ1BsZWFzZSBlbnRlciBib3RoIGVtYWlsIGFuZCBwYXNzd29yZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGFnYWluc3QgbW9jayBjcmVkZW50aWFsc1xuICAgIGlmIChlbWFpbCA9PT0gTU9DS19VU0VSLmVtYWlsICYmIHBhc3N3b3JkID09PSBNT0NLX1VTRVIucGFzc3dvcmQpIHtcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgICBlbWFpbDogTU9DS19VU0VSLmVtYWlsLFxuICAgICAgICBuYW1lOiBNT0NLX1VTRVIubmFtZSxcbiAgICAgICAgYXZhdGFyOiBNT0NLX1VTRVIuYXZhdGFyXG4gICAgICB9O1xuICAgICAgXG4gICAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICAgIHNldFN1Y2Nlc3MoJ0xvZ2luIHN1Y2Nlc3NmdWwnKTtcbiAgICAgIFxuICAgICAgLy8gU3RvcmUgdXNlciBkYXRhIGluIGxvY2FsU3RvcmFnZSBpZiByZW1lbWJlciBpcyBjaGVja2VkXG4gICAgICBpZiAocmVtZW1iZXIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSkpO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBSZWRpcmVjdCB0byBkYXNoYm9hcmQgYWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJyk7XG4gICAgICB9LCA4MDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFcnJvcignSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCcpO1xuICAgIH1cbiAgfTtcblxuICAvLyBMb2dvdXQgZnVuY3Rpb25cbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xuICAgIHNldFVzZXIobnVsbCk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXInKTtcbiAgICByb3V0ZXIucHVzaCgnLycpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IFxuICAgICAgdXNlciwgXG4gICAgICBsb2dpbiwgXG4gICAgICBsb2dvdXQsIFxuICAgICAgbG9hZGluZywgXG4gICAgICBlcnJvciwgXG4gICAgICBzdWNjZXNzLFxuICAgICAgc2V0RXJyb3IsXG4gICAgICBzZXRTdWNjZXNzXG4gICAgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJNT0NLX1VTRVIiLCJlbWFpbCIsInBhc3N3b3JkIiwibmFtZSIsImF2YXRhciIsIkF1dGhDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwicm91dGVyIiwic3RvcmVkVXNlciIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJKU09OIiwicGFyc2UiLCJsb2dpbiIsInJlbWVtYmVyIiwidXNlckRhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5Iiwic2V0VGltZW91dCIsInB1c2giLCJsb2dvdXQiLCJyZW1vdmVJdGVtIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUF1dGgiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./context/ThemeContext.js":
/*!*********************************!*\
  !*** ./context/ThemeContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst ThemeProvider = ({ children })=>{\n    const [darkMode, setDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Check for stored theme preference on load\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            // Check localStorage\n            const storedDarkMode = localStorage.getItem('darkMode') === 'true';\n            // Check system preference if no stored preference\n            if (localStorage.getItem('darkMode') === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {\n                setDarkMode(true);\n                document.documentElement.classList.add('dark');\n            } else if (storedDarkMode) {\n                setDarkMode(true);\n                document.documentElement.classList.add('dark');\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    // Toggle dark mode\n    const toggleDarkMode = ()=>{\n        setDarkMode((prevMode)=>{\n            const newMode = !prevMode;\n            localStorage.setItem('darkMode', newMode.toString());\n            if (newMode) {\n                document.documentElement.classList.add('dark');\n            } else {\n                document.documentElement.classList.remove('dark');\n            }\n            return newMode;\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            darkMode,\n            toggleDarkMode\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/runner/workspace/context/ThemeContext.js\",\n        lineNumber: 41,\n        columnNumber: 5\n    }, undefined);\n};\nconst useTheme = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHQvVGhlbWVDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUU7QUFFdkUsTUFBTUksNkJBQWVKLG9EQUFhQSxDQUFDLENBQUM7QUFFN0IsTUFBTUssZ0JBQWdCLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3hDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUV6Qyw0Q0FBNEM7SUFDNUNFLGdEQUFTQTttQ0FBQztZQUNSLHFCQUFxQjtZQUNyQixNQUFNTSxpQkFBaUJDLGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0I7WUFFNUQsa0RBQWtEO1lBQ2xELElBQUlELGFBQWFDLE9BQU8sQ0FBQyxnQkFBZ0IsUUFDckNDLE9BQU9DLFVBQVUsQ0FBQyxnQ0FBZ0NDLE9BQU8sRUFBRTtnQkFDN0ROLFlBQVk7Z0JBQ1pPLFNBQVNDLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUM7WUFDekMsT0FBTyxJQUFJVCxnQkFBZ0I7Z0JBQ3pCRCxZQUFZO2dCQUNaTyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO1lBQ3pDO1FBQ0Y7a0NBQUcsRUFBRTtJQUVMLG1CQUFtQjtJQUNuQixNQUFNQyxpQkFBaUI7UUFDckJYLFlBQVlZLENBQUFBO1lBQ1YsTUFBTUMsVUFBVSxDQUFDRDtZQUNqQlYsYUFBYVksT0FBTyxDQUFDLFlBQVlELFFBQVFFLFFBQVE7WUFFakQsSUFBSUYsU0FBUztnQkFDWE4sU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQztZQUN6QyxPQUFPO2dCQUNMSCxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ08sTUFBTSxDQUFDO1lBQzVDO1lBRUEsT0FBT0g7UUFDVDtJQUNGO0lBRUEscUJBQ0UsOERBQUNqQixhQUFhcUIsUUFBUTtRQUFDQyxPQUFPO1lBQzVCbkI7WUFDQVk7UUFDRjtrQkFDR2I7Ozs7OztBQUdQLEVBQUU7QUFFSyxNQUFNcUIsV0FBVyxJQUFNekIsaURBQVVBLENBQUNFLGNBQWMiLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3Jrc3BhY2UvY29udGV4dC9UaGVtZUNvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgVGhlbWVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSk7XG5cbmV4cG9ydCBjb25zdCBUaGVtZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbZGFya01vZGUsIHNldERhcmtNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBDaGVjayBmb3Igc3RvcmVkIHRoZW1lIHByZWZlcmVuY2Ugb24gbG9hZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIENoZWNrIGxvY2FsU3RvcmFnZVxuICAgIGNvbnN0IHN0b3JlZERhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtNb2RlJykgPT09ICd0cnVlJztcbiAgICBcbiAgICAvLyBDaGVjayBzeXN0ZW0gcHJlZmVyZW5jZSBpZiBubyBzdG9yZWQgcHJlZmVyZW5jZVxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGFya01vZGUnKSA9PT0gbnVsbCAmJiBcbiAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzKSB7XG4gICAgICBzZXREYXJrTW9kZSh0cnVlKTtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gICAgfSBlbHNlIGlmIChzdG9yZWREYXJrTW9kZSkge1xuICAgICAgc2V0RGFya01vZGUodHJ1ZSk7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIC8vIFRvZ2dsZSBkYXJrIG1vZGVcbiAgY29uc3QgdG9nZ2xlRGFya01vZGUgPSAoKSA9PiB7XG4gICAgc2V0RGFya01vZGUocHJldk1vZGUgPT4ge1xuICAgICAgY29uc3QgbmV3TW9kZSA9ICFwcmV2TW9kZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrTW9kZScsIG5ld01vZGUudG9TdHJpbmcoKSk7XG4gICAgICBcbiAgICAgIGlmIChuZXdNb2RlKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gbmV3TW9kZTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgXG4gICAgICBkYXJrTW9kZSwgXG4gICAgICB0b2dnbGVEYXJrTW9kZVxuICAgIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVGhlbWVDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZVRoZW1lID0gKCkgPT4gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpOyJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwiVGhlbWVDb250ZXh0IiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwiZGFya01vZGUiLCJzZXREYXJrTW9kZSIsInN0b3JlZERhcmtNb2RlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0b2dnbGVEYXJrTW9kZSIsInByZXZNb2RlIiwibmV3TW9kZSIsInNldEl0ZW0iLCJ0b1N0cmluZyIsInJlbW92ZSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VUaGVtZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./context/ThemeContext.js\n");

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