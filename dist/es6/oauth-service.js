System.register(['aurelia-event-aggregator', 'aurelia-dependency-injection', './oauth-token-service', './url-hash-service', './local-storage-service', './oauth-polyfills'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1;
    var OAUTH_STARTPAGE_STORAGE_KEY, OAuthService;
    return {
        setters:[
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (oauth_token_service_1_1) {
                oauth_token_service_1 = oauth_token_service_1_1;
            },
            function (url_hash_service_1_1) {
                url_hash_service_1 = url_hash_service_1_1;
            },
            function (local_storage_service_1_1) {
                local_storage_service_1 = local_storage_service_1_1;
            },
            function (oauth_polyfills_1_1) {
                oauth_polyfills_1 = oauth_polyfills_1_1;
            }],
        execute: function() {
            OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
            OAuthService = (function () {
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
                        var redirectUrl = (_this.config.loginUrl + "?") +
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
                        var redirectUrl = (_this.config.logoutUrl + "?") +
                            (_this.config.logoutRedirectParameterName + "=" + encodeURIComponent(_this.config.redirectUri));
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
                            _this.eventAggregator.publish(OAuthService.LOGIN_SUCCESS_EVENT, tokenData);
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
                OAuthService = __decorate([
                    aurelia_dependency_injection_1.autoinject(), 
                    __metadata('design:paramtypes', [oauth_token_service_1.OAuthTokenService, url_hash_service_1.default, local_storage_service_1.default, aurelia_event_aggregator_1.EventAggregator])
                ], OAuthService);
                return OAuthService;
            }());
            exports_1("OAuthService", OAuthService);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFJLENBQUMsUUFBUSxHQUFHO3dCQUNaLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxJQUFJO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3dCQUNkLDJCQUEyQixFQUFFLDBCQUEwQjt3QkFDdkQsS0FBSyxFQUFFLElBQUk7d0JBQ1gsa0JBQWtCLEVBQUUsS0FBSztxQkFDNUIsQ0FBQztnQkFDTixDQUFDO2dCQWpCRCxzQkFBa0IsbUNBQW1CO3lCQUFyQyxjQUFrRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ2hGLHNCQUFrQixtQ0FBbUI7eUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFQcEY7b0JBQUMseUNBQVUsRUFBRTs7Z0NBQUE7Z0JBd0piLG1CQUFDO1lBQUQsQ0F2SkEsQUF1SkMsSUFBQTtZQXZKRCx1Q0F1SkMsQ0FBQSIsImZpbGUiOiJvYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgVXJsSGFzaFNlcnZpY2UgZnJvbSAnLi91cmwtaGFzaC1zZXJ2aWNlJztcclxuaW1wb3J0IExvY2FsU3RvcmFnZVNlcnZpY2UgZnJvbSAnLi9sb2NhbC1zdG9yYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5jb25zdCBPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVk6IHN0cmluZyA9ICdvYXV0aC5zdGFydFBhZ2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhTZXJ2aWNlIGltcGxlbWVudHMgSU9BdXRoU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0czogSU9BdXRoQ29uZmlnO1xyXG4gICAgcHVibGljIGNvbmZpZzogSU9BdXRoQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IExPR0lOX1NVQ0NFU1NfRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDpsb2dpblN1Y2Nlc3MnOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZBTElEX1RPS0VOX0VWRU5UKCk6IHN0cmluZyB7IHJldHVybiAnb2F1dGg6aW52YWxpZFRva2VuJzsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb0F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXJsSGFzaFNlcnZpY2U6IFVybEhhc2hTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBsb2dpblVybDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0VXJsOiBudWxsLFxyXG4gICAgICAgICAgICBjbGllbnRJZDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lOiAncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJyxcclxuICAgICAgICAgICAgc2NvcGU6IG51bGwsXHJcbiAgICAgICAgICAgIGFsd2F5c1JlcXVpcmVMb2dpbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBJT0F1dGhDb25maWcpOiBJT0F1dGhDb25maWcgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoUHJvdmlkZXIgYWxyZWFkeSBjb25maWd1cmVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoY29uZmlnLmxvZ2luVXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9naW5VcmwgPSBjb25maWcubG9naW5Vcmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dvdXRVcmwuc3Vic3RyKC0xKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5sb2dvdXRVcmwgPSBjb25maWcubG9nb3V0VXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5kZWZhdWx0cywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgLy8gUmVkaXJlY3QgaXMgc2V0IHRvIGN1cnJlbnQgbG9jYXRpb24gYnkgZGVmYXVsdFxyXG4gICAgICAgIHZhciBleGlzdGluZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICB2YXIgcGF0aERlZmF1bHQgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG5vdCBuZWVkZWQgcGFydHMgZnJvbSB1cmxzLlxyXG4gICAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhdGhEZWZhdWx0LnN1YnN0cigtMSkgPT09ICcjJykge1xyXG4gICAgICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpID0gY29uZmlnLnJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHJldHVybiA8YW55PnRoaXMub0F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ2luID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ2luVXJsfT9gICtcclxuICAgICAgICAgICAgYHJlc3BvbnNlX3R5cGU9JHt0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNvbmZpZy5uYW1lfSZgICtcclxuICAgICAgICAgICAgYGNsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5jbGllbnRJZCl9JmAgK1xyXG4gICAgICAgICAgICBgcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX0mYCArXHJcbiAgICAgICAgICAgIGBub25jZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmdldFNpbXBsZU5vbmNlVmFsdWUoKSl9YDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmc2NvcGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuc2NvcGUpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucG9saWN5KSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmcD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5wb2xpY3kpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdmFyIHJlZGlyZWN0VXJsID0gYCR7dGhpcy5jb25maWcubG9nb3V0VXJsfT9gICtcclxuICAgICAgICAgICAgYCR7dGhpcy5jb25maWcubG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lfT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9YDtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcclxuICAgICAgICB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuKCk7XHJcbiAgICB9OyAgIFxyXG5cclxuICAgIHB1YmxpYyBsb2dpbk9uU3RhdGVDaGFuZ2UgPSAodG9TdGF0ZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGlmICh0b1N0YXRlICYmIHRoaXMuaXNMb2dpblJlcXVpcmVkKHRvU3RhdGUpICYmICF0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmICF0aGlzLmdldFRva2VuRGF0YUZyb21VcmwoKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5pc1N0b3JhZ2VTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmdldEJhc2VSb3V0ZVVybCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQ8c3RyaW5nPihPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVksIHVybCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbk9uUmVkaXJlY3QgPSAoKTogdm9pZCA9PiB7ICAgICAgICBcclxuICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhpcy5nZXRUb2tlbkRhdGFGcm9tVXJsKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiB0b2tlbkRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5vQXV0aFRva2VuU2VydmljZS5zZXRUb2tlbih0b2tlbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5pc1N0b3JhZ2VTdXBwb3J0ZWQoKSAmJiB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydFBhZ2UgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0PHN0cmluZz4oT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzdGFydFBhZ2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZWRpcmVjdCB0byB0aGUgYmFzZSBhcHBsaWNhdGlvbiByb3V0ZVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmdldEJhc2VSb3V0ZVVybCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5MT0dJTl9TVUNDRVNTX0VWRU5ULCB0b2tlbkRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBpc0xvZ2luUmVxdWlyZWQgPSAoc3RhdGUpOiBib29sZWFuID0+IHsgXHJcbiAgICAgICAgdmFyIHJvdXRlSGFzQ29uZmlnID0gc3RhdGUuc2V0dGluZ3MgJiYgc3RhdGUuc2V0dGluZ3MucmVxdWlyZUxvZ2luICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIHJvdXRlUmVxdWlyZXNMb2dpbiA9IHJvdXRlSGFzQ29uZmlnICYmIHN0YXRlLnNldHRpbmdzLnJlcXVpcmVMb2dpbiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJvdXRlSGFzQ29uZmlnID8gcm91dGVSZXF1aXJlc0xvZ2luIDogdGhpcy5jb25maWcuYWx3YXlzUmVxdWlyZUxvZ2luO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRva2VuRGF0YUZyb21VcmwgPSAoKTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICB2YXIgaGFzaERhdGEgPSB0aGlzLnVybEhhc2hTZXJ2aWNlLmdldEhhc2hEYXRhKCk7XHJcbiAgICAgICAgdmFyIHRva2VuRGF0YSA9IHRoaXMub0F1dGhUb2tlblNlcnZpY2UuY3JlYXRlVG9rZW4oaGFzaERhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gdG9rZW5EYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldEJhc2VSb3V0ZVVybCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy8jLyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTaW1wbGVOb25jZVZhbHVlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgoRGF0ZS5ub3coKSArIE1hdGgucmFuZG9tKCkpICogTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
