var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', './jwt-token-service', './oauth-polyfills', './local-storage-service'], function (require, exports, aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1, local_storage_service_1) {
    "use strict";
    var OAuthTokenService = (function () {
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
    exports.OAuthTokenService = OAuthTokenService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLXRva2VuLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFPQTtRQUtJLDJCQUFvQixlQUFnQyxFQUFVLG1CQUF3QztZQUwxRyxpQkFnR0M7WUEzRnVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7WUFXL0YsY0FBUyxHQUFHLFVBQUMsTUFBeUI7Z0JBR3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyw4QkFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3hHLENBQUM7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sR0FBRyw4QkFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDO1lBRUssZ0JBQVcsR0FBRyxVQUFDLFlBQWlCO2dCQUNuQyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakUsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDO2dCQUVuRixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxJQUFJLE1BQU0sR0FBZSxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQ3RELElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO2dCQUU3QyxNQUFNLENBQUM7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLFNBQVMsRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsY0FBYztvQkFDN0MsU0FBUyxFQUFFLE1BQU07aUJBQ3BCLENBQUM7WUFDTixDQUFDLENBQUM7WUFFSyxhQUFRLEdBQUcsVUFBQyxJQUFxQjtnQkFDcEMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQyxDQUFDO1lBRUssYUFBUSxHQUFHO2dCQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUMsQ0FBQztZQUVLLGVBQVUsR0FBRztnQkFDaEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUMvRCxDQUFDLENBQUM7WUFFSywyQkFBc0IsR0FBRztnQkFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGLE1BQU0sQ0FBSSxTQUFTLFNBQUksS0FBSSxDQUFDLFVBQVUsRUFBSSxDQUFDO1lBQy9DLENBQUMsQ0FBQztZQUVLLGlCQUFZLEdBQUc7Z0JBQ2xCLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDbkUsQ0FBQyxDQUFDO1lBRUssZ0JBQVcsR0FBRztnQkFDakIsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUVLLGlCQUFZLEdBQUc7Z0JBQ2xCLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1lBRU0sZUFBVSxHQUFHO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztZQXpGRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLElBQUksRUFBRSxVQUFVO2dCQUNoQixrQkFBa0IsRUFBRTtvQkFDaEIsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFNBQVMsRUFBRSxZQUFZO2lCQUMxQjtnQkFDRCxtQkFBbUIsRUFBRSxHQUFHO2FBQzNCLENBQUM7UUFDTCxDQUFDO1FBZk47WUFBQyx5Q0FBVSxFQUFFOzs2QkFBQTtRQWlHYix3QkFBQztJQUFELENBaEdBLEFBZ0dDLElBQUE7SUFoR1kseUJBQWlCLG9CQWdHN0IsQ0FBQSIsImZpbGUiOiJvYXV0aC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IEp3dFRva2VuU2VydmljZSBmcm9tICcuL2p3dC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IHsgb2JqZWN0QXNzaWduIH0gZnJvbSAnLi9vYXV0aC1wb2x5ZmlsbHMnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlU2VydmljZSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Utc2VydmljZSc7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFRva2VuU2VydmljZSBpbXBsZW1lbnRzIElPQXV0aFRva2VuU2VydmljZSB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgdG9rZW5EYXRhOiBJT0F1dGhUb2tlbkRhdGE7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBJT0F1dGhUb2tlbkNvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGp3dFRva2VuU2VydmljZTogSnd0VG9rZW5TZXJ2aWNlLCBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogMTIwXHJcbiAgICAgICAgfTtcclxuICAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSA9IChjb25maWc6IElPQXV0aFRva2VuQ29uZmlnKTogSU9BdXRoVG9rZW5Db25maWcgPT4ge1xyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWdyYXRpb24gd2l0aCBzdXBwbGllZCBjb25maWcgZGF0YVxyXG4gICAgICAgIGlmIChjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLCBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUb2tlbiA9ICh1cmxUb2tlbkRhdGE6IGFueSk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgdmFyIHRva2VuID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy5pZFRva2VuXTtcclxuICAgICAgICB2YXIgdG9rZW5UeXBlID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy50b2tlblR5cGVdIHx8ICdCZWFyZXInO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2xhaW1zOiBJSnd0Q2xhaW1zID0gdGhpcy5qd3RUb2tlblNlcnZpY2UuZ2V0Snd0Q2xhaW1zKHRva2VuKTtcclxuICAgICAgICB2YXIgaXNzdWVkVGltZSA9IGNsYWltcy5uYmYgPyBjbGFpbXMubmJmIDogY2xhaW1zLmlhdDtcclxuICAgICAgICB2YXIgZXhwaXJhdGlvblRpbWUgPSBjbGFpbXMuZXhwIC0gaXNzdWVkVGltZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICB0b2tlblR5cGU6IHRva2VuVHlwZSxcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiB0aGlzLmdldFRpbWVOb3coKSArIGV4cGlyYXRpb25UaW1lLFxyXG4gICAgICAgICAgICBqd3RDbGFpbXM6IGNsYWltc1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbiA9IChkYXRhOiBJT0F1dGhUb2tlbkRhdGEpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQoXCJvYXV0aC10b2tlblwiLCBkYXRhLnRva2VuKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBkYXRhO1xyXG4gICAgfTsgICAgXHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRUb2tlbiA9ICgpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRJZFRva2VuID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlbiA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRBdXRob3JpemF0aW9uSGVhZGVyID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5nZXRUb2tlblR5cGUoKSAmJiB0aGlzLmdldElkVG9rZW4oKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRva2VuVHlwZSA9IHRoaXMuZ2V0VG9rZW5UeXBlKCkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmdldFRva2VuVHlwZSgpLnN1YnN0cigxKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke3Rva2VuVHlwZX0gJHt0aGlzLmdldElkVG9rZW4oKX1gO1xyXG4gICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW5UeXBlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlblR5cGUgOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4gPSAoKTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNUb2tlblZhbGlkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHZhciB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGltZU5vdyA9IHRoaXMuZ2V0VGltZU5vdygpO1xyXG4gICAgICAgIHZhciBleHBpcmVzQXQgPSB0b2tlbi5leHBpcmVzQXQ7XHJcbiAgICAgICAgdmFyIGlzVmFsaWQgPSAoZXhwaXJlc0F0ICYmIChleHBpcmVzQXQgPiB0aW1lTm93ICsgdGhpcy5jb25maWcuZXhwaXJlT2Zmc2V0U2Vjb25kcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUaW1lTm93ID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApO1xyXG4gICAgfTsgICAgICBcclxufSJdfQ==
