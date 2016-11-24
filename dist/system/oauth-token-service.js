System.register(['aurelia-dependency-injection', './jwt-token-service', './oauth-polyfills', './local-storage-service'], function(exports_1, context_1) {
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
    var aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1, local_storage_service_1;
    var OAuthTokenService;
    return {
        setters:[
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (jwt_token_service_1_1) {
                jwt_token_service_1 = jwt_token_service_1_1;
            },
            function (oauth_polyfills_1_1) {
                oauth_polyfills_1 = oauth_polyfills_1_1;
            },
            function (local_storage_service_1_1) {
                local_storage_service_1 = local_storage_service_1_1;
            }],
        execute: function() {
            OAuthTokenService = (function () {
                function OAuthTokenService(jwtTokenService, localStorageService) {
                    var _this = this;
                    this.jwtTokenService = jwtTokenService;
                    this.localStorageService = localStorageService;
                    this.configure = function (config) {
                        if (config.urlTokenParameters) {
                            config.urlTokenParameters = oauth_polyfills_1.objectAssign(_this.config.urlTokenParameters, config.urlTokenParameters);
                        }
                        _this.config = oauth_polyfills_1.objectAssign(_this.config, config);
                        return config;
                    };
                    this.createToken = function (urlTokenData) {
                        var token = urlTokenData[_this.config.urlTokenParameters.idToken];
                        var tokenType = urlTokenData[_this.config.urlTokenParameters.tokenType] || 'Bearer';
                        if (!token) {
                            return null;
                        }
                        var claims = _this.jwtTokenService.getJwtClaims(token);
                        var issuedTime = claims.nbf ? claims.nbf : claims.iat;
                        var expirationTime = claims.exp - issuedTime;
                        return {
                            token: token,
                            tokenType: tokenType,
                            expiresAt: _this.getTimeNow() + expirationTime,
                            jwtClaims: claims
                        };
                    };
                    this.setToken = function (data) {
                        _this.localStorageService.set("oauth-token", data.token);
                        return _this.tokenData = data;
                    };
                    this.getToken = function () {
                        return _this.tokenData;
                    };
                    this.getIdToken = function () {
                        return _this.getToken() ? _this.getToken().token : undefined;
                    };
                    this.getAuthorizationHeader = function () {
                        if (!(_this.getTokenType() && _this.getIdToken())) {
                            return '';
                        }
                        var tokenType = _this.getTokenType().charAt(0).toUpperCase() + _this.getTokenType().substr(1);
                        return tokenType + " " + _this.getIdToken();
                    };
                    this.getTokenType = function () {
                        return _this.getToken() ? _this.getToken().tokenType : undefined;
                    };
                    this.removeToken = function () {
                        return _this.tokenData = null;
                    };
                    this.isTokenValid = function () {
                        var token = _this.getToken();
                        if (!token) {
                            return false;
                        }
                        var timeNow = _this.getTimeNow();
                        var expiresAt = token.expiresAt;
                        var isValid = (expiresAt && (expiresAt > timeNow + _this.config.expireOffsetSeconds));
                        return isValid;
                    };
                    this.getTimeNow = function () {
                        return Math.round(new Date().getTime() / 1000.0);
                    };
                    this.config = {
                        name: 'id_token',
                        urlTokenParameters: {
                            idToken: 'id_token',
                            tokenType: 'token_type'
                        },
                        expireOffsetSeconds: 120
                    };
                }
                OAuthTokenService = __decorate([
                    aurelia_dependency_injection_1.autoinject(), 
                    __metadata('design:paramtypes', [jwt_token_service_1.default, local_storage_service_1.default])
                ], OAuthTokenService);
                return OAuthTokenService;
            }());
            exports_1("OAuthTokenService", OAuthTokenService);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLXRva2VuLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQTtnQkFLSSwyQkFBb0IsZUFBZ0MsRUFBVSxtQkFBd0M7b0JBTDFHLGlCQWdHQztvQkEzRnVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtvQkFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO29CQVcvRixjQUFTLEdBQUcsVUFBQyxNQUF5Qjt3QkFHekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs0QkFDNUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDeEcsQ0FBQzt3QkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDO29CQUVLLGdCQUFXLEdBQUcsVUFBQyxZQUFpQjt3QkFDbkMsSUFBSSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pFLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQzt3QkFFbkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBRUQsSUFBSSxNQUFNLEdBQWUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xFLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FB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Q0QsbUJBQW1CLEVBQUUsR0FBRztxQkFDM0IsQ0FBQztnQkFDTCxDQUFDO2dCQWZOO29CQUFDLHlDQUFVLEVBQUU7O3FDQUFBO2dCQWlHYix3QkFBQztZQUFELENBaEdBLEFBZ0dDLElBQUE7WUFoR0QsaURBZ0dDLENBQUEiLCJmaWxlIjoib2F1dGgtdG9rZW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCBKd3RUb2tlblNlcnZpY2UgZnJvbSAnLi9qd3QtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuaW1wb3J0IExvY2FsU3RvcmFnZVNlcnZpY2UgZnJvbSAnLi9sb2NhbC1zdG9yYWdlLXNlcnZpY2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2UgaW1wbGVtZW50cyBJT0F1dGhUb2tlblNlcnZpY2Uge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHRva2VuRGF0YTogSU9BdXRoVG9rZW5EYXRhO1xyXG4gICAgcHVibGljIGNvbmZpZzogSU9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBqd3RUb2tlblNlcnZpY2U6IEp3dFRva2VuU2VydmljZSwgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpZF90b2tlbicsXHJcbiAgICAgICAgICAgIHVybFRva2VuUGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgaWRUb2tlbjogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgICAgIHRva2VuVHlwZTogJ3Rva2VuX3R5cGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGlyZU9mZnNldFNlY29uZHM6IDEyMFxyXG4gICAgICAgIH07XHJcbiAgICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBJT0F1dGhUb2tlbkNvbmZpZyk6IElPQXV0aFRva2VuQ29uZmlnID0+IHtcclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kIGRlZmF1bHQgY29uZmlncmF0aW9uIHdpdGggc3VwcGxpZWQgY29uZmlnIGRhdGFcclxuICAgICAgICBpZiAoY29uZmlnLnVybFRva2VuUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycywgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlVG9rZW4gPSAodXJsVG9rZW5EYXRhOiBhbnkpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHZhciB0b2tlbiA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMuaWRUb2tlbl07XHJcbiAgICAgICAgdmFyIHRva2VuVHlwZSA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMudG9rZW5UeXBlXSB8fCAnQmVhcmVyJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNsYWltczogSUp3dENsYWltcyA9IHRoaXMuand0VG9rZW5TZXJ2aWNlLmdldEp3dENsYWltcyh0b2tlbik7XHJcbiAgICAgICAgdmFyIGlzc3VlZFRpbWUgPSBjbGFpbXMubmJmID8gY2xhaW1zLm5iZiA6IGNsYWltcy5pYXQ7XHJcbiAgICAgICAgdmFyIGV4cGlyYXRpb25UaW1lID0gY2xhaW1zLmV4cCAtIGlzc3VlZFRpbWU7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlblR5cGUsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogdGhpcy5nZXRUaW1lTm93KCkgKyBleHBpcmF0aW9uVGltZSxcclxuICAgICAgICAgICAgand0Q2xhaW1zOiBjbGFpbXNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4gPSAoZGF0YTogSU9BdXRoVG9rZW5EYXRhKTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KFwib2F1dGgtdG9rZW5cIiwgZGF0YS50b2tlbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gZGF0YTtcclxuICAgIH07ICAgIFxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4gPSAoKTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGE7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0SWRUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW4gOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0QXV0aG9yaXphdGlvbkhlYWRlciA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGlmICghKHRoaXMuZ2V0VG9rZW5UeXBlKCkgJiYgdGhpcy5nZXRJZFRva2VuKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0b2tlblR5cGUgPSB0aGlzLmdldFRva2VuVHlwZSgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5nZXRUb2tlblR5cGUoKS5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHt0b2tlblR5cGV9ICR7dGhpcy5nZXRJZFRva2VuKCl9YDtcclxuICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHVibGljIGdldFRva2VuVHlwZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW5UeXBlIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuID0gKCk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzVG9rZW5WYWxpZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRpbWVOb3cgPSB0aGlzLmdldFRpbWVOb3coKTtcclxuICAgICAgICB2YXIgZXhwaXJlc0F0ID0gdG9rZW4uZXhwaXJlc0F0O1xyXG4gICAgICAgIHZhciBpc1ZhbGlkID0gKGV4cGlyZXNBdCAmJiAoZXhwaXJlc0F0ID4gdGltZU5vdyArIHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VGltZU5vdyA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKTtcclxuICAgIH07ICAgICAgXHJcbn0iXX0=
