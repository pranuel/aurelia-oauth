System.register(["aurelia-dependency-injection", "./oauth-service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, oauth_service_1, OAuthAuthorizeStep;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            }
        ],
        execute: function () {
            OAuthAuthorizeStep = (function () {
                function OAuthAuthorizeStep(oauthService) {
                    this.oauthService = oauthService;
                }
                OAuthAuthorizeStep.prototype.run = function (routingContext, next) {
                    var toState = routingContext.config;
                    if (this.oauthService.loginOnStateChange(toState)) {
                        return next.complete('Redirect');
                    }
                    return next();
                };
                return OAuthAuthorizeStep;
            }());
            OAuthAuthorizeStep = __decorate([
                aurelia_dependency_injection_1.autoinject(),
                __metadata("design:paramtypes", [oauth_service_1.OAuthService])
            ], OAuthAuthorizeStep);
            exports_1("OAuthAuthorizeStep", OAuthAuthorizeStep);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLWF1dGhvcml6ZS1zdGVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTWEsa0JBQWtCO2dCQUM3Qiw0QkFBb0IsWUFBMEI7b0JBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO2dCQUFJLENBQUM7Z0JBRW5ELGdDQUFHLEdBQUgsVUFBSSxjQUFjLEVBQUUsSUFBVTtvQkFDNUIsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztvQkFFcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDSCx5QkFBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWlksa0JBQWtCO2dCQUQ5Qix5Q0FBVSxFQUFFO2lEQUV1Qiw0QkFBWTtlQURuQyxrQkFBa0IsQ0FZOUI7O1FBQUEsQ0FBQyIsImZpbGUiOiJvYXV0aC1hdXRob3JpemUtc3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZGlyZWN0LCBOZXh0IH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhBdXRob3JpemVTdGVwIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9hdXRoU2VydmljZTogT0F1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0OiBOZXh0KSB7XHJcbiAgICBsZXQgdG9TdGF0ZSA9IHJvdXRpbmdDb250ZXh0LmNvbmZpZzsgICAgXHJcbiAgICBcclxuICAgIGlmICh0aGlzLm9hdXRoU2VydmljZS5sb2dpbk9uU3RhdGVDaGFuZ2UodG9TdGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIG5leHQuY29tcGxldGUoJ1JlZGlyZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9ICBcclxufSJdfQ==
