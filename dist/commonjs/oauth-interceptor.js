"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var oauth_service_1 = require("./oauth-service");
var oauth_token_service_1 = require("./oauth-token-service");
var AUTHORIZATION_HEADER = 'Authorization';
var OAuthInterceptor = (function () {
    function OAuthInterceptor(oauthTokenService, eventAggregator) {
        var _this = this;
        this.oauthTokenService = oauthTokenService;
        this.eventAggregator = eventAggregator;
        this.request = function (config) {
            if (config.url.indexOf(window.location.origin) > -1) {
                return config;
            }
            if (_this.oauthTokenService.getToken() && !_this.oauthTokenService.isTokenValid()) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT);
                return Promise.reject(config);
            }
            if (!config.headers.get(AUTHORIZATION_HEADER)) {
                config.headers.add(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
            }
            return config;
        };
        this.responseError = function (response) {
            if (response.status === 400 && response.data &&
                (response.data.error === 'invalid_request' || response.data.error === 'invalid_grant')) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
            var tokenType = _this.oauthTokenService.getTokenType();
            if (response.status === 401 &&
                (response.data && response.data.error === 'invalid_token') ||
                (response.headers.get('www-authenticate') && response.headers.get('www-authenticate').indexOf(tokenType) === 0)) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
            return Promise.reject(response);
        };
    }
    return OAuthInterceptor;
}());
OAuthInterceptor = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
        aurelia_event_aggregator_1.EventAggregator])
], OAuthInterceptor);
exports.default = OAuthInterceptor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QWU7R0FIM0IsZ0JBQWdCLENBMENwQztrQkExQ29CLGdCQUFnQiIsImZpbGUiOiJvYXV0aC1pbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHBSZXF1ZXN0TWVzc2FnZSB9IGZyb20gJ2F1cmVsaWEtaHR0cC1jbGllbnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcblxyXG5jb25zdCBBVVRIT1JJWkFUSU9OX0hFQURFUjogc3RyaW5nID0gJ0F1dGhvcml6YXRpb24nO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aEludGVyY2VwdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0ID0gKGNvbmZpZzogSHR0cFJlcXVlc3RNZXNzYWdlKTogYW55ID0+IHtcclxuICAgICAgICBpZiAoY29uZmlnLnVybC5pbmRleE9mKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCkgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY29uZmlnKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuaGVhZGVycy5nZXQoQVVUSE9SSVpBVElPTl9IRUFERVIpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLmFkZChBVVRIT1JJWkFUSU9OX0hFQURFUiwgdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCkpOyAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7ICAgICAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZUVycm9yID0gKHJlc3BvbnNlKTogYW55ID0+IHtcclxuICAgICAgICAvLyBDYXRjaCAnaW52YWxpZF9yZXF1ZXN0JyBhbmQgJ2ludmFsaWRfZ3JhbnQnIGVycm9ycyBhbmQgZW5zdXJlIHRoYXQgdGhlICd0b2tlbicgaXMgcmVtb3ZlZC5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDAgJiYgcmVzcG9uc2UuZGF0YSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ2ludmFsaWRfcmVxdWVzdCcgfHwgcmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ2ludmFsaWRfZ3JhbnQnKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2F0Y2ggJ2ludmFsaWRfdG9rZW4nIGFuZCAndW5hdXRob3JpemVkJyBlcnJvcnMuXHJcbiAgICAgICAgbGV0IHRva2VuVHlwZSA9IHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW5UeXBlKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX3Rva2VuJykgfHxcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd3d3ctYXV0aGVudGljYXRlJykgJiYgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ3d3dy1hdXRoZW50aWNhdGUnKS5pbmRleE9mKHRva2VuVHlwZSkgPT09IDApKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5ULCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfTtcclxufSJdfQ==
