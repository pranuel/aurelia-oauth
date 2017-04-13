var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-token-service", "./url-hash-service", "./local-storage-service", "./oauth-polyfills"], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
    var OAuthService = OAuthService_1 = (function () {
        function OAuthService(oAuthTokenService, urlHashService, localStorageService, eventAggregator) {
            var _this = this;
            this.oAuthTokenService = oAuthTokenService;
            this.urlHashService = urlHashService;
            this.localStorageService = localStorageService;
            this.eventAggregator = eventAggregator;
            this.configure = function (config) {
                if (_this.config) {
                    throw new Error('OAuthProvider already configured.');
                }
                if (config.loginUrl.substr(-1) === '/') {
                    config.loginUrl = config.loginUrl.slice(0, -1);
                }
                if (config.logoutUrl.substr(-1) === '/') {
                    config.logoutUrl = config.logoutUrl.slice(0, -1);
                }
                _this.config = oauth_polyfills_1.objectAssign(_this.defaults, config);
                var existingHash = window.location.hash;
                var pathDefault = window.location.href;
                if (existingHash) {
                    pathDefault = pathDefault.replace(existingHash, '');
                }
                if (pathDefault.substr(-1) === '#') {
                    pathDefault = pathDefault.slice(0, -1);
                }
                _this.config.redirectUri = config.redirectUri || pathDefault;
                return config;
            };
            this.isAuthenticated = function () {
                return _this.oAuthTokenService.getToken();
            };
            this.login = function () {
                var redirectUrl = _this.config.loginUrl + "?" +
                    ("response_type=" + _this.oAuthTokenService.config.name + "&") +
                    ("client_id=" + encodeURIComponent(_this.config.clientId) + "&") +
                    ("redirect_uri=" + encodeURIComponent(_this.config.redirectUri) + "&") +
                    ("nonce=" + encodeURIComponent(_this.getSimpleNonceValue()));
                if (_this.config.scope) {
                    redirectUrl += "&scope=" + encodeURIComponent(_this.config.scope);
                }
                if (_this.config.policy) {
                    redirectUrl += "&p=" + encodeURIComponent(_this.config.policy);
                }
                window.location.href = redirectUrl;
            };
            this.logout = function () {
                var redirectUrl = _this.config.logoutUrl + "?" +
                    (_this.config.logoutRedirectParameterName + "=" + encodeURIComponent(_this.config.redirectUri));
                if (_this.config.policy) {
                    redirectUrl += "&p=" + encodeURIComponent(_this.config.policy);
                }
                window.location.href = redirectUrl;
                _this.oAuthTokenService.removeToken();
            };
            this.loginOnStateChange = function (toState) {
                if (toState && _this.isLoginRequired(toState) && !_this.isAuthenticated() && !_this.getTokenDataFromUrl()) {
                    if (_this.localStorageService.isStorageSupported()) {
                        var url = window.location.href;
                        if (!window.location.hash) {
                            url = _this.getBaseRouteUrl();
                        }
                        _this.localStorageService.set(OAUTH_STARTPAGE_STORAGE_KEY, url);
                    }
                    _this.login();
                    return true;
                }
                return false;
            };
            this.setTokenOnRedirect = function () {
                var tokenData = _this.getTokenDataFromUrl();
                if (!_this.isAuthenticated() && tokenData) {
                    _this.oAuthTokenService.setToken(tokenData);
                    if (_this.localStorageService.isStorageSupported() && _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY)) {
                        var startPage = _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY);
                        _this.localStorageService.remove(OAUTH_STARTPAGE_STORAGE_KEY);
                        window.location.href = startPage;
                    }
                    else {
                        window.location.href = _this.getBaseRouteUrl();
                    }
                    _this.eventAggregator.publish(OAuthService_1.LOGIN_SUCCESS_EVENT, tokenData);
                }
            };
            this.isLoginRequired = function (state) {
                var routeHasConfig = state.settings && state.settings.requireLogin !== undefined;
                var routeRequiresLogin = routeHasConfig && state.settings.requireLogin ? true : false;
                return routeHasConfig ? routeRequiresLogin : _this.config.alwaysRequireLogin;
            };
            this.getTokenDataFromUrl = function () {
                var hashData = _this.urlHashService.getHashData();
                var tokenData = _this.oAuthTokenService.createToken(hashData);
                return tokenData;
            };
            this.getBaseRouteUrl = function () {
                return window.location.origin + '/#/';
            };
            this.getSimpleNonceValue = function () {
                return ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
            };
            this.defaults = {
                loginUrl: null,
                logoutUrl: null,
                clientId: null,
                logoutRedirectParameterName: 'post_logout_redirect_uri',
                scope: null,
                alwaysRequireLogin: false
            };
        }
        Object.defineProperty(OAuthService, "LOGIN_SUCCESS_EVENT", {
            get: function () { return 'oauth:loginSuccess'; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OAuthService, "INVALID_TOKEN_EVENT", {
            get: function () { return 'oauth:invalidToken'; },
            enumerable: true,
            configurable: true
        });
        return OAuthService;
    }());
    OAuthService = OAuthService_1 = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
            url_hash_service_1.default,
            local_storage_service_1.default,
            aurelia_event_aggregator_1.EventAggregator])
    ], OAuthService);
    exports.OAuthService = OAuthService;
    var OAuthService_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLENBQUMsQ0FBQTtZQTVJRyxJQUFJLENBQUMsUUFBUSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2dCQUNkLDJCQUEyQixFQUFFLDBCQUEwQjtnQkFDdkQsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsa0JBQWtCLEVBQUUsS0FBSzthQUM1QixDQUFDO1FBQ04sQ0FBQztRQWpCRCxzQkFBa0IsbUNBQW1CO2lCQUFyQyxjQUFrRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7V0FBQTtRQUNoRixzQkFBa0IsbUNBQW1CO2lCQUFyQyxjQUFrRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7V0FBQTtRQXFKcEYsbUJBQUM7SUFBRCxDQTNKQSxBQTJKQyxJQUFBO0lBM0pZLFlBQVk7UUFEeEIseUNBQVUsRUFBRTt5Q0FVc0IsdUNBQWlCO1lBQ3BCLDBCQUFjO1lBQ1QsK0JBQW1CO1lBQ3ZCLDBDQUFlO09BWm5DLFlBQVksQ0EySnhCO0lBM0pZLG9DQUFZIiwiZmlsZSI6Im9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCBVcmxIYXNoU2VydmljZSBmcm9tICcuL3VybC1oYXNoLXNlcnZpY2UnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlU2VydmljZSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmNvbnN0IE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWTogc3RyaW5nID0gJ29hdXRoLnN0YXJ0UGFnZSc7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFNlcnZpY2UgaW1wbGVtZW50cyBJT0F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRzOiBJT0F1dGhDb25maWc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBJT0F1dGhDb25maWc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTE9HSU5fU1VDQ0VTU19FVkVOVCgpOiBzdHJpbmcgeyByZXR1cm4gJ29hdXRoOmxvZ2luU3VjY2Vzcyc7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElOVkFMSURfVE9LRU5fRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDppbnZhbGlkVG9rZW4nOyB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvQXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1cmxIYXNoU2VydmljZTogVXJsSGFzaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgbG9naW5Vcmw6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ291dFVybDogbnVsbCxcclxuICAgICAgICAgICAgY2xpZW50SWQ6IG51bGwsXHJcbiAgICAgICAgICAgIGxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZTogJ3Bvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBudWxsLFxyXG4gICAgICAgICAgICBhbHdheXNSZXF1aXJlTG9naW46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogSU9BdXRoQ29uZmlnKTogSU9BdXRoQ29uZmlnID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aFByb3ZpZGVyIGFscmVhZHkgY29uZmlndXJlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaCBmcm9tIHVybHMuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dpblVybC5zdWJzdHIoLTEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgY29uZmlnLmxvZ2luVXJsID0gY29uZmlnLmxvZ2luVXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcubG9nb3V0VXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9nb3V0VXJsID0gY29uZmlnLmxvZ291dFVybC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIFJlZGlyZWN0IGlzIHNldCB0byBjdXJyZW50IGxvY2F0aW9uIGJ5IGRlZmF1bHRcclxuICAgICAgICB2YXIgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgdmFyIHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBub3QgbmVlZGVkIHBhcnRzIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XHJcbiAgICAgICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQucmVwbGFjZShleGlzdGluZ0hhc2gsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoRGVmYXVsdC5zdWJzdHIoLTEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSA9IGNvbmZpZy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICByZXR1cm4gPGFueT50aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dpbiA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dpblVybH0/YCArXHJcbiAgICAgICAgICAgIGByZXNwb25zZV90eXBlPSR7dGhpcy5vQXV0aFRva2VuU2VydmljZS5jb25maWcubmFtZX0mYCArXHJcbiAgICAgICAgICAgIGBjbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuY2xpZW50SWQpfSZgICtcclxuICAgICAgICAgICAgYHJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9JmAgK1xyXG4gICAgICAgICAgICBgbm9uY2U9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5nZXRTaW1wbGVOb25jZVZhbHVlKCkpfWA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY29wZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnNjb3BlKX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnBvbGljeSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnA9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcucG9saWN5KX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ291dCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dvdXRVcmx9P2AgK1xyXG4gICAgICAgICAgICBgJHt0aGlzLmNvbmZpZy5sb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX1gO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcucG9saWN5KSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmcD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5wb2xpY3kpfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2UucmVtb3ZlVG9rZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ2luT25TdGF0ZUNoYW5nZSA9ICh0b1N0YXRlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgaWYgKHRvU3RhdGUgJiYgdGhpcy5pc0xvZ2luUmVxdWlyZWQodG9TdGF0ZSkgJiYgIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgIXRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmlzU3RvcmFnZVN1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuZ2V0QmFzZVJvdXRlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSwgdXJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbk9uUmVkaXJlY3QgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdmFyIHRva2VuRGF0YSA9IHRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdG9rZW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2Uuc2V0VG9rZW4odG9rZW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkgJiYgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRQYWdlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZShPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzdGFydFBhZ2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWRpcmVjdCB0byB0aGUgYmFzZSBhcHBsaWNhdGlvbiByb3V0ZVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEJhc2VSb3V0ZVVybCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5MT0dJTl9TVUNDRVNTX0VWRU5ULCB0b2tlbkRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBpc0xvZ2luUmVxdWlyZWQgPSAoc3RhdGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICB2YXIgcm91dGVIYXNDb25maWcgPSBzdGF0ZS5zZXR0aW5ncyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gIT09IHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIgcm91dGVSZXF1aXJlc0xvZ2luID0gcm91dGVIYXNDb25maWcgJiYgc3RhdGUuc2V0dGluZ3MucmVxdWlyZUxvZ2luID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91dGVIYXNDb25maWcgPyByb3V0ZVJlcXVpcmVzTG9naW4gOiB0aGlzLmNvbmZpZy5hbHdheXNSZXF1aXJlTG9naW47XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9rZW5EYXRhRnJvbVVybCA9ICgpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHZhciBoYXNoRGF0YSA9IHRoaXMudXJsSGFzaFNlcnZpY2UuZ2V0SGFzaERhdGEoKTtcclxuICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhpcy5vQXV0aFRva2VuU2VydmljZS5jcmVhdGVUb2tlbihoYXNoRGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0QmFzZVJvdXRlVXJsID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyMvJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNpbXBsZU5vbmNlVmFsdWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gKChEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSkgKiBNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICB9XHJcbn1cclxuIl19
