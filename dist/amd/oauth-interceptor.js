var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-service", "./oauth-token-service"], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_service_1, oauth_token_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLWludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQU9BLElBQU0sb0JBQW9CLEdBQVcsZUFBZSxDQUFDO0lBR3JELElBQXFCLGdCQUFnQjtRQUNqQywwQkFDWSxpQkFBb0MsRUFDcEMsZUFBZ0M7WUFGNUMsaUJBRWlEO1lBRHJDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7WUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBRXJDLFlBQU8sR0FBRyxVQUFDLE1BQTBCO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5RSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBRS9ELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Z0JBQzlGLENBQUM7Z0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFSyxrQkFBYSxHQUFHLFVBQUMsUUFBUTtnQkFFNUIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUk7b0JBQ3hDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssaUJBQWlCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV6RixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUdELElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO29CQUN2QixDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDO29CQUMxRCxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVsSCxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztRQXRDOEMsQ0FBQztRQXVDckQsdUJBQUM7SUFBRCxDQTFDQSxBQTBDQyxJQUFBO0lBMUNvQixnQkFBZ0I7UUFEcEMseUNBQVUsRUFBRTt5Q0FHc0IsdUNBQWlCO1lBQ25CLDBDQUFlO09BSDNCLGdCQUFnQixDQTBDcEM7c0JBMUNvQixnQkFBZ0IiLCJmaWxlIjoib2F1dGgtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBIZWFkZXJzLCBIdHRwUmVxdWVzdE1lc3NhZ2UgfSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5cclxuY29uc3QgQVVUSE9SSVpBVElPTl9IRUFERVI6IHN0cmluZyA9ICdBdXRob3JpemF0aW9uJztcclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhJbnRlcmNlcHRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9hdXRoVG9rZW5TZXJ2aWNlOiBPQXV0aFRva2VuU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVxdWVzdCA9IChjb25maWc6IEh0dHBSZXF1ZXN0TWVzc2FnZSk6IGFueSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmwuaW5kZXhPZih3aW5kb3cubG9jYXRpb24ub3JpZ2luKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRUb2tlbigpICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLmhlYWRlcnMuZ2V0KEFVVEhPUklaQVRJT05fSEVBREVSKSkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycy5hZGQoQVVUSE9SSVpBVElPTl9IRUFERVIsIHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnOyAgICAgICAgICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VFcnJvciA9IChyZXNwb25zZSk6IGFueSA9PiB7XHJcbiAgICAgICAgLy8gQ2F0Y2ggJ2ludmFsaWRfcmVxdWVzdCcgYW5kICdpbnZhbGlkX2dyYW50JyBlcnJvcnMgYW5kIGVuc3VyZSB0aGF0IHRoZSAndG9rZW4nIGlzIHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwICYmIHJlc3BvbnNlLmRhdGEgJiZcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX3JlcXVlc3QnIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX2dyYW50JykpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhdGNoICdpbnZhbGlkX3Rva2VuJyBhbmQgJ3VuYXV0aG9yaXplZCcgZXJyb3JzLlxyXG4gICAgICAgIGxldCB0b2tlblR5cGUgPSB0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuVHlwZSgpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLmVycm9yID09PSAnaW52YWxpZF90b2tlbicpIHx8XHJcbiAgICAgICAgICAgIChyZXNwb25zZS5oZWFkZXJzLmdldCgnd3d3LWF1dGhlbnRpY2F0ZScpICYmIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd3d3ctYXV0aGVudGljYXRlJykuaW5kZXhPZih0b2tlblR5cGUpID09PSAwKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH07XHJcbn0iXX0=
