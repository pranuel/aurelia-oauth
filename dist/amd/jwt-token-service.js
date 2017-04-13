define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JwtTokenService = (function () {
        function JwtTokenService() {
            var _this = this;
            this.getJwtClaims = function (encodedToken) {
                var jwtToken = _this.createJwtToken(encodedToken);
                var base64Decoded = _this.decodeBase64String(jwtToken.payload);
                return JSON.parse(base64Decoded);
            };
            this.createJwtToken = function (token) {
                var jwtTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
                var matches = jwtTokenPartsRegex.exec(token);
                var isValidToken = matches && matches.length === 4;
                return {
                    header: isValidToken ? matches[1] : '',
                    payload: isValidToken ? matches[2] : '',
                    signature: isValidToken ? matches[3] : ''
                };
            };
            this.decodeBase64String = function (base64IdToken) {
                base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
                if (!window.atob) {
                    throw new Error('Browser doesn\'t implement atob');
                }
                return window.atob(base64IdToken);
            };
        }
        return JwtTokenService;
    }());
    exports.default = JwtTokenService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBQUE7WUFBQSxpQkE2QkM7WUE1QlUsaUJBQVksR0FBRyxVQUFDLFlBQW9CO2dCQUN2QyxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUU5RCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUM7WUFFTSxtQkFBYyxHQUFHLFVBQUMsS0FBYTtnQkFDbkMsSUFBSSxrQkFBa0IsR0FBRyxzQ0FBc0MsQ0FBQztnQkFDaEUsSUFBSSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLFlBQVksR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBRW5ELE1BQU0sQ0FBWTtvQkFDZCxNQUFNLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUN0QyxPQUFPLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUN2QyxTQUFTLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2lCQUM1QyxDQUFDO1lBQ04sQ0FBQyxDQUFDO1lBRU0sdUJBQWtCLEdBQUcsVUFBQyxhQUFxQjtnQkFDL0MsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXBFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQztRQUNOLENBQUM7UUFBRCxzQkFBQztJQUFELENBN0JBLEFBNkJDLElBQUEiLCJmaWxlIjoiand0LXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSUp3dFRva2VuIHtcclxuICAgIGhlYWRlcjogc3RyaW5nO1xyXG4gICAgcGF5bG9hZDogc3RyaW5nO1xyXG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp3dFRva2VuU2VydmljZSB7ICAgIFxyXG4gICAgcHVibGljIGdldEp3dENsYWltcyA9IChlbmNvZGVkVG9rZW46IHN0cmluZyk6IElKd3RDbGFpbXMgPT4ge1xyXG4gICAgICAgIHZhciBqd3RUb2tlbiA9IHRoaXMuY3JlYXRlSnd0VG9rZW4oZW5jb2RlZFRva2VuKTtcclxuICAgICAgICB2YXIgYmFzZTY0RGVjb2RlZCA9IHRoaXMuZGVjb2RlQmFzZTY0U3RyaW5nKGp3dFRva2VuLnBheWxvYWQpO1xyXG5cclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShiYXNlNjREZWNvZGVkKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVKd3RUb2tlbiA9ICh0b2tlbjogc3RyaW5nKTogSUp3dFRva2VuID0+IHtcclxuICAgICAgICB2YXIgand0VG9rZW5QYXJ0c1JlZ2V4ID0gL14oW15cXC5cXHNdKilcXC4oW15cXC5cXHNdKylcXC4oW15cXC5cXHNdKikkLztcclxuICAgICAgICB2YXIgbWF0Y2hlcyA9IGp3dFRva2VuUGFydHNSZWdleC5leGVjKHRva2VuKTtcclxuICAgICAgICB2YXIgaXNWYWxpZFRva2VuID0gbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gNDtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gPElKd3RUb2tlbj57XHJcbiAgICAgICAgICAgIGhlYWRlcjogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1sxXSA6ICcnLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiBpc1ZhbGlkVG9rZW4gPyBtYXRjaGVzWzJdIDogJycsXHJcbiAgICAgICAgICAgIHNpZ25hdHVyZTogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1szXSA6ICcnXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVCYXNlNjRTdHJpbmcgPSAoYmFzZTY0SWRUb2tlbjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICBiYXNlNjRJZFRva2VuID0gYmFzZTY0SWRUb2tlbi5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5hdG9iKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlciBkb2VzblxcJ3QgaW1wbGVtZW50IGF0b2InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB3aW5kb3cuYXRvYihiYXNlNjRJZFRva2VuKTtcclxuICAgIH07XHJcbn0iXX0=
